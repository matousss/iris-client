import React from 'react';
import ChannelCard from "./ChannelCard";

export default function ChannelButton(props) {
    return (
        <button className={'w-full h-22 hover:bg-white/20 duration-[300ms]'}
                onClick={() => {
                    props.setActiveConversation(props.channel)
                }}>
            <ChannelCard username={props.username} avatar={props.avatar}/>
        </button>
    );
}
