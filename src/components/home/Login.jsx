import React, {useState} from 'react';
import * as Page from '../../utils/PageEnum'
import {login} from "../../utils/RequestUtils";
import HomeForm from "./form/HomeForm";
import FormField from "./form/FormField";

export function Login(props) {
    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.target.firstChild.disabled = true;
        e.preventDefault();

        try {
            let response = await login(window.btoa(usernameField.toString() + ':' + passwordField.toString()))


            await handleFetch(response);
        } catch (e) {
            console.error(e);
            setError('Unexpected error');
        } finally {
            e.target.firstChild.disabled = false;
        }
    }

    const handleFetch = (response) => {

        switch (response.status) {
            case 200:
                response.json().then(data => {
                    props.setUser(data['user']);
                    props.initMain(data['token'])
                })
                break;
            case 401:
                setError('Invalid username or password')
                break;
            case 406:
                props.setUser({'username': usernameField})
                props.setPage(Page.verify)
                break;
            default:
                setError('Unexpected error ' + response.status)
        }

    }

    const handleCheck = (e) => {
        props.setStayLoggedIn(e.target.checked);
    }

    return (
        <>
            <h1 className='text-black text-6xl mb-6 text-center'>Welcome to Iris</h1>
            <HomeForm onSubmit={handleSubmit} error={error} submitText={'log in'}>

                <FormField label={'Username'}
                           value={usernameField} onChange={(e) => setUsernameField(e.target.value)}/>
                <FormField
                    label={'Password'}
                    type={"password"}
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                />
                <div className='flex items-center'>
                    <input className='ml-1'
                           type='checkbox'
                           onChange={handleCheck}
                           checked={props.stayLoggedIn}
                    />
                    <span className='ml-2 text-sm'>stay logged in</span>
                </div>
            </HomeForm>
            <button className='mt-6 text-lg underline' onClick={() => props.setPage(Page.signup)}>Don't have an account
                yet? Sign up
            </button>
        </>
    )
}
