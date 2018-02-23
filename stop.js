const pdrone = require('pdrone');
const drone = pdrone({id: 'Team19'});
drone.on('connected', function() {
  drone.emergency();
});
