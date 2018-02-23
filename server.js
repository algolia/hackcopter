/* eslint-disable import/no-commonjs, no-console */
const {
    RtmClient,
    CLIENT_EVENTS,
    RTM_EVENTS,
    WebClient,
} = require('@slack/client');
const say = require("say");
const _ = require('lodash');
const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team19', debug: false });

const TOKEN = 'xoxb-321039328631-UF6qAKK2FOcMS7cwO7LLOKWm';
let CHANNEL_ID = null;
let onStartCallback = function() {};
let onMessageCallback = function() {};
let commandQueue = [];
const TIMEOUT = 3000;
const availableCommands = {
    right: {
        emoji: ':arrow_right:',
    },
    left: {
        emoji: ':arrow_left:',
    },
    forward: {
        emoji: ':arrow_up:',
    },
    backward: {
        emoji: ':arrow_down:',
    },
    shoot: {
        emoji: ':boom:',
    },
    picture: {
        emoji: ':camera_with_flash:',
    },
    flip: {
        emoji: ':arrows_clockwise:',
    },
    uturn: {
        emoji: ':back:',
    },
    takeoff: {
        emoji: ':airplane_departure:',
    },
    land: {
        emoji: ':airplane_arriving:',
    },
};

const rtm = new RtmClient(TOKEN, {
    dataStore: false,
    useRtmConnect: true,
});

function init() {
    speak("Let's get this party started");
    // Connecting
    const web = new WebClient(TOKEN);
    const getChannels = web.channels.list();
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
        console.info('✓ Connection opened');
        getChannels.then(res => {
            console.info('✔ Connected to channel');
            const channel = _.find(res.channels, { name: 'misc-drone-19' });
            CHANNEL_ID = channel.id;
            onStartCallback();
            drone.on('connected', function() {
                sendMessage(':link: Connected to drone');
                speak("Connected to drone.");
                setInterval(executeCommand, TIMEOUT);
            });
        });
    });

    // Listening to messages
    rtm.on(RTM_EVENTS.MESSAGE, message => {
        onMessageCallback(message.text);
    });

    rtm.start();
}

function speak(msg, speed) {
    if (typeof speed === 'undefined') { myVariable = 1.2; }
    say.speak(msg, 'Daniel', speed);
}

function onStart(callback) {
    onStartCallback = callback;
}

function onMessage(callback) {
    onMessageCallback = callback;
}

function sendMessage(text) {
    return rtm.sendMessage(text, CHANNEL_ID);
}

onStart(() => {
    console.info('✔ Server restarted');
    sendMessage(':boom: Server restarted');
});

onMessage(message => {
    const words = message.split(' ');
    let command = null;
    // keep only one command per message
    _.each(words, word => {
        if (availableCommands[word.toLowerCase()]) {
            command = word;
            return;
        }
    });

    if (command) {
        console.info(command);
        commandQueue.push(command);
    }
});

function executeCommand() {
    let mostVotedCommand = null;
    let mostVotedCommandCount = 0;
    _.each(_.countBy(commandQueue), (value, key) => {
        if (value > mostVotedCommandCount) {
            mostVotedCommandCount = value;
            mostVotedCommand = key;
        }
    });

    if (mostVotedCommand) {
        console.info('Execute command', mostVotedCommand);
        const emoji = availableCommands[mostVotedCommand].emoji;
        sendMessage(`:helicopter: ${emoji} ${mostVotedCommand}`);
        speak(`${mostVotedCommand}`, 'Daniel', 1.2);

        switch (mostVotedCommand) {
            case 'takeoff':
                drone.takeOff();
                drone.wait(3000);
                break;
            case 'land':
                drone.land();
                drone.wait(2000);
        }

    }

    commandQueue = [];
}


init();

process.on('SIGINT', function() {
  console.log("Caught interrupt signal, landing if needed");
    speak("I don't want to live on this planet anymore", 1.5);

  drone.safeLandingAndExit();
});

