import React, {useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {rawToMessage} from "../utils/ModelStorage";
import {MessagePanel, MessageComponent} from "./message_panel";
import {getSortedChannels} from "../utils/Sorting";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import SettingsModal from "./settings/SettingsModal";

export const UserContext = React.createContext(null);


export default function Main(props) {
    const [activeConversation, setActiveConversation] = useState(() => {
        let lastActive = localStorage.getItem('lastActiveChannel');
        return props.channels.get(lastActive) === undefined ? null : lastActive;
    });


    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);


    const [sortedChannels, setSortedChannels] = useState(getSortedChannels(props.channels));

    const [settingsVisible, setSettingsVisible] = useState(false);

    const generateMessages = () => {
        return Array.from(channel.messages, (message, i) => {
            return (
                <MessageComponent key={i}
                                  from={message.author.id !== props.user.user}>
                    {message.text ? message.text : `Media: $${message.media}`}
                </MessageComponent>
            )
        })
    }

    useEffect(() => {
        localStorage.setItem('lastActiveChannel', activeConversation)
        setChannel(props.channels.get(activeConversation))

    }, [activeConversation])

    useEffect(() => {
        if (channel) {
            setMessageArray(generateMessages())
        }
    }, [channel, messageCount])

    useEffect(() => {
        let wsh = new BaseWebsocketHandler(props.users, props.channels)
        wsh.handleReceive = handleReceive;
        setWSH(wsh)
    }, [])


    const handleReceive = (event) => {
        let data = JSON.parse(event.data);
        let type = data.type;
        let raw = data.data;
        switch (type) {
            case 'message':
                let message = rawToMessage(raw, props.users.get(raw.author));
                let channel = props.channels.get(raw.channel);
                if (channel === undefined) return console.error("Channel not found");
                channel.messages.splice(0, 0, message);
                if (sortedChannels[0].id !== raw.channel) setSortedChannels(getSortedChannels(props.channels));
                setMessageCount(channel.messages.length)

                break;
            case 'error':
                console.error('Received WebSocket error: ' + raw)
                break;
            default:
                console.error("Received unexpected object type: " + type);
        }
    }

    const sendMessage = (message) => {
        wsh.ws.send(JSON.stringify({
            type: "message",
            data: {
                "text": message,
                "media": false,
                "channel": activeConversation
            }
        }))
    }

    return (

        <UserContext.Provider value={props.user}>
            <div className='h-screen bg-secondary/90 text-text-1 relative'>
                <Sidebar clearDesk={props.clearDesk}
                         setActiveConversation={setActiveConversation} channels={props.channels}
                         sortedChannels={sortedChannels} setSettingsVisible={setSettingsVisible}
                />
                <MessagePanel activeChannel={channel}
                              messages={messageArray} sendMessage={sendMessage}/>
                <SettingsModal visible={settingsVisible} setVisible={setSettingsVisible}/>
            </div>
        </UserContext.Provider>
    );
}


