import React from 'react';
import Avatar from "react-avatar";

const AutoAvatar = (props) => <Avatar className={"my-auto"} {...props} round={true}/>;

export const getAvatar = ({username, email, avatar, size = 56}) => (avatar === null ?
    <AutoAvatar name={username} email={email} className={'duration-0'} size={size}/> :
    <img src={avatar} className={'object-scale-down rounded-[100%] bg-white max-h-[' + size + 'px]'} alt={<AutoAvatar username={username}/>}/>);

export default function ChannelCard(props) {
    return (
        <div className={'flex items-left row align-left px-2 w-full h-full py-3'}>
            {getAvatar({...props})}

            <div
                className={
                    'on-expand text-xl my-auto ml-3 h-fixed text-left'}>
                <span className={"overflow-hidden text-ellipsis line-clamp-1 duration-75"}>{props.username}</span>

            </div>
        </div>
    );
}




