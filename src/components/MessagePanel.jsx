import React, {useEffect} from 'react';
import InputField from "./InputField";

function MessagePanel({activeChannel, messages}) {
    useEffect(()=> console.log('messages updated'),[messages])

    return (
        <div className='h-screen ml-16 flex flex-col pl-3'>
            <div className='flex w-full mx-auto shadow-lg h-[80px]'>
                <span className='m-auto py-5 text-4xl'>{activeChannel ? activeChannel.title : ''}</span>
            </div>
            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages'>
                {
                    activeChannel ? messages : 'todo intro screen'
                }
            </div>
            <InputField channel={activeChannel ? activeChannel.id : ''}/>
        </div>
    );
}

export default MessagePanel;
