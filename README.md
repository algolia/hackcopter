# HackCopter '18

(This is for now an internal Algolia event but feel free to read).

Welcome to HackCopter '18.

The drone can be controlled with code, your phone (using the "free flight mini" app) or the controller. The contest is about controlling it with code.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Rules](#rules)
- [Getting started](#getting-started)
- [Very important information](#very-important-information)
- [API](#api)
- [Technical advices](#technical-advices)
- [If Node.js is not working](#if-nodejs-is-not-working)
- [Upgrading the `pdrone` module](#upgrading-the-pdrone-module)
- [FAQ](#faq)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Rules

This contest is all about team work and creativity. You are being given one drone, one area, we provide you accessories, we expect you to be CREATIVE.

Play with the drone and think about a cool 1, 2 or 3 minutes flight where you will demonstrate what you managed to achieve with the drone.

Here are some ideas:
- Making the drone dance
- Combining drone flight with music
- Using all the accessories like baloons, pins, rings...
- Making a very precise flight with targets on paper
- Running through a pile of red cups
- The lego drop challenge
- The baloon pop challenge (don't kill anyone)
- Be C-R-E-A-T-I-V-E, make us dream and you'll win

At 2pm every team will have to do a demo of their flight and then every team will have to vote for winning teams.

The three winning teams will win one drone for each participant. The rest of the drones will be
given as a lottery to the whole team.

A bit of advice, when your coders are struggling with a task, control
the drone with the controller or your phone and think about your demo.

## Getting started

This has been tested on macOS High Sierra.

1. Open your drone box
2. Put a charged battery
3. Mount the claw
4. Put it on the floor with enough space around
5. Turn it on
6. Stand back
7. Activate bluetooth on your computer

Then on your computer, if you already have Node.js, do this:

```sh
git git@github.com:algolia/hackcopter.git
cd hackcopter
npm install # or yarn
# Edit fly.js and stop.js files to replace "TeamX" with Team1 or Team2..
# Your team number is written on the box too
node fly.js
```

Did it work? Great!

If not, see "If Node.js is not working" section. Or ask an organizer/colleague.

## Very important information

Always open two terminal tabs, one for launching fly.js, 
another one for launching stop.js.

In case your drone is stuck because you forgot to land it or if there's any other issue
and you want to stop the drone, just run "node stop.js".

## API

```js
const pdrone = require('pdrone');
const drone = pdrone({id: 'teamx', debug: false});
drone.on('connected', function() {
  drone.flatTrim(); // use flatTrim() everytime you want the drone to calm down
  drone.takeOff();
  drone.land();  
  drone.flatTrim();
  drone.emergency(); // immediately stops the drone, that's what is inside stop.js
  drone.fly({
    roll: 0, // -100/100
    pitch: 0, // -100/100
    yaw: 0, // -100/100
    gaz: 0, // -100/100, = throttle
  });
  drone.autoTakeOff(); // will start propellers in low mode and wait for you to throw it in the air (gently)
  drone.flip({direction: 'right'}); // front/back/right/left
  drone.cap({offset: 0}); // -180/180, I have no idea what this does
  drone.openClaw();
  drone.closeClaw();
  drone.fire();

  // events
  drone.on('connected', function() {});
  // flight status, accessories, ... you'll have to dig that
  drone.on('sensor', function(event) {
    // event.name =>
    //   flatTrimDone, status, alert, claw, gun, position, speed, altitude, quaternion
    // event.value
  });
});
```

## Technical advices

Have a look at pdrone repository at [algolia/pdrone](https://github.com/algolia/pdrone).

You can also use lower level commands (this is not required at all, only for transparency):
- `drone.runCommand('minidrone', 'Piloting', 'TakeOff')`
- `drone.connection.on('sensor:minidrone-PilotingState-FlyingStateChanged', e => console.log(e))`

All the commands and tokens (`minidrone`, `Piloting` ...) are listed here:
- https://github.com/Parrot-Developers/arsdk-xml/blob/master/xml/minidrone.xml
- https://github.com/Parrot-Developers/arsdk-xml/blob/master/xml/common.xml

You can also read the code of the higher level library `pdrone` that we provide, which
is just wrapping `pdrone-low-level`, which itself is a modified version of https://github.com/Mechazawa/minidrone-js, which was buggy (do not try to use minidrone-js directly, use `drone.runCommand` and `drone.connection`).

If you are really adventurous you can read about [Parrot's protocol](http://developer.parrot.com/docs/SDK3/ARSDK_Protocols.pdf).

`runCommand` responsibility is to traverse the XML (arsdk-xml) turned into JavaScript object,
find the right ids and messages formats and craft buffers.

While you're reading this very technical piece, wanna go the extra mile? What about controlling the drone using your browser? What about implementing even more features like taking pictures? Go wild here!

## If Node.js is not working

Launch all commands from the root of this repository.

There are a lot of ways to install Node.js, but first clean your system
from any Node.js, npm or yarn package:

```sh
brew uninstall node
brew uninstall yarn
brew uninstall npm
```

If one of those commands fails, no big deal. Then:

```sh
node -v
yarn -v
```

If both fails, great! Otherwise: http://stackabuse.com/how-to-uninstall-node-js-from-mac-osx/

Now to install a fresh Node.js version:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
curl -o- -L https://yarnpkg.com/install.sh | bash
nvm install
yarn
```

## Upgrading the `pdrone` module

We might ask you to upgrade the module while at the event, for this:

```sh
npm install pdrone@latest
yarn add pdrone@latest
```

## FAQ

- "I have to leave early what do I do?"
It's ok, pack your stuff bring it to the ballroom and use the best of your time to help your teammates and have your share of fun.

- "Nothing is working THIS IS SHIT!"
It's ok, come talk to us ask for help

Any question, ask organizers and we will add the answers for everyone here iteratively.
