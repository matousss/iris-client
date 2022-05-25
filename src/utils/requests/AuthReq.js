import {dictToFormData, getFetch} from "./RequestUtils";

function getBasicAuth(auth) {
    return new Headers({
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/x-www-form-urlencoded',
    })
}

function login(auth) {
    return getFetch('auth/login', 'POST', null,
        getBasicAuth(auth))
}

function logout() {
    return getFetch('auth/logout/', 'POST')
}

function logoutAll(exceptCurrent = false) {
    return getFetch('auth/logoutall/', exceptCurrent ? 'DELETE' : 'POST')
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

export {login, logout, logoutAll, signup, activateAccount, getBasicAuth}