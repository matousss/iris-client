import React, {useState} from 'react'
import * as Page from '../../utils/PageEnum'
import {activateAccount} from "../../utils/requests/AuthReq";
import HomeForm from "./form/HomeForm";
import FormField from "./form/FormField";

export function Verify({user, setPage, initMain, setLoading, showError}) {
    const [codeField, setCodeField] = useState('')
    const [error, setError] = useState('')

    const handleFetch = async (response) => {
        let data = await response.json()
        switch (response.status) {
            case 200:
                initMain(data['token'])
                break;
            case 400:
                let err = ''
                Object.keys(data).forEach(
                    key => (err += (data[key] + '\n'))
                )
                setError(err);

                break;
            default:
                console.log(response);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response = await activateAccount(user.username, codeField)

            await handleFetch(response)
        } catch (e) {
            showError('Server unreachable', 'Please reload page')
            console.error(e);
            setPage(Page.login);
            setLoading(false);
        }
    }


    return (
        <>
            <h1 className='text-3xl mb-4 text-center'>Almost there</h1>
            <p className='text-gray-500 my-4'>Please enter the code we've sent to your email</p>
            <HomeForm onSubmit={handleSubmit} submitText={'verify'} error={error}>
                <FormField label={'Activation code'} value={codeField} onChange={(e) => setCodeField(e.target.value)}/>
            </HomeForm>
            <button className='mt-4 text-lg underline' onClick={() => setPage(Page.login)}>
                Go back ↲
            </button>
        </>
    )
}
