import React, {createElement, useContext, useState} from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";
import {UserContext} from "../Main";
import {changePassword} from "../../utils/requests/SettingsReq";
import {LoadingContext} from "../../App";

function PasswordSetting(props) {
    let user = useContext(UserContext);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [message, setMessage] = useState(null);


    const onSubmit = e => {
        e.preventDefault();
        if (newPass !== repeatPass) return setMessage(
            createElement('span',
            {className: 'text-warning font-bold'},
            'Passwords don\'t match')
        );
        props.setLoading(true);
        changePassword(window.btoa(user.username + ':' + oldPass.toString()), newPass).then(
            e => {
                // todo handle errors
                props.setLoading(false);
            }
        );
    }

    return (
        <SettingsContainer id={props.id}>
            <SettingsForm onSubmit={onSubmit} title={'Change password'} disabled={props.loading} message={message}>
                <SettingsField type={'password'} label={'Old password'} valueSetter={setOldPass} value={oldPass}/>
                <SettingsField type={'password'} label={'New password'} valueSetter={setNewPass} value={newPass}/>
                <SettingsField type={'password'} label={'Repeat new password'} valueSetter={setRepeatPass}
                               value={repeatPass}/>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default PasswordSetting;