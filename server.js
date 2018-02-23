/* eslint-disable import/no-commonjs, no-console */
const {
  RtmClient,
  CLIENT_EVENTS,
  RTM_EVENTS,
  WebClient,
} = require('@slack/client');
const _ = require('lodash');
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
};

const rtm = new RtmClient(TOKEN, {
  dataStore: false,
  useRtmConnect: true,
});

function init() {
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
      setInterval(executeCommand, TIMEOUT);
    });
  });

  // Listening to messages
  rtm.on(RTM_EVENTS.MESSAGE, message => {
    onMessageCallback(message.text);
  });

  rtm.start();
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

    // TODO: Call the right method here based on the most voted one
    // actions[mostVotedCommand]()
  }

  commandQueue = [];
}

init();
