const pdrone = require('pdrone');
const drone = pdrone({id: 'Teamx'});
drone.on('connected', function() {
  drone.emergency();
});