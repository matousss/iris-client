import React from 'react';

export function MessageComponent({from, author, children}) {
    return (
        <>

            <div className={'max-w-3/5 lg:max-w-1/2 max-h-[30rem] mx-5 mb-2 ' + (from ? 'incoming-message' : 'ml-auto')}>
                <label className={'text-sm text-ptext/60 ml-3 hidden incoming-only'}>
                    {author.username}
                </label>
                <div
                    className={'message-body'}>
                    {children}
                </div>
            </div>
        </>
    );
}

export const ImageMessageComponent = (props) => <MessageComponent {...props}>
    {props.children}
    <img src={props.src} alt={'Image failed to load'}
         className={'rounded-2xl cursor-pointer mt-2'} onClick={() => console.log('todo show large image')}/>
</MessageComponent>

