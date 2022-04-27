import React from 'react';
import Avatar from "react-avatar";

function UserButton(props) {
    let autoAvatar = <Avatar name={props.username} size={'56'} round={true}/>
    return (
        <button className={'flex items-center px-1 py-3 hover:bg-rose-500' + (props.visible ? ' pl-8 w-96' : '')} onClick={() => {props.setActiveConversation(props.username)}}>
            {/*<img src={props.avatar} alt={props.username} className='w-14'/>*/}
            {/*todo loading images*/}
            {/*todo merge with UserCard*/}
            {props.avatar === null ?  autoAvatar: <img src={props.avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>}
            <span className={(props.visible ? 'block' : 'hidden') + ' text-xl ml-5'}>{props.username}</span>
        </button>
    );
}

export default UserButton;
