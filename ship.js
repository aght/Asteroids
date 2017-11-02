function Ship(health, damageRatio) {
    this.REFERENCE_CIRCLE_RADIUS = 20;
    this.shipDamageRatio = damageRatio;
    this.shipHealth = health;
    this.shipRotation = 0;
    this.pos = createVector(width / 2, height / 2);

    this.show = function () {
        if (this.shipHealth > 0) {
            push();
            stroke(255);
            strokeWeight(2);
            noFill();
            translate(this.pos.x, this.pos.y);
            angleMode(DEGREES);
            rotate(this.shipRotation);
            quad(-10, 10, 0, -14, 10, 10, 0, 5);

            //debug for ship
            if (debug == true) {
                strokeWeight(1);
                stroke(0, 255, 0);
                ellipse(0, 0, 28, 28);
            }
            pop();
        }
        // fill(255);
        // text("Ship Health: " + this.shipHealth, 55, 55);
    }

    this.setRotate = function (angleIncrement, type) {
        if (type == "increase") {
            this.shipRotation += angleIncrement;
        } else if (type == "decrease") {
            this.shipRotation -= angleIncrement;
        }
    }

    /*tip of the ship is calculated using a reference circle, the angle of the 
    ship will determine the location of the tip of the ship.*/
    this.getShipTipPos = function () {
        let rot = (this.shipRotation - 90) * (Math.PI / 180);
        let x = width / 2 + this.REFERENCE_CIRCLE_RADIUS * Math.cos(rot);
        let y = height / 2 + this.REFERENCE_CIRCLE_RADIUS * Math.sin(rot);
        return {
            x: x,
            y: y
        };
    }

    this.collision = function (asteroidX, asteroidsY) {
        if (dist(this.pos.x, this.pos.y, asteroidX, asteroidY)) {
            return true;
        }
    }

    this.getRotationRadians = function () {
        return (this.shipRotation - 90) * (Math.PI / 180);
    }

    this.getHealth = function () {
        return this.shipHealth;
    }
}
