import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";
import {Channel, User} from "../utils/ModelStorage";



export default function NewMain(props) {
    const [activeConversation, setActiveConversation] = useState('');

    return (


        <div className='h-screen  bg-secondary/90 text-text-1'>
            <Sidebar user={props.user} setUser={props.setUser} clearDesk={props.clearDesk}
                     setActiveConversation={setActiveConversation} channels={props.channels} storage={props.storage}/>
            <MessagePanel user={props.user} activeConversation={activeConversation}
                          setActiveConversation={setActiveConversation}/>
        </div>
    );
}


