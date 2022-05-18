import {dictToFormData, getFetch} from "./RequestUtils";

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
export {login, logout, signup, activateAccount}