import {key} from "wait-on/exampleConfig";

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

    update(data, users): [] {
        let keys = Object.keys(data);
        let updatedFields = []

        for (let i in keys) {
            let k = keys[i];
            switch (k) {
                case 'users':
                    // todo check if same and download additional resources if not cached
                    break;

                case 'last_open_by':
                    // todo recalculate unreadCount
                    break;

                default:
                    if (this[k] !== data[k]) {
                        console.log(this[k])
                        console.log(data[k])
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

    update(data, users): [] {
        let updatedField = []
        if (data.admins) {
            // todo check if same and download additional resources if not cached
            updatedField.push('admins')
            delete data.admins
        }

        if (data.owner) {
            if (data.owner !== this.owner.id) {
                updatedField.push('owner')
                // todo check if cached and download additional resources if not
            }
            delete data.owner
        }


        return super.update(data, users).push(...updatedField);
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
