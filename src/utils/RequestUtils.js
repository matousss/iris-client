import {getAuthHeader} from "./AuthUtils";
import {func} from "prop-types";

const PROTOCOL = window.location.protocol
const HOST = 'localhost:8000'
const BASE_URL = `${PROTOCOL}//${HOST}/api/`

console.log(BASE_URL)

function getFetch(url, method, headers = getAuthHeader(), body = '') {
    return fetch(BASE_URL + url,
        {
            method: method,
            headers: headers,
            body: body,
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

function login(auth) {
    return getFetch('auth/login', 'POST',
        new Headers({
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        }))
}

function logout() {
    return getFetch('auth/logout', 'POST')
}

function signup(data = {}) {

    return getFetch('auth/register', 'POST', ...dictToFormData(data))
}

function activateAccount(username, activationCode) {
    return getFetch('auth/activate', 'POST', ...dictToFormData({
        'username': username,
        'activation_code': activationCode,
    }))
}

export {getMiniProfile, getFullProfile, getChannels, login, logout, signup, activateAccount}
