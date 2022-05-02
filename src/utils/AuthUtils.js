function getAuthHeader() {
    return {'Authorization': 'Token ' + loadToken(),}
}

function getHeadersWithAuth(additional = {}) {
    if (loadToken() !== null) {
        return new Headers({
            ...getAuthHeader(),
            ...additional,
        })
    } else return null;
}


function saveToken(token) {
    if (token === null || token === '') return clearToken();
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

export {getHeadersWithAuth, saveToken, loadToken, clearToken}
