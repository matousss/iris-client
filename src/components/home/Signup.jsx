import React, {useState} from 'react'
import * as Page from '../../utils/PageEnum'
import {signup} from '../../utils/RequestUtils'

export function Signup({setUser, setPage}) {
    const [emailField, setEmailField] = useState('')
    const [usernameField, setUsernameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [passwordAgainField, setPasswordAgainField] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordField !== passwordAgainField) {
            return setErrorMessage("passwords don't match");
        }
        signup({
            'email': emailField,
            'username': usernameField,
            'password': passwordField,
        }).then(response => handleFetch(response))
    }

    const handleFetch = (response) => {
        // if (data.result === 'success') {
        //     setUser(data.user)
        //     setPage(Page.verify)
        //     console.log(data.token)
        // } else {
        //     const error = data.details
        //     if (error.hasOwnProperty('email')) {
        //         setErrorMessage('account with email ' + emailField + ' already exists')
        //     }
        //     if (error.hasOwnProperty('username')) {
        //         setErrorMessage('username ' + usernameField + ' is already taken')
        //     }
        // }

        response.json().then(
            data => {
                switch (response.status) {
                    case 200:
                        setPage(Page.verify);
                        console.log(data['user'])
                        setUser(data['user'])
                        break;
                    case 400:
                        let errMsg = 'Check fields listed below'
                        Object.keys(data).forEach(key => errMsg += `${key}: ${data[key]}\n`)
                        setErrorMessage(errMsg);
                        break;
                    default:
                        setErrorMessage(`Unknown error (code: ${response.status})`)
                }
            }
        )
    }

    return (
        <>
            <h1 className='text-black text-5xl mb-6 text-center'>No account? No problem!</h1>
            <form className='flex flex-col w-4/5 md:w-2/5' onSubmit={handleSubmit}>
                <label className='my-1 text-lg'>Email</label>
                <input
                    className='bg-white outline-1 outline-gray-300 text-gray-700 p-1 mb-1 border-2 rounded-lg'
                    type="text"
                    required
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                />
                <label className='my-1 text-lg'>Username</label>
                <input
                    className='bg-white outline-1 outline-gray-300 text-gray-700 p-1 mb-1 border-2 rounded-lg'
                    type="text"
                    required
                    value={usernameField}
                    onChange={(e) => setUsernameField(e.target.value)}
                />
                <label className='mb-1 text-lg'>Password</label>
                <input
                    className='bg-white outline-1 outline-gray-300 text-gray-700 p-1 mb-1 border-2 rounded-lg'
                    type="password"
                    required
                    value={passwordField}
                    onChange={(e) => setPasswordField(e.target.value)}
                />
                <label className='mb-1 text-lg'>Password again</label>
                <input
                    className='bg-white outline-1 outline-gray-300 text-gray-700 p-1 mb-1 border-2 rounded-lg'
                    type="password"
                    required
                    value={passwordAgainField}
                    onChange={(e) => setPasswordAgainField(e.target.value)}
                />
                <span className='font-semibold text-sm text-red-700'>{errorMessage}</span>
                <button className='text-xl mt-3 p-1 rounded-lg bg-orange-500 hover:bg-rose-500'>sign up</button>

            </form>
            <button className='mt-4 text-lg underline' onClick={() => setPage(Page.login)}>
                Go back ↲
            </button>
        </>
    )
}
