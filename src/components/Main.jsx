import React, {useEffect, useState} from 'react';
import Sidebar from "./sidebar";
import {GroupChannel, rawToMessage} from "../utils/ModelStorage";
import {MessagePanel, MessageComponent} from "./message_panel";
import {getSortedChannels} from "../utils/Sorting";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import SettingsModal from "./settings/SettingsModal";

export const UserContext = React.createContext(null);


export default function Main(props) {
    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    const [sortedChannels, setSortedChannels] = useState(getSortedChannels(props.channels));
    const [settingsVisible, setSettingsVisible] = useState(false);

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

    useEffect(() => {
        if (channel !== null) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setMessageArray(generateMessages(channel instanceof GroupChannel))
        }
    }, [channel, messageCount])

    useEffect(() => {
        let wsh = new BaseWebsocketHandler(props.users, props.channels)
        wsh.handleReceive = (event) => {
            let data = JSON.parse(event.data);
            let object = data.object;
            let raw = data.data;
            switch (object) {
                case 'Message':
                    let message = rawToMessage(raw, props.users.get(raw.author));
                    let channel = props.channels.get(raw.channel);
                    if (channel === undefined) return console.error("Channel not found");
                    for (let i in channel.messages) {
                        if (channel.messages[i].id === message.id) return channel[i] = message;
                    }
                    channel.messages.splice(0, 0, message);
                    if (sortedChannels[0].id !== raw.channel) setSortedChannels(getSortedChannels(props.channels));
                    setMessageCount(channel.messages.length)

                    break;
                case 'DirectChannel':
                case 'GroupChannel':
                    console.log({data})
                //    todo updating channels dynamically
                case 'error':
                    console.error('Received WebSocket error: ' + raw.detail)
                    console.log({raw})
                    break;
                default:
                    console.error("Received unexpected object type: " + object);
            }
        };



        setWSH(wsh)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




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
                         setActiveConversation={id => setChannel(props.channels.get(id))} channels={props.channels}
                         sortedChannels={sortedChannels} setSettingsVisible={setSettingsVisible}
                />
                <MessagePanel activeChannel={channel}
                              messages={messageArray} sendMessage={sendMessage}/>
                {settingsVisible ? <SettingsModal visible={true} setVisible={setSettingsVisible}/> : ''}
            </div>
        </UserContext.Provider>
    );
}


