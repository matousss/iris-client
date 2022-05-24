import React, {useContext, useState} from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";
import {UserContext} from "../Main";

function EmailSetting(props) {
    const [emailInput, setEmailInput] = useState(useContext(UserContext).email);

    return (
        <SettingsContainer {...props}>
            <SettingsForm onSubmit={() => console.log('submitted')} title={'Change email'}>
                <UserContext.Consumer>
                    {(user) => <SettingsField type={'email'} value={user.email} label={'Enter email'}/>}
                </UserContext.Consumer>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default EmailSetting;