import React, {useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {GroupChannel, Message, rawToMessage} from "../utils/ModelStorage";
import {MessagePanel, MessageComponent} from "./message_panel";
import {getSortedChannels} from "../utils/Sorting";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import SettingsModal from "./settings/SettingsModal";
import {viewedChannel} from "../utils/requests/RequestUtils";
import {useWindowFocus} from "../utils/Hooks";
import {processRawChannel} from "../utils/StorageUtil";

export const UserContext = React.createContext(null);


export default function Main(props) {
    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    const [sortedChannels, setSortedChannels] = useState(getSortedChannels(props.channels));
    const [settingsVisible, setSettingsVisible] = useState(false);
    const windowFocus = useWindowFocus();


    const generateMessages = (showAuthor) => {
        return Array.from(channel.messages, (message, i) => {
            return (
                <MessageComponent key={i} author={showAuthor ? message.author : ''}
                                  from={message.author.id !== props.user.id}>
                    {message.text ? message.text : `Media: $${message.media}`}
                </MessageComponent>
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
                    Promise.all(a).then(() => {
                        processRawChannel(raw, null, props.users).then(
                            e => {
                                props.channels.set(e);
                                updateSidebar();
                            }

                        );

                    })
                    break;
                }
                _channel = props.channels.get(raw.id);
                let updateData = {...raw};
                delete updateData['data'];
                delete updateData['type'];
                delete updateData['id'];

                let updatedFields = _channel.update(updateData, props.users);
                updatedFields.then(console.log)
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


        console.log({data})

        switch (data.type) {
            case 'object.update':
                updateData(data, activeChannel, windowFocus);
                break;
            case 'object.delete':
                deleteData(data)
                break;
            case 'force_logout':
                // todo force logout
                console.log('force logout now')
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
        if (channel && channel.unreadCount > 0) viewedChannel(channel.id).then(() => {
        });
    }, [windowFocus])

    const sendMessage = (message) => {
        wsh.ws.send(JSON.stringify({
            type: "message",
            data: {
                "text": message,
                "media": false,
                "channel": channel.id
            }
        }))
    }

    return (

        <UserContext.Provider value={props.user}>
            <div className='h-screen bg-secondary/90 text-ptext relative'>
                <Sidebar clearDesk={props.clearDesk}
                         setActiveConversation={openChannel} channels={props.channels}
                         sortedChannels={sortedChannels} setSettingsVisible={setSettingsVisible}
                />
                <MessagePanel activeChannel={channel}
                              messages={messageArray} sendMessage={sendMessage}/>
                {settingsVisible ? <SettingsModal visible={true} setVisible={setSettingsVisible}/> : ''}
            </div>
        </UserContext.Provider>
    );
}


