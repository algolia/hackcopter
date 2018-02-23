const pdrone = require('pdrone');
const drone = pdrone({id: 'vvo'});
drone.on('connected', function() {
  drone.emergency();
});
