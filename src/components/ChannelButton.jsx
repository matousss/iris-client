import React from 'react';
import UserCard from "./UserCard";

export default function ChannelButton(props) {
    return (
        <button className={'w-full h-22 hover:bg-white/20 duration-[300ms]'}
                onClick={() => {
                    props.setActiveConversation(props.channel)
                }}>
            <UserCard username={props.username} avatar={props.avatar}/>
        </button>
    );
}