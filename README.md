```js
const drone = pdrone({
  id: ''
});
drone.on('connected', function() {
  drone.flatTrim();
  drone.takeOff();
  drone.move({
    roll: -100/100
    pitch: 
    yaw:
    gaz:
    // implement timestamp
  });
  drone.landing();
  drone.emergency();
  drone.on('sensor');
    // {type: 'battery', value: percentage}
    // {type: 'flyingState', value: 'landed/takingOff/hovering/flying/landing/rolling/emergency/init'}
    // {type: 'claw', value: 'open/opening/closed/closing'}
    // {type: 'canon', value: 'ready/busy'}
  drone.on('low battery');
  drone.flip({direction: 'front/back/right/left'});
  drone.cap(-180/180);
  drone.fire();
  drone.openClaw();
  drone.closeClaw();
  drone.lights({
    mode: 'FIXED/BLINKED/OSCILLATED',
    intensity: 0-100
  });

  maxAltitude by default

});
```