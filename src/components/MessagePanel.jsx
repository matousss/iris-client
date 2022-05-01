import React from 'react';
import Message from "./Message";
import InputField from "./InputField";

function MessagePanel(props) {
    return (
        <div className='h-screen ml-16 flex flex-col'>
            <div className='flex w-full mx-auto shadow-lg h-[80px]'>
                <span className='m-auto py-5 text-4xl'>{props.activeConversation}</span>
            </div>
            <div className='grow flex flex-col-reverse overflow-y-scroll overflow-x-hidden messages'>
                <Message from={true}>[Company Name] is having a [offer] sale until the end of [month]. Visit [location]
                    today on [address] for more info and special prices.</Message>
                <Message from={false}>Receive discounts on [offer]. Text “KEYWORD” to [business number] and get 10%
                    discount on your next order! [Company Name] Reply UNSUB to unsubscribe.</Message>
                <Message from={true}>
                    Receive discounts on [offer]. Text “KEYWORD” to [business number] and get 10% discount on your next order! [Company Name] Reply UNSUB to unsubscribe.
                </Message>
                <Message from={false}>
                    <img src={"https://cdn.pixabay.com/photo/2020/03/23/08/45/cat-4959941_960_720.jpg"} className={"duration-100 h-full rounded-3xl"}/>
                </Message>
            </div>
            <InputField/>
        </div>
    );
}

export default MessagePanel;