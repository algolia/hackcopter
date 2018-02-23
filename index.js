const {DroneConnection, CommandParser} = require('pdrone-low-level');

const parser = new CommandParser();
const drone = new DroneConnection('vvo');
const flatTrim = parser.getCommand('minidrone', 'Piloting', 'FlatTrim');
const takeOff = parser.getCommand('minidrone', 'Piloting', 'TakeOff');
const landing = parser.getCommand('minidrone', 'Piloting', 'Landing');
const emergency = parser.getCommand('minidrone', 'Piloting', 'Emergency');
const clawOpen = parser.getCommand('minidrone', 'UsbAccessory', 'ClawControl', {id: 0, action: 'OPEN'});
const clawClose = parser.getCommand('minidrone', 'UsbAccessory', 'ClawControl', {id: 0, action: 'CLOSE'});
const takeoff = parser.getCommand('minidrone', 'Piloting', 'TakeOff');
const fire = parser.getCommand('minidrone', 'UsbAccessory', 'GunControl', {id: 0, action: 'FIRE'});
const altitude = parser.getCommand('minidrone', 'NavigationDataState', 'DroneAltitude');
// const landing = parser.getCommand('minidrone', 'Piloting', 'Landing');
// const backFlip = parser.getCommand('minidrone', 'Animations', 'Flip', {direction: 'back'});

// console.log(takeoff)

const maxAltitude = parser.getCommand('minidrone', 'PilotingSettings', 'MaxAltitude', {current: 3, min: 1, max: 10});
// console.log(Array.from(maxAltitude.toBuffer()));
// process.exit(0)
drone.on('connected', () => {
  // Makes the code a bit clearer
  const runCommand = x => drone.runCommand(x);
  drone.runCommand(maxAltitude);

  // drone.runCommand(parser.getCommand('minidrone', 'PilotingSettings', 'MaxAltitude', {current: 3}));
  // setTimeout(function() {
    // drone.runCommand(parser.getCommand('minidrone', 'PilotingSettings', 'MaxAltitude'));
  // }, 4000);

  // runCommand(emergency);
  // runCommand(flatTrim);    
  // setTimeout(runCommand, 2000, takeOff);
  // setTimeout(runCommand, 4000, flatTrim);  
  // setTimeout(runCommand, 6000, altitude);    


  // runCommand(flatTrim);
  // setTimeout(runCommand, 2000, takeOff);
  // setTimeout(runCommand, 5000, landing);
  // setTimeout(runCommand, 2000, flatTrim);
  // setTimeout(runCommand, 4000, clawClose);
  // setTimeout(runCommand, 6000, clawOpen);

  // setTimeout(runCommand, 2000, backFlip);
  // setTimeout(runCommand, 20000, landing);
});