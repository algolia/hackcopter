const express = require('express');
const pdrone = require('pdrone');

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 40510});

let drone;

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log(message);

        switch(message) {
            case 'CONNECTED':

                initializeDrone().then(() => {
                    ws.send('READY');
                });

                break;

            case 'TAKEOFF':
                drone.takeOff();
                break;

            case 'LAND':
                drone.land();
                break;
        }
    });
});

function initializeDrone() {
    return new Promise((resolve, reject) => {
        drone = pdrone({ id: 'vvo', debug: false });

        process.on('unhandledRejection', err => {
            console.log("Caught unhandled rejection");
            console.log(err);

            drone.safeLandingAndExit();
        });

        process.on('SIGINT', function() {
            console.log("Caught interrupt signal, landing if needed");

            drone.safeLandingAndExit();
        });

        drone.on('connected', () => {
            resolve();
        });
    });
}

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/visualization.html');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});