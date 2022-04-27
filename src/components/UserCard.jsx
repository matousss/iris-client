import React from 'react';
import Avatar from "react-avatar";

export default function UserCard(props) {
     let autoAvatar = <Avatar name={props.username} size={'56'} round={true}/>

    return (
        <div className='flex items-center w-full px-1 py-3'>
            {props.avatar === null ?  autoAvatar: <img src={props.avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>}
            <span className={(props.visible ? 'block' : 'hidden') + ' text-xl ml-5'}>{props.username}</span>
        </div>
    );
}
