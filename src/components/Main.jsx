import React, {useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {GroupChannel, rawToMessage} from "../utils/ModelStorage";
import {MessagePanel, MessageComponent} from "./message_panel";
import {getSortedChannels} from "../utils/Sorting";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import SettingsModal from "./settings/SettingsModal";
import {viewedChannel} from "../utils/requests/RequestUtils";
import {useWindowFocus} from "../utils/Hooks";
import ErrorModal from "./ErrorModal";

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

    // render messages on active channel change or new message
    useEffect(() => {
        if (channel !== null) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setMessageArray(generateMessages(channel instanceof GroupChannel))
        }
    }, [channel, messageCount])


    function handleReceive(event, active_channel, windowFocus) {
        let data = JSON.parse(event.data);
        let object = data.object;
        let raw = data.data;
        let _channel
        switch (object) {
            case 'Message':
                let message = rawToMessage(raw, props.users.get(raw.author));
                _channel = props.channels.get(raw.channel);
                if (!_channel) return console.error("Channel not found");
                for (let i in _channel.messages) {
                    if (_channel.messages[i].id === message.id) return _channel[i] = message;
                }
                _channel.messages.splice(0, 0, message);

                if (active_channel && raw.channel === active_channel.id && windowFocus) {
                    viewedChannel(raw.channel).then(() => {
                    });
                } else _channel.unreadCount++;


                setSortedChannels(getSortedChannels(props.channels));
                setMessageCount(_channel.messages.length)

                break;

            case 'Channel':
            case 'DirectChannel':
            case 'GroupChannel':
                console.log({data})
                _channel = props.channels.get(raw.id);
                let updateData = {...raw};
                delete updateData['data'];
                delete updateData['type'];
                let updatedFields = _channel.update(raw);
                console.log({updatedFields})
                break;
            case 'force_logout':
                // todo force logout
            case 'error':
                console.error('Received WebSocket error: ' + raw.detail)
                console.log({raw})
                break;
            default:
                console.error("Received unexpected object type: " + object);
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
        if (channel && channel.unreadCount > 0) viewedChannel(channel.id).then(() => {});
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


