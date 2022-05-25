import React, {useContext, useState} from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";
import {UserContext} from "../Main";

function EmailSetting({loading, setLoading, ...props}) {
    const [emailInput, setEmailInput] = useState(useContext(UserContext).email);
    const [message, setMessage] = useState(null)

    return (
        <SettingsContainer {...props}>
            <SettingsForm onSubmit={e => {
                e.preventDefault();
                setMessage('WIP')
            }} title={'Change email'} message={message}>
                <UserContext.Consumer>
                    {(user) => <SettingsField type={'email'} value={user.email} label={'Enter email'} valueSetter={setEmailInput}/>}
                </UserContext.Consumer>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default EmailSetting;