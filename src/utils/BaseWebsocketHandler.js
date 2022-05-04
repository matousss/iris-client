import {loadToken} from "./AuthUtils";
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
        this.connect();
    }

    async init() {
        if (this.ws === undefined) await this.connect();
    }

    onclose = this.connect
    onopen = () => console.log('connected websocket');

    connect() {
        this.ws = new WebSocket(WS_URL + '?token=' + loadToken());
        this.ws.onclose = this.onclose;
        this.ws.onopen = this.onopen;
        this.ws.onmessage = (e) => this.handleReceive(e, this.users, this.channels);
        this.send = this.ws.send;

    }

    disconnect() {
        this.ws.onclose = () => {
        };
        this.ws.close();
    }

    handleReceive(event) {
        console.log(event)
    }


}
