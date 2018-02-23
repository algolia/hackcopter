const pdrone = require('pdrone');

// const identifier = 'vvo';
const drone = pdrone({
  id: 'Team12',
});

drone.on('connected', function() {
  drone.emergency();
});
