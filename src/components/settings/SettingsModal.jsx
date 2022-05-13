import React, {useState} from 'react';
import SettingsButton from "./SettingsButton";
import * as SettingsEnum from '../../utils/SettingsEnum';
import EmailSetting from "./EmailSetting";
import PasswordSetting from "./PasswordSetting";
import AvatarSetting from "./AvatarSetting";
import {CustomModal} from "../CustomModal";

export default function SettingsModal(props) {
    const [setting, setSetting] = useState(SettingsEnum.password);

    const selectComponent = () => {
        switch (setting) {
            case SettingsEnum.email:
                return <EmailSetting/>;
            case SettingsEnum.password:
                return <PasswordSetting/>;
            case SettingsEnum.avatar:
                return <AvatarSetting/>;
        }
    }

    const closeModal = () => {
        props.setVisible(false);
    }

    const saveAndClose = () => {
        // TODO save changes
        closeModal();
    }



    return (
        <CustomModal
               isOpen={props.visible}
        >
            <div className={'flex'}>
            <h1 className='text-3xl mb-3 mr-auto'>Settings</h1>
            <div className={'flex h-full'}>
                <button className={'h-[80%] group text-ptext/10 hover:text-warning'} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={"h-full"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
            </div>
            <div className='grow flex'>
                <ul className='w-1/3 md:w-1/4 h-full border-r-[1px] border-ptext/20'>
                    <li>
                        <SettingsButton title={'Change password'} click={() => {
                            setSetting(SettingsEnum.password)
                        }}/>
                    </li>
                    <li>
                        <SettingsButton title={'Change email'} click={() => {
                            setSetting(SettingsEnum.email)
                        }}/>
                    </li>
                    <li>
                        <SettingsButton title={'Change avatar'} click={() => {
                            setSetting(SettingsEnum.avatar)
                        }}/>
                    </li>
                </ul>
                <div className='w-2/3 md:w-3/4 h-full mt-5 relative'>
                    {selectComponent()}
                </div>
            </div>


        </CustomModal>
    );
}