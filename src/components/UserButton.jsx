import React from 'react';
import Avatar from "react-avatar";

function UserButton(props) {
    let autoAvatar = <Avatar name={props.username} size={'56'} round={true}/>
    return (
        <button className={'flex items-left row align-left px-2 py-3 hover:bg-rose-500 w-full h-22'}
                onClick={() => {
                    props.setActiveConversation(props.username)
                }}>
            {/*<img src={props.avatar} alt={props.username} className='w-14'/>*/}
            {/*todo loading images*/}
            {/*todo merge with UserCard*/}
            {props.avatar === null || true?
                autoAvatar :
                <img src={props.avatar} className={'max-h-14 rounded-[100%] bg-white'} alt={autoAvatar}/>}

            <div
                className={
                    'on-expand text-xl ml-3 m-auto overflow-hidden text-ellipsis align-middle'}>
                {props.username}
            </div>
        </button>
    );
}

export default UserButton;
