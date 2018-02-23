const pdrone = require('pdrone');
const drone = pdrone({ id: 'vvo', debug: false });

drone.on('sensor', function({name}) {
  // console.log(name, value);
});

drone.on('connected', async function() {
  drone.takeOff();
  await drone.wait(3000);
  drone.flatTrim();
  await drone.wait(1000);

  // Turn a bit
  drone.fly({ yaw: 100 });
  await drone.wait(3000);
  drone.fly({ yaw: 0 });

  // Go up
  drone.fly({ gaz: 100 });
  await drone.wait(1000);
  drone.fly({ gaz: 0 });
  await drone.wait(1000);

  // If you've plugged the claw in, open it
  drone.openClaw();
  await drone.wait(500);

  // Small ballet
  drone.fly({ roll: -100, gaz: 100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ pitch: -100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ roll: 100, gaz: -100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ pitch: 100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);

  // If you've plugged the claw in, open it
  drone.closeClaw();
  await drone.wait(500);

  // Safely land
  drone.land();
  await drone.wait(5000);

  process.exit();
});

process.on('unhandledRejection', err => {
  console.log("Caught unhandled rejection");
  console.log(err);

  drone.safeLandingAndExit();
});

process.on('SIGINT', function() {
  console.log("Caught interrupt signal, landing if needed");

  drone.safeLandingAndExit();
});
