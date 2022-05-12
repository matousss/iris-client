import React from 'react';

function EmailSetting(props) {
    return (
        <div className='flex flex-col w-4/5 mx-auto justify-center'>
            <h1 className='text-2xl mb-5'>Change email</h1>
            <form className='flex flex-col w-full md:w-1/2'>
                <label className='text-lg'>Please enter new email</label>
                <input type='text' required className='border-2 border-gray-300 rounded-3xl p-2 text-xs w-full'/>
                <button className='settingsButton mr-auto mt-3 bg-orange-500 border-orange-500'>ahoj</button>
            </form>
        </div>
    );
}

export default EmailSetting;