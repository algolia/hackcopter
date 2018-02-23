const pdrone = require('pdrone');
const drone = pdrone({id: 'Team11'});
drone.on('connected', function() {
  drone.emergency();
});
