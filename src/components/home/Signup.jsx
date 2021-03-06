import React, {useState} from 'react'
import * as Page from '../../utils/PageEnum'
import {signup} from '../../utils/requests/AuthReq'
import HomeForm from "./form/HomeForm";
import FormField from "./form/FormField";

export function Signup({setUser, setPage, setLoading, showError}) {
    const [emailField, setEmailField] = useState('')
    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [passwordAgainField, setPasswordAgainField] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.firstChild.disabled = true;
        setLoading(true)
        try {
            if (passwordField !== passwordAgainField) {
                return setErrorMessage("passwords don't match");
            }
            let response = await signup({
                'email': emailField,
                'username': usernameField,
                'password': passwordField,
            })
            await handleFetch(response)
        }
        catch (e) {
            showError('Server unreachable', 'Please reload page')
        }
        finally {
            e.target.firstChild.disabled = false;
            setLoading(false);
        }

    }

    const handleFetch = async (response) => {
        let data = await response.json()

        switch (response.status) {
            case 200:
                setPage(Page.verify);
                setUser(data['user'])
                break;
            case 400:
                let errMsg = 'Check fields listed below: \n'
                Object.keys(data).forEach(key => errMsg += `${key}: ${data[key]}\n`)
                setErrorMessage(errMsg);
                break;
            default:
                setErrorMessage(`Unknown error (code: ${response.status})`)
        }
    }

    return (
        <>
            <h1 className='text-5xl mb-6 text-center'>No account? No problem!</h1>
            <HomeForm onSubmit={handleSubmit} error={errorMessage} submitText={'register'}>
                <FormField label={'Email'} type={'email'}
                           value={emailField} onChange={(e) => setEmailField(e.target.value)}/>
                <FormField label={'Username'}
                           value={usernameField} onChange={(e) => setUsernameField(e.target.value)}/>
                <FormField label={'Password'} type={'password'}
                           value={passwordField} onChange={(e) => setPasswordField(e.target.value)}/>
                <FormField label={'Password Again'} type={'password'}
                           value={passwordAgainField} onChange={(e) => setPasswordAgainField(e.target.value)}/>
            </HomeForm>
            <button className='mt-4 text-lg underline' onClick={() => setPage(Page.login)}>
                Go back ???
            </button>
        </>
    )
}
