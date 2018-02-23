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
  console.info('message received', message);
});

init();
