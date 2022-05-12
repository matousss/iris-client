import React from "react";

export default function HomeForm({children, onSubmit, error, submitText = 'Submit'}) {
    return (
        <form onSubmit={onSubmit}>
            <fieldset className={'flex flex-col w-full'}>
                {children}
                <span className='font-semibold text-sm text-red-700 whitespace-pre-line break-words'>{error}</span>
                <button type={'submit'} className='text-xl mt-3 p-1 rounded-lg bg-orange-500 hover:bg-rose-500'>{submitText}</button>
            </fieldset>
        </form>
    )
}


