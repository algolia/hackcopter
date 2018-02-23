const pdrone = require('pdrone');

const drone = pdrone({
  id: 'Team12',
  debug: false,
});

drone.on('sensor', async function({ name, value }) {
  // if (name === 'position') {
  //   console.log(JSON.stringify(value, null, 2));
  //   if (value.posx < 60) {
  //     console.log('Fly');
  //     drone.fly({ pitch: 5 });
  //   }
  //   if (value.posx > 60) {
  // console.log('Land');
  // drone.openClaw();
  // await drone.wait(500);
  // drone.land();
  //     process.exit();
  //   }
  // }
});

drone.on('connected', async function() {
  console.log('Connected');
  drone.closeClaw();
  await drone.wait(3000);

  console.log('TakeOff');
  drone.takeOff();
  await drone.wait(3000);

  console.log('Fly');
  drone.fly({ pitch: 10 });
  await drone.wait(2500);

  console.log('Open');
  drone.fly({ pitch: 0 });
  drone.openClaw();
  await drone.wait(2500);

  console.log('Back');
  drone.fly({ pitch: -10 });
  await drone.wait(2500);

  console.log('Land');
  drone.land();

  // drone.flatTrim();
  // await drone.wait(1000);

  // drone.fly({ gaz: -10 });
  // await drone.wait(1000);

  process.exit();
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
