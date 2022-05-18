import {Channel, GroupChannel, ModelStorage, rawToMessage, User} from "./ModelStorage";
import {getChannels, getMessages as fetchMessages, getMiniProfile} from "./requests/DataReq";

const UNKNOWN_USER = new User(null, '<\Deleted User>', null)


async function processAuthorResponse(response) {
    if (response.ok) {
        let raw = await response.json()
        let user = new User(raw.id, raw.username, raw.avatar);
        user.precacheAvatar()
        return user;
    }
    return UNKNOWN_USER;
}
class UserStorage extends ModelStorage {
    // if user doesn't exist returns default anonymous user
    getSafe(key: String): Model | undefined {
        let v = super.get(key);
        if (v) return v;
        return UNKNOWN_USER;
    }
}

async function getUsers(ids: String[]) {
    let ms = new UserStorage();

    let responses = await Promise.all(ids.map((id) => getMiniProfile(id)));
    for (let i in responses) {
        let user = await processAuthorResponse(responses[i])
        if (user !== null) ms.set(user)
    }
    return ms;
}

async function getMessages(users) {
    const response = await fetchMessages();
    let rawMessages = await response.json();
    let map = new Map();


    const processRaw = async raw => {
        if (map.get(raw.channel) === undefined) map.set(raw.channel, [])

        // get user which is no longer in any chat, but earlier was
        if (users.get(raw.author) === undefined) {
            let missing_user = await getMiniProfile(raw.author);
            users.set(await processAuthorResponse(missing_user))
        }
        map.get(raw.channel).push(rawToMessage(raw, users.getSafe(raw.author)))
    }

    for (let i in rawMessages) {
         await processRaw(rawMessages[i])
    }

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
        let _messages = messages.get(raw.id)
        let lastOpenedRaw = raw.last_open_by[localUserId]
        let lastOpened = new Date( lastOpenedRaw ? lastOpenedRaw : 0);
        let unreadCount = _messages.filter(message => message.creation.getTime() > lastOpened.getTime()).length

        switch (raw.type) {
            case 'directchannel':
                let user: User = users.get(otherThanMe(...raw.users));
                title = user.username
                icon = user.avatar
                if (raw.users[0] !== user) raw.users = raw.users.reverse()
                break;
            case 'groupchannel':
                title = raw.name === null ? "NaN" : raw.name;
                icon = raw.icon
                return new GroupChannel(raw.id, raw.users, _messages, title, icon, unreadCount, raw.owner, raw.admins);
            default:
                title = undefined;
        }


        return new Channel(raw.id, raw.users, _messages, title, icon, unreadCount);
    }

    for (let i in channelsRaw) {
        let c = await processRawChannel(channelsRaw[i]);
        await channels.set(c);
    }

    return {users, channels}
}

export {getData}
