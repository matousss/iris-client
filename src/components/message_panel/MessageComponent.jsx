import React from 'react';
import {getAvatar} from "../sidebar/ChannelCard";
import BAN_ICON from '../../assets/ban_icon.svg'


export function MessageComponentBase({from, children}) {
    return (
        <>

            <div
                className={'max-w-3/5 lg:max-w-1/2 max-h-[30rem] mx-5 mb-2 ' + (from ? 'incoming-message' : 'ml-auto')}>
                {children}
            </div>
        </>
    );
}

const AuthoredIncomingMessage = ({from, author, children}) => {
    let avatar_info = {...author};
    const deleted_user = author.id === null;
    if (deleted_user) avatar_info.avatar = BAN_ICON

    return <MessageComponentBase from={from}>

        <label className={'text-sm text-ptext/60 ml-10 ' + (deleted_user ? 'italic' : '')}>
            {author.username}
        </label>
        <div className={'flex'}>
            <div className={'mr-2 mt-auto max-h-[32px]'}>
                {getAvatar({...avatar_info, size: 32})}
            </div>
            <div className={'message-body authored-message'}>
                {children}
            </div>
        </div>
    </MessageComponentBase>
}

const PlainMessage = props => <MessageComponentBase {...props}>
    <div className={'message-body'}>
        {props.children}
    </div>
</MessageComponentBase>

export const MessageComponent = (props) => (props.from && props.author ?
    <AuthoredIncomingMessage {...props}/> : <PlainMessage {...props}/>)

export const ImageMessageComponent = ({src, ...props}) => <MessageComponent {...props}>
    {props.children}
    <img src={src} alt={'Image failed to load'}
         className={'rounded-2xl cursor-pointer mt-2'} onClick={() => console.log('todo show large image')}/>
</MessageComponent>

