import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";
import {Channel, User} from "../utils/ModelStorage";


export default function NewMain(props) {
    const [activeConversation, setActiveConversation] = useState(() => {
        let lastActive= localStorage.getItem('lastActiveChannel');
        return props.storage.channels.get(lastActive) === undefined ? null : lastActive;
    });
    useEffect(() => {
        localStorage.setItem('lastActiveChannel', activeConversation)
    }, [activeConversation])

    return (


        <div className='h-screen bg-secondary/90 text-text-1'>
            <Sidebar user={props.user} setUser={props.setUser} clearDesk={props.clearDesk}
                     setActiveConversation={setActiveConversation} storage={props.storage}/>
            <MessagePanel user={props.user} activeConversation={activeConversation}
                          setActiveConversation={setActiveConversation} channels={props.storage.channels}/>
        </div>
    );
}


