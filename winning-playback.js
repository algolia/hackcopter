const pdrone = require('pdrone');

const drone = pdrone({ id: 'Team15', debug: false });

const commands = require('./recording.json');
drone.on('connected', async () => {
  drone.takeOff();
  await drone.wait(2000);

  for (let command of commands) {
    console.log(`${command.name}(${JSON.stringify(command.args)})`);
    drone[command.name](...command.args);
    if (command.waitTime) {
      await drone.wait(command.waitTime);
    }
  }

  drone.safeLandingAndExit();
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
