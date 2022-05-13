import React from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";
import {UserContext} from "../Main";

function EmailSetting(props) {
    return (
        <SettingsContainer>
            <SettingsForm onSubmit={() => console.log('submitted')} title={'Change email'}>
                <UserContext.Consumer>
                    {(user) => <SettingsField type={'email'} value={user.email} label={'Enter email'}/>}
                </UserContext.Consumer>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default EmailSetting;