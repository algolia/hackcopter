const pdrone = require('pdrone');
const drone = pdrone({id: 'vvo', debug: true});
drone.on('connected', async function() {
  drone.closeClaw();
  drone.on('sensor', function() {
    console.log(arguments);
  });
  // setTimeout(() => drone.closeClaw(), 500);
});