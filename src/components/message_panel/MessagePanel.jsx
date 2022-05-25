import React from 'react';
import InputField from "./InputField";
import {deleteChannel} from "../../utils/requests/DataReq";

export function MessagePanel({activeChannel, setChannel, messages, sendMessage}) {


    return (
        <div className='h-screen ml-16 flex flex-col pl-3'>
            <div className='flex w-full mx-auto shadow-lg h-[80px] bg-ptext/5 justify-center align-middle'>
                {activeChannel ? <>
                    <span className='py-5 text-4xl fixed'>{activeChannel.title}</span>
                    <button
                        className={'p-2 ml-auto mr-2 hover:bg-warning hover:text-white duration-250 rounded-xl h-fit my-auto text-ptext/50'}
                        onClick={() =>
                            deleteChannel(activeChannel.id).then(e => e.ok && setChannel(null))
                        }
                    >
                        Delete
                    </button>
                </> : ''}
            </div>

            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages pt-3'>
                {
                    activeChannel ? <>
                        {messages}
                        <div
                            className={'text-sm mx-auto mb-3 px-5 text-ptext/5 border-ptext/5 border-b-.5 hover:text-ptext/40 hover:border-ptext/20 duration-500 cursor-default'}>
                            Begining of conversation
                        </div>
                    </> : <div className={'m-auto text-xl'}>Start chatting from the left :D</div>
                }


            </div>
            {activeChannel ? <InputField channel={activeChannel.id} sendMessage={sendMessage}/> : ''}
        </div>
    );
}


