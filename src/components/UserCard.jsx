import React from 'react';
import Avatar from "react-avatar";

export default function UserCard(props) {
     let autoAvatar = <Avatar name={props.username} size={'56'} round={true}/>

    return (
        <div className={'flex items-left row align-left px-2 py-3 w-full'}>
            {props.avatar === null || true ?
                autoAvatar :
                <img src={props.avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>}

            <div
                className={
                    'on-expand text-xl ml-3 m-auto overflow-hidden text-ellipsis align-middle'}>
                {props.username}
            </div>
        </div>
    );
}
