function PowerUps() {

    this.show = function () {

    }

    this.pickPower = function() {
        let randPowerIndex = random(1, 100);
        if (round(randPowerIndex) === 43) {
            console.log("Health Up by 1")
        } else if (round(randPowerIndex) === 54) {
            //TODO make the ship appear at a random location, with chance of appearing on an asteroid or self destructing
            console.log("Hyperspace")
        }
    }
}
