import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";
import {Channel, rawToMessage, User} from "../utils/ModelStorage";
import BaseWebsocketHandler from "../utils/BaseWebsocketHandler";
import Message from "./Message";


export default function NewMain(props) {
    const [activeConversation, setActiveConversation] = useState(() => {
        let lastActive = localStorage.getItem('lastActiveChannel');
        return props.channels.get(lastActive) === undefined ? null : lastActive;
    });

    const [wsh, setWSH] = useState(null)
    const [channel, setChannel] = useState(null);
    const [messageArray, setMessageArray] = useState([]);
    const [messageCount, setMessageCount] = useState(0);

    const generateMessages = () => {
        return Array.from(channel.messages, (message, i) => {
            return (
                <Message key={i}
                         from={message.author.id !== props.user.user}>
                    {message.text ? message.text : `Media: $${message.media}`}
                </Message>
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

                channel.messages.splice(0,0, message);
                setMessageCount(channel.messages.length)

                break;
            default:
                console.error("Received unexpected object type: " + type);
        }
    }

    return (


        <div className='h-screen bg-secondary/90 text-text-1'>
            <Sidebar user={props.user} setUser={props.setUser} clearDesk={props.clearDesk}
                     setActiveConversation={setActiveConversation} channels={props.channels}/>
            <MessagePanel user={props.user} activeChannel={channel}
                          messages={messageArray}/>
        </div>
    );
}


