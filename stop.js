const pdrone = require('pdrone');
const drone = pdrone({id: 'TeamX'});
drone.on('connected', function() {
  drone.emergency();
});
