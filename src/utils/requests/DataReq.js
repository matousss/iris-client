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
    return getFetch('profile/miniature?search='+keyword)
}

function deleteChannel(id) {
    return getFetch(`channel/${id}/`, 'DELETE')
}

export {getMiniProfile, getFullProfile, getChannels, getMessages, searchUser, deleteChannel}