import React from 'react';
import Avatar from "react-avatar";

export function getAvatar (username, avatar) {
    let autoAvatar = <Avatar className={"my-auto"} name={username} size={'56'} round={true}/>
    return avatar === null ? autoAvatar :
        <img src={avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>
}

export default function ChannelCard(props) {
    let autoAvatar = <Avatar className={"my-auto"} name={props.username} size={'56'} round={true}/>

    return (
        <div className={'flex items-left row align-left px-2 w-full h-full py-3'}>
            {getAvatar(props.username, props.avatar)}

            <div
                className={
                    'on-expand text-xl my-auto ml-3 h-fixed text-left'}>
                <span className={"overflow-hidden text-ellipsis line-clamp-1 duration-75"}>{props.username}</span>

            </div>
        </div>
    );
}
