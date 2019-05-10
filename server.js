const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
var appState = require('./app_state.js');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

io.on('connect', socket => {
    socket.emit('connected', {
        event: 'connected'
    });

    socket.on('store_state', data => {
        let appStates = appState.get();
        appStates[data.className] = data;
        appState.set(appStates);
        socket.emit('store_state_success',{});
    });

    socket.on('get_state', data => {
        let appStates = appState.get();
        socket.emit('get_state_success', {
            data: appStates[data.className]
        });
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        handler(req, res);
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
