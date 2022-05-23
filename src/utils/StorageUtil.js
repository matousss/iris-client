import {Channel, GroupChannel, ModelStorage, rawToMessage, User} from "./ModelStorage";
import {getChannels, getMessages as fetchMessages, getMiniProfile} from "./requests/DataReq";

const UNKNOWN_USER = new User(null, '<\Deleted User>', null)


async function processUserResponse(response) {
    if (response.ok) {
        let raw = await response.json()
        let user = new User(raw.id, raw.username, raw.avatar);
        user.precacheAvatar()
        return user;
    }
    return UNKNOWN_USER;
}

class UserStorage extends ModelStorage {
    localUser: User

    // if user doesn't exist returns default anonymous user
    getSafe(key: String): Model | undefined {
        let v = super.get(key);
        if (v) return v;
        return UNKNOWN_USER;
    }

    async getUser(id) {
        let u = await processUserResponse(await getMiniProfile(id));
        if (u) this.set(u);
    }
}

async function getUsers(ids: String[]) {
    let ms = new UserStorage();

    await Promise.all(ids.map((id) => ms.getUser(id)));
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
            users.set(await processUserResponse(missing_user))
        }
        map.get(raw.channel).push(rawToMessage(raw, users.getSafe(raw.author)))
    }

    for (let i in rawMessages) {
        await processRaw(rawMessages[i])
    }

    return map;
}




async function processRawChannel(raw, messages, users) {
    let localUserId = users.localUser.id;
    const otherThanMe = (id1, id2) => id1 === localUserId ? id2 : id1;

    let title;
    let icon;
    let _messages = messages ? messages.get(raw.id) : [];
    if (!_messages) _messages = [];
    let lastOpenedRaw = raw['last_open_by'][localUserId];
    let lastOpened = new Date(lastOpenedRaw ? lastOpenedRaw : 0);
    let channelUsers = []
    raw.users.map(e => channelUsers.push(users.get(e)))

    switch (raw.type) {
        case 'directchannel':
            let user: User = users.get(otherThanMe(...raw.users));
            title = user.username
            icon = user.avatar
            break;
        case 'groupchannel':
            title = raw.name === null ? "NaN" : raw.name;
            icon = raw.icon
            let admins = Array.from(raw.admins.map(e => users.get(e)));
            return new GroupChannel(raw.id, channelUsers, _messages, title, icon, lastOpened, users.get(raw.owner), admins);
        default:
            title = undefined;
    }


    return new Channel(raw.id, channelUsers, _messages, title, icon, lastOpened);
}


async function getData(localUser) {
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
    users.localUser = localUser;
    users.set(localUser);
    let messages = await getMessages(users);
    let channels = new ModelStorage();

    for (let i in channelsRaw) {
        let c = await processRawChannel(channelsRaw[i], messages, users);
        await channels.set(c);
    }
    return {users, channels}
}


export {getData, processRawChannel}
