import React from 'react';
import ChannelCard from "./ChannelCard";

export default function ChannelButton({setActiveConversation, channel}) {
    return (
        <button className={'w-full h-22 hover:bg-white/20 duration-[300ms]'}
                onClick={() => {
                    setActiveConversation(channel.id)
                }}>
            <ChannelCard username={channel.title}
                         avatar={channel.icon}
                        email={channel.users && channel.users.length === 2 ? channel.users[1].email : ''}
                         unreadCount={channel.unreadCount}
            />
        </button>
    );
}
