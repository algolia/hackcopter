var fs = require('fs');
const pdrone = require('pdrone');
const keypress = require('keypress');

const drone = pdrone({ id: 'Team15', debug: false });

drone.on('connected', async () => {
  drone.takeOff();

  const commands = [];

  keypress(process.stdin);
  process.stdin.on('keypress', function(ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
      return;
    }

    if (commands.length) {
      const lastCommand = commands[commands.length - 1];
      lastCommand.waitTime = Date.now() - lastCommand.at;
    }

    switch (key.name) {
      // Height
      case 'u':
        commands.push({ name: 'fly', args: [{ gaz: 10 }], at: Date.now() });
        drone.fly({ gaz: 30 });
        break;
      case 'd':
        commands.push({ name: 'fly', args: [{ gaz: -10 }], at: Date.now() });
        drone.fly({ gaz: -30 });
        break;

      // Move
      case 'up':
        commands.push({ name: 'fly', args: [{ pitch: 30, gaz: 50 }], at: Date.now() });
        drone.fly({ pitch: 30, gaz: 50 });
        break;
      case 'left':
        commands.push({ name: 'fly', args: [{ yaw: -50 }], at: Date.now() });
        drone.fly({ yaw: -50 });
        break;
      case 'right':
        commands.push({ name: 'fly', args: [{ yaw: 50 }], at: Date.now() });
        drone.fly({ yaw: 50 });
        break;

      // stunt
      case 'c':
        commands.push({ name: 'fly', args: [{ roll: 80, yaw: 80, gaz: 100 }], at: Date.now() });
        drone.fly({ roll: 80, yaw: 80, gaz: 100 });
        break;
      case 'b':
        commands.push({ name: 'flip', args: [{ direction: 'back' }], at: Date.now() });
        drone.flip({ direction: 'back' });
        break;

      // Actions
      case 'space':
        commands.push({
          name: 'fly',
          args: [{ roll: 0, pitch: 0, yaw: 0, gaz: 0 }],
          at: Date.now()
        });
        drone.fly({ roll: 0, pitch: 0, yaw: 0, gaz: 0 });
        break;
      case 'f':
        commands.push({ name: 'fire', args: [], at: Date.now() });
        drone.fire();
        break;
      case 'l':
        commands.push({ name: 'safeLandingAndExit', args: [], at: Date.now() });
        fs.writeFileSync('recording.json', JSON.stringify(commands, null, 2));
        drone.safeLandingAndExit();
        break;
    }
  });
  process.stdin.setRawMode(true);
  process.stdin.resume();
});

process.on('unhandledRejection', err => {
  console.log('Caught unhandled rejection');
  console.log(err);

  drone.safeLandingAndExit();
});

process.on('SIGINT', function() {
  console.log('Caught interrupt signal, landing if needed');

  drone.safeLandingAndExit();
});
