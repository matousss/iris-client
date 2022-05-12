import React from 'react';

function SettingsButton(props) {
    return (
        <button onClick={() => props.click()} className='rounded-3xl p-2 hover:bg-gray-300'>{props.title}</button>
    );
}

export default SettingsButton;