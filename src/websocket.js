'use strict';

let websocket = null;

const Socket = {
    get: function () {
        return websocket;
    },
    set: function (socket) {
        websocket = socket;
    },
    storeState: function (data) {
        return new Promise((resolve, reject) => {
            websocket.emit('store_state', data);
            return resolve();
        });
    },
}

module.exports = Socket;
