import React from 'react';
import io from 'socket.io-client';

class Application extends React.Component {
    constructor(props){
        super(props);
        this.socket = io();
        this.socket.on('connected', data => {
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
        this.socket.emit('store_state', {
            className: this.constructor.name,
            state: this.state
        });
        this.socket.on('store_state_success', data => {
            this.socket.close();
        });
    }
}

export default Application;
