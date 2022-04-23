import UserButton from "../components/UserButton";

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

class Message extends Model {
    id: String;
    text: ?String;
    author: User;
    media: boolean;

    constructor(id, text = null, author: User, media = false) {
        super();
        this.id = id;
        if (text === null && !media) throw new Error('Invalid state');
        this.text = text;
        this.author = author;
        this.media = media;
    }


}

class Channel extends Model {
    id: String;
    users: Array<User>;
    messages: Array<Message>;
    title: String;
    icon;

    constructor(id, users: Array<User>, messages = {String: Message}, title = 'Unknown channel', icon = null) {
        super();
        this.id = id;
        this.users = users;
        this.messages = messages;
        this.title = title;
        this.icon = icon;
    }


}


class ModelStorage extends Map {
    set(value: Model): this {
        return super.set(value.id, value);
    }
}

export {User, Message, Channel, ModelStorage}
