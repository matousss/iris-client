import React, {useState} from 'react'
import * as Page from '../utils/PageEnum'
import {activateAccount} from "../utils/RequestUtils";

export default function Verify({username, setPage, initMain}) {
    const [codeField, setCodeField] = useState('')
    const [error, setError] = useState('')

    const handleFetch = (response) => {
        switch (response.status) {
            case 200:
                response.json().then(data => initMain(data['token']))
                break;
            case 400:
                response.json().then(data => {
                    let err = ''
                    Object.keys(data).forEach(
                        key => (err+=(data[key] + '\n'))
                    )
                });
            default:
                console.log(response);

        }
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        // const data = new FormData()
        // data.append("username", username)
        // data.append("activation_code", codeField)
        // fetch('http://127.0.0.1:8000/api/auth/activate', {
        //     method: 'POST',
        //     body: data
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        e.preventDefault()
        activateAccount(username, codeField).then(response => handleFetch(response)).catch((e) => {
            console.error(e);
            setPage(Page.login);
        })
    }

    // const handleFetch = (data) => {
    //     if (data.result !== 'invalid_user'){
    //         setUser(data.user)
    //         setPage(Page.login)
    //     } else {
    //         setError('invalid code')
    //     }
    // }

    return (
        <>
            <h1 className='text-black text-3xl mb-4 text-center'>Almost there</h1>
            <p className='text-gray-500 my-4'>Please enter the code we've sent to your email</p>
            <form className='flex flex-col w-4/5 md:w-2/5' onSubmit={handleSubmit}>
                <label className='my-1'>Activation code</label>
                <input
                    className='bg-white outline-1 outline-gray-300 text-xs text-gray-700 p-1 mb-1 border-2 rounded-lg'
                    type="text"
                    required
                    value={codeField}
                    onChange={(e) => setCodeField(e.target.value)}
                />
                <span className='font-semibold text-xs text-red-700'>{error}</span>
                <button className='mt-3 p-1 rounded-lg bg-orange-500 hover:bg-rose-500'>verify</button>
            </form>
            <button className='mt-4 text-lg underline' onClick={() => setPage(Page.login)}>
                Go back ↲
            </button>
        </>
    )
}
