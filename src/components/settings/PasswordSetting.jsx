import React from 'react';
import {SettingsContainer} from "./SettingsContainer";
import {SettingsField, SettingsForm} from "./SettingsForm";

function PasswordSetting(props) {
    return (
        <SettingsContainer id={props.id}>
            <SettingsForm onSubmit={() => console.log('submitted')} title={'Change password'}>
                <SettingsField type={'password'} label={'Old password'}/>
                <SettingsField type={'password'} label={'New password'}/>
                <SettingsField type={'password'} label={'Repeat new password'}/>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default PasswordSetting;