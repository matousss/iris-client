class ModelStorage extends Map<String, Model> {
    set(value: Model): this {
        return super.set(value.id, value);
    }


    get(key: String): Model | undefined {
        return super.get(key);
    }
}


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

class LocalUser extends User {
    email: String;
    friends: User[]

    constructor({id, username, avatar, email, friends}) {
        super(id, username, avatar);
        this.email = email;
        this.friends = friends;
    }
}

class Message extends Model {
    id: String;
    text: ?String;
    author: User;
    media: boolean;
    creation: Date;
    static map = new ModelStorage()

    constructor(id, text = null, author: User, media = false, creation) {
        super();
        this.id = id;
        if (text === null && !media) throw new Error('Invalid state');
        this.text = text;
        this.author = author;
        this.media = media;
        this.creation = creation;
        Message.map.set(this);
    }


}

function userArrayChange(ids, userArray) {
    if (ids.length !== userArray.length) return true;
    for (let i in ids) {
        if (ids[i] !== userArray[i].id) return true;
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
    unreadCount: number = 0;

    updateUnreadCount(time: Date) {
        this.unreadCount = this.messages.filter(message => message.creation.getTime() > time.getTime()).length;
    }

    constructor(id, users: Array<User>, messages: Array<Message> = [], title = 'Unknown channel', icon = null, lastOpened) {
        super();
        this.id = id;
        this.users = users;
        this.messages = messages;
        this.title = title;
        this.icon = icon;
        this.updateUnreadCount(lastOpened)
    }

    async update(data, users): [] {
        let keys = Object.keys(data);
        let updatedFields = []

        for (let i in keys) {
            let k = keys[i];
            switch (k) {
                case 'users':
                    // in direct channel user order might be different because in object is local user always on index 0

                    let newArray = await updateUserArray(data.users, this.users, users)
                    if (newArray) {
                        this.users = newArray;
                        updatedFields.push('users');
                    }

                    break;

                case 'last_open_by':
                    let rawDate = data['last_open_by'][users.localUser.id];
                    if (!rawDate) break;
                    this.updateUnreadCount(new Date(rawDate))
                    break;

                default:
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

        // noinspection ES6RedundantAwait because it's required
        updatedFields.push(...(await super.update(data, users)))
        return updatedFields;
    }

}


export {User, LocalUser, Message, Channel, GroupChannel, ModelStorage, rawToMessage}
