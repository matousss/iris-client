import React from 'react';

function SettingsButton(props) {
    return (
        <button onClick={() => props.click()} className='w-full border-y-[1px] border-white/0 hover:border-ptext/10 p-2'>{props.title}</button>
    );
}

export default SettingsButton;