import {loadToken} from "./AuthUtils";
import {rawToMessage} from "./ModelStorage";
import {useUpdateMessages} from "../components/MessagePanel";
import Message from "../components/Message";
import React from "react";

const WS_PROTOCOL = window.location.protocol !== 'https:' ? 'ws' : 'wss';
const WS_PORT = 8000;
const WS_URL = WS_PROTOCOL + '://' + window.location.hostname + ':' + WS_PORT + '/ws/messages';


export default class {
    ws: WebSocket
    channels;
    users;


    constructor(users, channels) {
        this.channels = channels;
        this.users = users;
        console.log({users,channels})
    }

    async init() {
        if (this.ws === undefined) await this.connect();
    }


    connect() {
        this.ws = new WebSocket(WS_URL + '?token=' + loadToken());
        this.ws.onclose = this.connect;
        this.ws.onmessage = (e) => this.handleReceive(e,  this.users, this.channels);
        console.log('connected websocket')
    }

    disconnect() {
        this.ws.onclose = () => {
        };
        this.ws.close();
    }

    handleMessage(raw) {

    }


    handleReceive(e, users, channels) {
        let data = JSON.parse(e.data);
        let type = data.type;
        let raw = data.data;

        switch (type) {
            case 'message':
                let message = rawToMessage(raw, users.get(raw.author));
                let channel = channels.get(raw.channel);
                if (channel === undefined) return console.error("Channel not found");

                channel.messages.push(message);

                break;
            default:
                console.error("Received unexpected object type: " + type);
        }

    }


}
