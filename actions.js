var drone = undefined;
module.exports = {
    init: function(initDrone) {
        drone = initDrone;
        console.log("Initializing ", drone.connection.droneFilter);
    },
    fire: async function() {
        console.log("Fire!");
        drone.fire();
        drone.wait(500);
    },
    flip: function() {
        console.log("Flip!");
        drone.flip();
        drone.wait(1000);
    },
    takeOff: async function() {
        console.log("TakeOff!");
        drone.takeOff();
        drone.wait(3000);
        drone.flatTrim();
        drone.wait(1000);
    },
    land: async function() {
        console.log("Land!");
        drone.land();
        drone.wait(3000);
    }
}

