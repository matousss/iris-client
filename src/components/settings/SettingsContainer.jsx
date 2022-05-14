import React from "react";

export const SettingsContainer = props =>
    // todo improve animation, maybe just scrolling?
    <div className='flex flex-col h-full w-full mx-auto p-3 snap-start snap-center scroll-my-8' {...props}/>

const SettingTitle = ({children}) => <h1 className='text-2xl mb-5'>{children}</h1>

export const TitledSettingContainer = props =>
    <SettingsContainer {...props} children={<><SettingTitle>{props.title}</SettingTitle>{props.children}</>}/>
