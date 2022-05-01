import {getAuthHeader, loadToken} from "./AuthUtils";
import {func} from "prop-types";

const PROTOCOL = window.location.protocol
const HOST = window.location.hostname + ':8000'
const BASE_URL = `${PROTOCOL}//${HOST}/api/`

function getFetch(url, method, body = null, headers = getAuthHeader()) {
    return fetch(BASE_URL + url,
        {
            method: method,
            body: body,
            headers: headers,
        }
    )
}

function dictToFormData(data) {
    let formData = new FormData()
    Object.keys(data).forEach(
        key => {
            formData.append(key, data[key])
        }
    )
    return formData;
}


function getMiniProfile(id = 'current') {
    return getFetch('profile/miniature/' + id, 'GET')
}

function getFullProfile(id = 'current') {
    return getFetch('profile/full/' + id, 'GET')
}

function getChannels() {
    return getFetch('channel', 'GET')
}

function getMessages() {
    return getFetch('message', 'GET')
}

function login(auth) {
    return getFetch('auth/login', 'POST', null,
        new Headers({
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        }))
}

function logout() {
    return getFetch('auth/logout/', 'POST')
}

function signup(data = {}) {
    return getFetch('auth/register', 'POST', dictToFormData(data), new Headers())
}

function activateAccount(username, activationCode) {
    return getFetch('auth/activate', 'POST', dictToFormData({
        'username': username,
        'activation_code': activationCode,
    }), new Headers())
}


function sendMessageOG(channel, text) {
    let headers = new Headers()
    headers.append('Authorization', 'Token ' + loadToken())
    console.log({channel, text})
    return getFetch('message/', 'POST', dictToFormData({
        'channel': channel,
        'text': text,
    }), headers)


}

export {getMiniProfile, getFullProfile, getChannels, getMessages, login, logout, signup, activateAccount, sendMessageOG}
