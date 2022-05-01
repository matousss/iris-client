import React from 'react';
import UserCard from "./UserCard";

function UserButton(props) {
    return (
        <button className={'w-full h-22 hover:bg-white/20 duration-[300ms]'}
                onClick={() => {
                    props.setActiveConversation(props.username)
                }}>
            <UserCard username={props.username} avatar={props.avatar}/>
        </button>
    );
}

export default UserButton;
