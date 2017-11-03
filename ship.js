function Ship(health, damageRatio) {
    this.REFERENCE_CIRCLE_RADIUS = 20;
    this.shipDamageRatio = damageRatio;
    this.shipHealth = health;
    this.shipHeadingAngle = 0;
    this.rotation = 0
    this.pos = createVector(width / 2, height / 2);
    this.collisionRadius = 28;
    this.vel = createVector(0, 0);

    this.show = function () {
        if (this.shipHealth > 0) {
            push();
            stroke(255);
            strokeWeight(2);
            noFill();
            translate(this.pos.x, this.pos.y);
            rotate(this.shipHeadingAngle);
            quad(-10, 10, 0, -14, 10, 10, 0, 5);

            //debug for ship
            if (debug == true) {
                strokeWeight(1);
                stroke(0, 255, 0);
                ellipse(0, 0, 28, 28);
            }
            pop();
        }
        fill(255);
        text("Ship Health: " + this.shipHealth, 55, 55);
    }

    this.turn = function () {
        this.shipHeadingAngle += this.rotation;
    }

    this.setRotate = function (angleIncrement) {
        this.rotation = angleIncrement;
    }

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.mult(0.98);
    }

    this.boost = function () {
        let force = p5.Vector.fromAngle(this.shipHeadingAngle - PI / 2);
        force.mult(0.1)
        this.vel.add(force);
    }

    /*tip of the ship is calculated using a reference circle, the angle of the 
    ship will determine the location of the tip of the ship.*/
    this.getShipTipPos = function () {
        let rot = this.shipHeadingAngle - PI / 2;
        let x = this.pos.x + this.REFERENCE_CIRCLE_RADIUS * Math.cos(rot);
        let y = this.pos.y + this.REFERENCE_CIRCLE_RADIUS * Math.sin(rot);
        return {
            x: x,
            y: y
        };
    }

    this.checkCollision = function (asteroidX, asteroidY) {
        if (dist(this.pos.x, this.pos.y, asteroidX, asteroidY) < this.collisionRadius) {
            // this.shipHealth--;
            return true;
        }
        // console.log("SHIP: " + floor(this.pos.x) + " " + floor(this.pos.y) + "ASTER: " + floor(asteroidX) + " " + floor(asteroidY));
    }

    this.getRotationRadians = function () {
        return this.shipHeadingAngle - PI / 2;
    }

    this.getHealth = function () {
        return this.shipHealth;
    }

    this.getPos = function () {
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
}
