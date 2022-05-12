import React, {useState} from 'react';
import Modal from 'react-modal'
import SettingsButton from "./SettingsButton";
import * as SettingsEnum from '../../utils/SettingsEnum';
import EmailSetting from "./EmailSetting";
import PasswordSetting from "./PasswordSetting";
import AvatarSetting from "./AvatarSetting";

export default function SettingsModal(props) {
    const[setting, setSetting] = useState(SettingsEnum.password);

    const selectComponent = () => {
        switch (setting){
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
        <Modal className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full md:w-2/3 md:h-3/4 lg:w-1/2 lg:h-2/3 border-2 border-gray-400 outline-none rounded-2xl shadow-2xl p-4 flex flex-col bg-white'
               isOpen={props.visible}>
            <h1 className='text-3xl mb-3'>Settings</h1>
            <div className='grow flex'>
                <ul className='w-1/3 md:w-1/4 h-full pl-3 border-r-2'>
                    <li className='mt-5'>
                        <SettingsButton title={'Change password'} click={() => {setSetting(SettingsEnum.password)}}/>
                    </li>
                    <li className='mt-5'>
                        <SettingsButton title={'Change email'} click={() => {setSetting(SettingsEnum.email)}}/>
                    </li>
                    <li className='mt-5'>
                        <SettingsButton title={'Change avatar'} click={() => {setSetting(SettingsEnum.avatar)}}/>
                    </li>
                </ul>
                <div className='w-2/3 md:w-3/4 h-full mt-5 relative'>
                    {selectComponent()}
                </div>
            </div>
            <div className='w-full h-10 flex justify-end items-center'>
                <button className='bg-gray-300 mr-4 border-2 border-gray-300 settingsButton'
                        onClick={() => closeModal()}>Cancel</button>
                <button className='bg-orange-500 border-orange-500 settingsButton'
                        onClick={() => saveAndClose()}>Save</button>
            </div>
        </Modal>
    );
}