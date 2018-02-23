const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team11', debug: false });

drone.on('sensor', function({name}) {
  // console.log(name, value);
});

drone.on('connected', async function() {
  drone.takeOff();
  await drone.wait(3000);
  drone.flatTrim();
  await drone.wait(1000);

  // Start the song at 20s

  // Intro
  for(let i = 0; i < 7; i++) {
    drone.fly({ gaz: 100 });
    await drone.wait(600);

    drone.fly({ gaz: 0 });
    await drone.wait(500);

    drone.fly({ gaz: -100 });
    await drone.wait(400);
  }

  drone.fly({ gaz: 100, yaw: 100 });
  await drone.wait(3000);

  drone.flip({direction: 'front'});
  drone.flip({direction: 'back'});

  // Safely land
  drone.land();
  drone.land();
  drone.land();
  drone.land();
  drone.land();

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
