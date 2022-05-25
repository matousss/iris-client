import {createContext, useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {GroupChannel, Message, rawToMessage} from "../utils/ModelStorage";
import {MessagePanel, MessageComponent, ImageMessageComponent} from "./message_panel";
import {getSortedChannels} from "../utils/Sorting";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import SettingsModal from "./settings/SettingsModal";
import {viewedChannel} from "../utils/requests/RequestUtils";
import {useWindowFocus} from "../utils/Hooks";
import {getMessages, processRawChannel} from "../utils/StorageUtil";
import {UserSearch} from "./user_search";
import {createDirectChannel} from "../utils/requests/DataReq";

export const UserContext = createContext(null);
export const ClearDeskContext = createContext(null);

export default function Main(props) {
    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    const [sortedChannels, setSortedChannels] = useState(getSortedChannels(props.channels));
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const windowFocus = useWindowFocus();


    const generateMessages = (showAuthor) => {
        return Array.from(channel.messages, (message, i) => {
            let author = showAuthor ? message.author : '';
            let from = message.author.id !== props.user.id;
            console.log(message.media)
            return (!message.media ?
                <MessageComponent key={i} author={author}
                                  from={from}>
                    {message.text}
                </MessageComponent>
                    : <ImageMessageComponent key={i} src={message.media} author={author} from={from}>
                        {message.text ? message.text : ''}
                    </ImageMessageComponent>
            )
        })
    }

    const openChannel = id => {
        if (channel && channel.id === id) return;
        let channel_obj = props.channels.get(id);
        channel_obj.unreadCount = 0;
        setChannel(channel_obj);
        viewedChannel(channel_obj.id).then(() => {
        });
    }

    const updateSidebar = () => setSortedChannels(getSortedChannels(props.channels));

    // render messages on active channel change or new message
    useEffect(() => {
        if (channel !== null) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setMessageArray(generateMessages(channel instanceof GroupChannel))
        }
    }, [channel, messageCount])

    const updateData = (data, active_channel, windowFocus) => {
        let object = data.object;
        let raw = data.data;
        let _channel
        switch (object) {
            case 'Message':
                let message = rawToMessage(raw, props.users.get(raw.author));
                _channel = props.channels.get(raw.channel);
                if (!_channel) return console.error("Channel not found");
                if (!data['created']) {
                    for (let i in _channel.messages) {
                        if (_channel.messages[i].id === message.id) return _channel[i] = message;
                    }
                }
                _channel.messages.splice(0, 0, message);

                if (active_channel && raw.channel === active_channel.id && windowFocus) {
                    viewedChannel(raw.channel).then(() => {
                    });
                } else _channel.unreadCount++;


                updateSidebar();
                setMessageCount(_channel.messages.length);

                break;

            case 'Channel':
            case 'DirectChannel':
            case 'GroupChannel':
                if (data['created']) {
                    let a = raw.users.map(id => !props.users.get(id) && props.users.getUser(id))
                    a.push(getMessages(props.users, raw.id))
                    Promise.all(a).then(results => {
                        processRawChannel(raw, results[results.length - 1].get(raw.id), props.users).then(
                            e => {
                                props.channels.set(e);
                                updateSidebar();
                            }
                        );

                    })
                    break;
                }
                _channel = props.channels.get(raw.id);
                if (!_channel) return
                let updateData = {...raw};
                delete updateData['data'];
                delete updateData['type'];
                delete updateData['id'];

                let updatedFields = _channel.update(updateData, props.users);
                updatedFields.then(e => {
                    if (e.includes('last_open_by') || e.includes('name')) updateSidebar();
                })
                break;
            default:
                console.error("Received unexpected object type: " + object);
        }
    }

    const deleteData = (data) => {
        let object = data.object;
        let id = data.id;
        switch (object) {
            case 'Message':
                // todo delete message
                break;

            case 'Channel':
            case 'DirectChannel':
            case 'GroupChannel':
                props.channels.delete(id);
                updateSidebar();
                break;
            default:
                console.error("Received unexpected object type: " + object);
        }
    }

    function handleReceive(event, activeChannel, windowFocus) {
        let data = JSON.parse(event.data);

        switch (data.type) {
            case 'object.update':
                updateData(data, activeChannel, windowFocus);
                break;
            case 'object.delete':
                deleteData(data)
                break;
            case 'force_logout':
                props.clearDesk()
                break;
            case 'error':
                console.error('Received WebSocket error: ' + data.data.detail)
                console.log({data})
                break;

        }

    }

    useEffect(() => {
        setWSH(new BaseWebsocketHandler(props.users, props.channels))

        return () => {
            if (wsh) wsh.disconnect();
        }
    }, [])
    useEffect(() => {
        if (!wsh) return
        wsh.handleReceive = e => handleReceive(e, channel, windowFocus)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel, windowFocus])

    useEffect(() => {
        if (channel && channel.unreadCount > 0) viewedChannel(channel.id).then(() => updateSidebar());
    }, [windowFocus])

    const sendMessage = (message) => {
        wsh.ws.send(JSON.stringify({
            type: "message",
            data: {
                "text": message,
                "media": null,
                "channel": channel.id
            }
        }))
    }

    const createDirect = async id => createDirectChannel(id);


    return (

        <UserContext.Provider value={props.user}>
            <div className='h-screen bg-secondary/90 text-ptext relative'>
                <Sidebar clearDesk={props.clearDesk}
                         setActiveConversation={openChannel} channels={props.channels}
                         sortedChannels={sortedChannels} setSettingsVisible={setSettingsVisible}
                         openSearch={() => setSearchVisible(true)}
                />
                <MessagePanel activeChannel={channel} setChannel={setChannel}
                              messages={messageArray} sendMessage={sendMessage}/>


            </div>
            {settingsVisible ?
                <ClearDeskContext.Provider value={props.clearDesk}>
                    <SettingsModal visible={true} setVisible={setSettingsVisible}/>
                </ClearDeskContext.Provider> : ''}

            {searchVisible ? <UserSearch
                visible={searchVisible}
                closeModal={() => setSearchVisible(false)}
                onSelect={createDirect}
            /> : ''}
        </UserContext.Provider>
    );
}


