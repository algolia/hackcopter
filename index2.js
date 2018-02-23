const {DroneConnection, CommandParser} = require('minidrone-js');

const parser = new CommandParser();
// const drone = new DroneConnection('vvo');


/* 
 * Commands are easily found by reading the xml specification
 * https://github.com/Parrot-Developers/arsdk-xml/blob/master/xml/
 */
const flatTrim = parser.getCommand('minidrone', 'Piloting', 'FlatTrim');
const buffer = flatTrim.toBuffer();
buffer.writeIntLE(256, 1);
console.log(buffer);


// drone.on('connected', () => {
//   // Makes the code a bit clearer
//   const runCommand = x => drone.runCommand(x);
//   console.log(flatTrim.toBuffer());

//   runCommand(flatTrim);
// });