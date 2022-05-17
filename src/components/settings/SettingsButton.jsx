import React from 'react';

const activeClasses = 'active-button'



const SettingsButton = props =>
    <a className={'border-y-[1px] border-white/0 hover:border-ptext/10 p-2 pl-0 block duration-[300ms] settings-button '
        + (props.isActive ? activeClasses : '')}
       {...props}
       onClick={(e) => {
           e.preventDefault();
           let anchor = props.href.split('#')[1];
           props.scrollToAnchor(anchor);
       }}
    >
        <div className={'flex content pr-auto'}>
            <div className={'my-auto w-6 ' + (props.isActive ? 'opacity-1' : 'opacity-0')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
            </div>
            <div className={'w-[80%]'}>
                {props.children}
            </div>
        </div>
    </a>


export default SettingsButton;