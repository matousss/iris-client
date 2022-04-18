function getAuthHeader() {
    if (loadToken() != null) {
        return new Headers({
        'Authorization': 'Token ' + loadToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    } else return null;
}


function saveToken(token) {
    (stayLogged() ? localStorage : sessionStorage).setItem('token', token);
}

function loadToken() {
    return (stayLogged() ? localStorage : sessionStorage).getItem('token');
}

function clearToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}

function stayLogged() {
    return localStorage.getItem('stayLogged') === 'true'
}

export {getAuthHeader, saveToken, loadToken, clearToken}