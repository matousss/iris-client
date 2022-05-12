import React from "react";

export default function FormField({label, type = 'text', value = '', required = true, onChange}) {
    return (
        <>
            <label className='text-lg my-1'>{label}</label>
            <input
                className='bg-white outline-1 outline-gray-300 text-gray-700 text-lg p-1 mb-1 border-2 rounded-lg'
                type={type}
                required={required}
                value={value}
                onChange={onChange}
            />
        </>
    )
}