import React from "react";
import {ModalButton} from "./ModalButton";

export const SettingsField = ({valueSetter, label, ...props}) =>
    <>
        {label ? <label className='text-lg'>{label}</label> : ''}
        <input className='border-2 border-ptext/10 rounded-3xl p-2 text-xs w-full max-w-3/5 bg-ptext/10' {...props}
            onChange={e => valueSetter(e.target.value)}
        />
    </>

export const SettingsForm = ({title, onSubmit, submitText = 'Save', children, disabled, message}) => {
    return <form className='flex flex-col w-full h-full' onSubmit={onSubmit}>
        {title ? (<h1 className='text-2xl mb-5'>{title}</h1>) : ''}
        <fieldset className='flex flex-col w-full h-full' disabled={disabled}>
            <div className={'flex flex-col'}>
                {children}
            </div>
            <div className={'mt-auto flex flex-row mb-0'}>
                <div className={'ml-auto my-auto text-lg overflow-auto max-h-10'}>
                    {message ? message : ''}
                </div>
                <ModalButton className={' ml-auto'}>
                    {submitText}
                </ModalButton>
            </div>

        </fieldset>
    </form>
}