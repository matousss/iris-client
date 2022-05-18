const {getFetch} = require("./RequestUtils");

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

function searchUser(keyword = '') {
    return getFetch('profile/miniature?search='+keyword)
}

export {getMiniProfile, getFullProfile, getChannels, getMessages, searchUser}