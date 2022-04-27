import {Channel, ModelStorage, User} from "./ModelStorage";
import {getChannels, getMiniProfile} from "./RequestUtils";

async function getUsers(ids: String[]) {
    let ms = new ModelStorage();

    async function processResponse(response) {
        if (response.ok) {
            let raw = await response.json()
            return new User(raw.user, raw.username, raw.avatar);
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
    let channels = new ModelStorage();

    const otherThanMe = (id1, id2) => id1 === localUserId ? id2 : id1;


    function processRawChannel(raw) {
        let title;
        switch (raw.type) {
            case 'directchannel':
                title = users.get(otherThanMe(...raw.users)).username;
                break;
            case 'groupchannel':
                title = raw.name === null ? "NaN" : raw.name;
                break;
            default:
                title = undefined;
        }
        return new Channel(raw.id, raw.users, raw.last_message, title);
    }

    await channelsRaw.forEach(channel => channels.set(processRawChannel(channel)));
    return {users, channels}
}

export {getData}
