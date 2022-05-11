import React from 'react';
import Avatar from "react-avatar";

const AutoAvatar = ({username}) => <Avatar className={"my-auto"} name={username} size={'56'} round={true}/>;

export const getAvatar = (username, avatar) => (avatar === null ?
    <AutoAvatar username={username}/> :
    <img src={avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={<AutoAvatar username={username}/>}/>);

export default function ChannelCard(props) {
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




