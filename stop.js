const pdrone = require('pdrone');
const drone = pdrone({id: 'Team15'});
drone.on('connected', function() {
  drone.emergency();
});