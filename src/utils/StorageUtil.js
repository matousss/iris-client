import {Channel, ModelStorage, rawToMessage, User} from "./ModelStorage";
import {getChannels, getMessages as fetchMessages, getMiniProfile} from "./RequestUtils";

async function getUsers(ids: String[]) {
    let ms = new ModelStorage();

    async function processResponse(response) {
        if (response.ok) {
            let raw = await response.json()
            let user = new User(raw.id, raw.username, raw.avatar);
            user.precacheAvatar()
            return user;
        }
        return null;
    }

    let responses = await Promise.all(ids.map((id) => getMiniProfile(id)));
    for (let i in responses) {
        let user = await processResponse(responses[i])
        if (user !== null) ms.set(user)
    }
    return ms;
}

async function getMessages(users) {
    const response = await fetchMessages();
    let rawMessages = await response.json();
    let map = new Map();


    const processRaw = raw => {
        if (map.get(raw.channel) === undefined) map.set(raw.channel, [])
        map.get(raw.channel).push(rawToMessage(raw, users.get(raw.author)))
    }

    await rawMessages.forEach(val => processRaw(val))

    return map;
}


async function getData(localUserId) {
    let response = await getChannels();
    let userSet = new Set();
    let channelsRaw = await response.json();

    for (let i in channelsRaw) {
        let channel = channelsRaw[i];
        for (let j in channel.users) {
            userSet.add(channel.users[j]);
        }
    }

    let users = await getUsers(Array.from(userSet.values()));
    let messages = await getMessages(users);
    let channels = new ModelStorage();


    const otherThanMe = (id1, id2) => id1 === localUserId ? id2 : id1;


    async function processRawChannel(raw) {
        let title;
        let icon;
        switch (raw.type) {
            case 'directchannel':
                let user: User = users.get(otherThanMe(...raw.users));
                title = user.username
                icon = user.avatar
                break;
            case 'groupchannel':
                title = raw.name === null ? "NaN" : raw.name;
                icon = raw.icon
                break;
            default:
                title = undefined;
        }


        return new Channel(raw.id, raw.users, messages.get(raw.id), title, icon);
    }

    for(let i in channelsRaw) {
        let c = await processRawChannel(channelsRaw[i]);
        await channels.set(c);
    }

    return {users, channels}
}

export {getData}
