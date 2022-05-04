import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";
import {rawToMessage} from "../utils/ModelStorage";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import MessageComponent from "./MessageComponent";
import {getSortedChannels} from "../utils/Sorting";


export default function NewMain(props) {
    const [activeConversation, setActiveConversation] = useState(() => {
        let lastActive = localStorage.getItem('lastActiveChannel');
        return props.channels.get(lastActive) === undefined ? null : lastActive;
    });

    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);




    const [sortedChannels, setSortedChannels] = useState(getSortedChannels(props.channels));

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
            default:
                console.error("Received unexpected object type: " + type);
        }
    }

    const sendMessage = (message) => {
        wsh.send()
    }

    return (


        <div className='h-screen bg-secondary/90 text-text-1'>
            <Sidebar user={props.user} setUser={props.setUser} clearDesk={props.clearDesk}
                     setActiveConversation={setActiveConversation} channels={props.channels}
                     sortedChannels={sortedChannels}
            />
            <MessagePanel user={props.user} activeChannel={channel}
                          messages={messageArray}/>
        </div>
    );
}


