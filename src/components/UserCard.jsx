import React from 'react';
import Avatar from "react-avatar";

export default function UserCard(props) {
     let autoAvatar = <Avatar className={"my-auto"} name={props.username} size={'56'} round={true}/>

    return (
        <div className={'flex items-left row align-left px-2 w-full h-full py-3'}>
            {props.avatar === null || true ?
                autoAvatar :
                <img src={props.avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>}

            <div
                className={
                    'on-expand overflow-hidden text-ellipsis Ih-full text-xl my-auto ml-3'}>
                {props.username}
            </div>
        </div>
    );
}
