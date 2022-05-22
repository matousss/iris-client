class Model {
    id: String;
}


class User extends Model {
    id: String;
    username: String;
    avatar;

    constructor(id: String, username: String, avatar = null) {
        super()
        this.id = id;
        this.username = username;
        this.avatar = avatar;
    }

    precacheAvatar() {
        if (this.avatar) {
            let temp = new Image();
            temp.src = this.avatar;
        }
    }


}

function rawToMessage(raw, author) {
    return new Message(raw.id, raw.text, author, raw.media, new Date(raw.creation));
}

class Message extends Model {
    id: String;
    text: ?String;
    author: User;
    media: boolean;
    creation: Date;

    constructor(id, text = null, author: User, media = false, creation) {
        super();
        this.id = id;
        if (text === null && !media) throw new Error('Invalid state');
        this.text = text;
        this.author = author;
        this.media = media;
        this.creation = creation;
    }


}

function userArrayChange(ids, userArray) {
    if (ids.length !== userArray.length) return true;
    for (let i in ids) {
        if (ids[i] !== userArray[i]) return true;
    }
    return false;
}


async function updateUserArray(ids, userArray, users) {
    let changed = userArrayChange(ids, userArray);

    if (changed) {
        let newArray = [];
        for (let i in ids) {
            let id = ids[i];
            let contains = false;
            for (let j in userArray) {
                if (id === userArray[j]) {
                    contains = true;
                    break;
                }
            }

            if (!contains && !users.get(id)) await users.getUser(id);
            newArray.push(users.get(id))
        }
        return newArray;
    }
    return null;
}


class Channel extends Model {
    id: String;
    users: Array<User>;
    messages: Array<Message>;
    title: String;
    icon;
    unreadCount: number;

    constructor(id, users: Array<User>, messages: Array<Message> = [], title = 'Unknown channel', icon = null, unreadCount) {
        super();
        this.id = id;
        this.users = users;
        this.messages = messages;
        this.title = title;
        this.icon = icon;
        this.unreadCount = unreadCount;
    }

    async update(data, users): [] {
        let keys = Object.keys(data);
        let updatedFields = []

        for (let i in keys) {
            let k = keys[i];
            switch (k) {
                case 'users':
                    let newArray = await updateUserArray(data.users, this.users, users)
                    if (newArray) {
                        this.users = newArray;
                        updatedFields.push('users');
                    }

                    break;

                case 'last_open_by':
                    console.log(data['last_open_by'])
                    break;

                default:
                    console.log({k})
                    if (this[k] !== data[k]) {
                        this[k] = data[k];
                        updatedFields.push(k);
                    }
            }


        }
        return updatedFields;
    }
}

class GroupChannel extends Channel {
    owner: User
    admins: Array<User>

    // see Channel constructor ...owner: User, admins: Array<User>
    constructor(...props) {
        super(...props);
        this.owner = props[props.length - 2];
        this.admins = props[props.length - 1];
    }

    async update(data, users): [] {
        let updatedFields = []
        let keys = Object.keys(data);

        for (let i in keys) {
            let k = keys[i];
            switch (k) {
                case 'admins':
                    let newArray = await updateUserArray(data.admins, this.admins, users)
                    if (newArray) {
                        this.admins = newArray;
                        updatedFields.push('admins');
                    }
                    delete data.admins;
                    break;

                case 'owner':
                    if (data.owner !== this.owner.id) {
                        updatedFields.push('owner');
                        if (!users.get(data.owner)) {
                            await users.getUser(data.owner);
                        }
                        this.owner = users.get(data.owner);
                    }
                    delete data.owner
                    break;

                case 'name':
                    if (data.name !== this.title) {
                        updatedFields.push('name');
                        this.title = data.name;
                    }
                    delete data.name;
                    break;

                default:
                    break;
            }


        }

        updatedFields.push(...(await super.update(data, users)))
        return updatedFields;
    }

}

class ModelStorage extends Map<String, Model> {
    set(value: Model): this {
        return super.set(value.id, value);
    }


    get(key: String): Model | undefined {
        return super.get(key);
    }
}

export {User, Message, Channel, GroupChannel, ModelStorage, rawToMessage}
