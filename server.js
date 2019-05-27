const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
var appState = require('./app_state.js');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const dir = __dirname;
const nextApp = next({ dev, dir });
const handler = nextApp.getRequestHandler();

io.on('connect', socket => {
    socket.emit('connected', {
        event: 'connected'
    });

    socket.on('store_state', data => {
        let appStates = appState.get();
        appStates[data.className] = data;
        appState.set(appStates);
        socket.emit('store_state_success', {});
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

    app.post('/send', (req, res) => {
        let appStates = appState.get();
        fs.writeFile(__dirname + "/state", JSON.stringify(appStates), function (err) {
            if (err) {
                res.status(500);
                res.send();
                console.log('Fail to write state');
            } else {
                res.send();
                server.close(() => {
                    console.log('Server closed');
                    process.exit(0);
                });
            }
        });
    })

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});

fs.exists(__dirname + "/state", (exists) => {
    if (exists) {
        fs.readFile(__dirname + "/state", (err, state) => {
            if (err) throw err;
            appState.set(JSON.parse(state));
        });
    }
});
