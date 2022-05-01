import React from 'react';
import Message from "./Message";
import InputField from "./InputField";
import {Channel} from "../utils/ModelStorage";

function MessagePanel(props) {
    const activeChannel: Channel = props.channels.get(props.activeConversation);
    const generateMessages = () => Array.from(activeChannel.messages, (message, i) => {
        return <Message key={i} from={message.author.id !== props.user.user}>{message.text ? message.text : `Media: $${message.media}`}</Message>
    })

    return (
        <div className='h-screen ml-16 flex flex-col pl-3'>
            <div className='flex w-full mx-auto shadow-lg h-[80px]'>
                <span className='m-auto py-5 text-4xl'>{activeChannel ? activeChannel.title : ''}</span>
            </div>
            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages'>
                {
                    activeChannel ? generateMessages() : 'todo intro screen'
                }
            </div>
            <InputField channel={props.activeConversation}/>
        </div>
    );
}

export default MessagePanel;