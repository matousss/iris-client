import React from "react";

export const SettingsField = props =>
    <>
        {props.label ? <label className='text-lg'>{props.label}</label> : ''}
        <input className='border-2 border-ptext/10 rounded-3xl p-2 text-xs w-full max-w-3/5 bg-ptext/10' {...props}/>
    </>

export const SettingsForm = ({title, onSubmit, submitText = 'Save', children}) => {
    return <form className='flex flex-col w-full h-full' onSubmit={onSubmit}>
        {title ? (<h1 className='text-2xl mb-5'>{title}</h1>) : ''}
        <div className={'flex flex-col my-auto'}>
            {children}
        </div>
        <button className='w-20 p-1 mb-3 mt-auto mr-auto
        bg-middle/70 hover:bg-ptext/10
        text-sm border-ptext/10 border-2 rounded-3xl'>{submitText}</button>
    </form>
}