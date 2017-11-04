function Ship(lives, damageRatio) {
    this.REFERENCE_CIRCLE_RADIUS = 20;
    this.shipDamageRatio = damageRatio;
    this.lives = lives;
    this.shipHeadingAngle = 0;
    this.rotation = 0
    this.pos = createVector(width / 2, height / 2);
    this.diameter = 28;
    this.radius = this.diameter / 2;
    this.vel = createVector(0, 0);

    this.allowDamage = true;

    this.frameCountCounter = 0;
    this.flashCounter = 0;
    this.maxNumFlashes = 4;
    this.isWhite = true;
    this.shipColor = 255;
    this.allowAgain = true;

    this.show = function () {
        if (this.lives > 0) {
            push();
            stroke(this.shipColor);
            strokeWeight(2);
            noFill();
            translate(this.pos.x, this.pos.y);
            rotate(this.shipHeadingAngle);
            quad(-10, 10, 0, -14, 10, 10, 0, 5);

            if (debug == true) {
                strokeWeight(1);
                stroke(0, 255, 0);
                ellipse(0, 0, this.diameter);
            }
            pop();
        }
    }

    this.offScreen = function () {
        if (this.pos.x > width + this.diameter) {
            this.pos.x = -this.diameter;
        }
        if (this.pos.x < -this.diameter) {
            this.pos.x = width + this.diameter;
        }
        if (this.pos.y > height + this.diameter) {
            this.pos.y = -this.diameter;
        }
        if (this.pos.y < -this.diameter) {
            this.pos.y = height + this.diameter;
        }
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

    this.addThrust = function () {
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

    this.checkCollision = function (asteroidX, asteroidY, asteroidRadius) {
        if (this.allowDamage == true) {
            if (dist(this.pos.x, this.pos.y, asteroidX, asteroidY) < this.radius + asteroidRadius) {
                this.allowDamage = false;

                //Decrease lives right after collision
                // this.lives--;
                return true;
            }
        }
    }

    this.flash = function () {
        if (this.allowDamage == false) {
            this.frameCountCounter++;
            if (this.frameCountCounter % 10 == this.maxNumFlashes) {
                if (this.flashCounter !== 6) {
                    if (this.isWhite) {
                        this.shipColor = 51;
                        this.isWhite = false;
                        this.flashCounter++;
                    } else {
                        this.shipColor = 255;
                        this.isWhite = true;
                        this.flashCounter++;
                    }
                } else {
                    this.allowDamage = true;
                    this.flashCounter = 0;

                    //Decrease lives after done flashing
                    this.lives--;
                }
            }
        }
    }

    this.getRotationRadians = function () {
        return this.shipHeadingAngle - PI / 2;
    }

    this.getLives = function () {
        return this.lives;
    }

    this.gainLife = function() {
        this.lives++;
    }

    this.getPos = function () {
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
}
