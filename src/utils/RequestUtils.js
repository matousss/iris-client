import {getAuthHeader} from "./AuthUtils";
import {func} from "prop-types";

const PROTOCOL = window.location.protocol
const HOST = 'localhost:8000'
const BASE_URL = `${PROTOCOL}//${HOST}/api/`

console.log(BASE_URL)

function getFetch(url, method, headers = getAuthHeader()) {
    return fetch(url,
        {
            method: method,
            headers: headers,
        }
    )
}

function getFullProfile(id = 'current') {
    return getFetch(BASE_URL + 'profile/full/' + id, 'GET')
}

function getChannels() {
    return getFetch(BASE_URL + 'channel', 'GET')
}

function login(auth) {
    return getFetch('http://127.0.0.1:8000/api/auth/login', 'POST',
        new Headers({
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        }))
}


export {getFullProfile, getChannels, login}
