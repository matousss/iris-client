import React, {createElement, useContext, useState} from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";
import {UserContext} from "../Main";
import {changeEmail} from "../../utils/requests/DataReq";

function EmailSetting({loading, setLoading, ...props}) {
    const user = useContext(UserContext)
    const [emailInput, setEmailInput] = useState(user.email);
    const [message, setMessage] = useState(null);

    return (
        <SettingsContainer {...props}>
            <SettingsForm onSubmit={async e => {
                e.preventDefault();
                if (emailInput.trim() === '') return setMessage(createElement('span', {className: 'text-warning'}, 'Field cannot be empty'))
                setLoading(true);
                try {
                    let response = await changeEmail(emailInput);
                    switch (response.status) {
                        case 200:
                            user.email = emailInput;
                            return setMessage(createElement('span', {className: 'text-lime-700'}, 'Saved!'));
                        default:
                            setMessage(createElement('span', {className: 'text-warning font-bold'}, 'Unexpected error'))
                    }
                } finally {
                    setLoading(false);
                }
            }} title={'Change email'} message={message} disabled={loading}>

                <SettingsField type={'email'} value={emailInput} label={'Enter email'} valueSetter={setEmailInput}/>

            </SettingsForm>
        </SettingsContainer>
    );
}

export default EmailSetting;