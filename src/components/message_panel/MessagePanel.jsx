import React, {useEffect} from 'react';
import InputField from "./InputField";
import {ImageMessageComponent, MessageComponent} from "./MessageComponent";

export function MessagePanel({activeChannel, messages, sendMessage}) {
    useEffect(() => console.log('messages updated'), [messages])

    return (
        <div className='h-screen ml-16 flex flex-col pl-3'>
            <div className='flex w-full mx-auto shadow-lg h-[80px] bg-ptext/5'>
                <span className='m-auto py-5 text-4xl'>{activeChannel ? activeChannel.title : ''}</span>
            </div>
            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages pt-3'>

                {
                    activeChannel ? messages : 'todo intro screen'
                }
                <div className={'text-sm text-ptext/50 mx-auto mb-3'}>
                    Begining of conversation
                </div>
            </div>
            <InputField channel={activeChannel ? activeChannel.id : ''} sendMessage={sendMessage}/>
        </div>
    );
}


