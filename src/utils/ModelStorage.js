function modelFromJSON(json, model: Class) {
    let obj = JSON.parse(json);
    return model(Object.keys(obj).map(e => obj[e]));
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

    constructor(id, users: Array<User>, messages: Array<Message> = [], title = 'Unknown channel', icon = null) {
        super();
        this.id = id;
        this.users = users;
        this.messages = messages;
        this.title = title;
        this.icon = icon;
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

export {User, Message, Channel, ModelStorage, rawToMessage}
