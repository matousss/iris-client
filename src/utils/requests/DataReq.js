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

function getMessages(channelId = null) {
    return getFetch('message' + (channelId ? `?channel_id=${channelId}` : ''), 'GET')
}

function searchUser(keyword = '') {
    return getFetch('profile/miniature?search=' + keyword)
}

function deleteChannel(id) {
    return getFetch(`channel/${id}/`, 'DELETE')
}

function createDirectChannel(id) {
    let formData = new FormData();
    formData.append('type', 'directchannel')
    formData.append('users', id)
    return getFetch('channel/', 'POST', formData)
}

function changeEmail(email) {
    let formData = new FormData();
    formData.append('email', email);
    return getFetch('auth/changeemail', 'POST', formData)
}

export {getMiniProfile, getFullProfile, getChannels, getMessages, searchUser, deleteChannel, createDirectChannel, changeEmail}