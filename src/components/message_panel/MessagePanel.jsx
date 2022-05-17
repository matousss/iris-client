import React, {useEffect} from 'react';
import InputField from "./InputField";

export function MessagePanel({activeChannel, messages, sendMessage}) {
    useEffect(() => console.log('messages updated'), [messages])

    return (
        <div className='h-screen ml-16 flex flex-col pl-3'>
            <div className='flex w-full mx-auto shadow-lg h-[80px] bg-ptext/5'>
                <span className='m-auto py-5 text-4xl'>{activeChannel ? activeChannel.title : ''}</span>
            </div>

            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages pt-3'>
                {
                    activeChannel ? <>
                        {messages}
                        <div
                            className={'text-sm mx-auto mb-3 px-5 text-ptext/5 border-ptext/5 border-b-.5 hover:text-ptext/40 hover:border-ptext/20 duration-500 cursor-default'}>
                            Begining of conversation
                        </div>
                    </> : 'todo intro screen'
                }


            </div>
            <InputField channel={activeChannel ? activeChannel.id : ''} sendMessage={sendMessage}/>
        </div>
    );
}


