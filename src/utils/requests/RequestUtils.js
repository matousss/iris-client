import {getHeadersWithAuth} from "../AuthUtils";

const PROTOCOL = window.location.protocol
const HOST = window.location.hostname + ':8000'
const BASE_URL = `${PROTOCOL}//${HOST}/api/`

function getFetch(url, method, body = null, headers = getHeadersWithAuth()) {
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

// just for debugging
function sendMessageOG(channel, text) {
    return getFetch('message/', 'POST', dictToFormData({
        'channel': channel,
        'text': text,
    }))
}

function viewedChannel(channel) {
    return getFetch('viewed-channel/' + channel, 'PATCH')
}

export {getFetch, dictToFormData, sendMessageOG, viewedChannel}