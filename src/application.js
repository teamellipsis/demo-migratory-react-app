import React from 'react';
import io from 'socket.io-client';
import Socket from './websocket.js';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.setUpSocket().then(() => {
            this.socket.emit('get_state', {
                className: this.constructor.name
            });

            this.socket.on('get_state_success', data => {
                if (data.data !== undefined) {
                    this.setState(data.data.state);
                }
            });
        });

    }

    componentWillUnmount() {
        Socket.storeState({
            className: this.constructor.name,
            state: this.state
        });
    }

    setUpSocket() {
        if (Socket.get() === null) {
            Socket.set(io());
        }
        this.socket = Socket.get();

        return new Promise((resolve, reject) => {
            if (this.socket.connected) {
                return resolve();
            } else {
                this.socket.on('connected', data => {
                    return resolve();
                });
            }
        });
    }
}

export default Application;
