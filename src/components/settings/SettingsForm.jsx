import React from "react";
import {ModalButton} from "./ModalButton";

export const SettingsField = props =>
    <>
        {props.label ? <label className='text-lg'>{props.label}</label> : ''}
        <input className='border-2 border-ptext/10 rounded-3xl p-2 text-xs w-full max-w-3/5 bg-ptext/10' {...props}/>
    </>

export const SettingsForm = ({title, onSubmit, submitText = 'Save', children}) => {
    return <form className='flex flex-col w-full h-full' onSubmit={onSubmit}>
        {title ? (<h1 className='text-2xl mb-5'>{title}</h1>) : ''}
        <div className={'flex flex-col'}>
            {children}
        </div>
        <ModalButton className={' mt-auto ml-auto'}>
            {submitText}
        </ModalButton>
    </form>
}