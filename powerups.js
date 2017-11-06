function PowerUps() {
    healthUp = [];

    this.show = function () {
        if (healthUp.length !== 0) {
            for (let i = healthUp.length - 1; i >= 0; --i) {
                healthUp[i].show();
                healthUp[i].update();
                healthUp[i].hitEdge();
            }   
        }
    }

    this.pickPower = function () {
        let randPowerIndex = random(1, 100);
        if (round(randPowerIndex) === 43) {
            healthUp.push(new HealthUp());
        } else if (round(randPowerIndex) === 54) {
            //TODO make the ship appear at a random location, with chance of appearing on an asteroid or self destructing
            console.log("Hyperspace")
        }
    }
}

function HealthUp() {

    this.pos = createVector(random(45, width / 2), random(45, height / 2));
    this.vel = createVector(random(-4, 4), random(-4, 4));
    this.r = 10;
    this.diameter = this.r * 2;

    this.show = function () {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        ellipseMode(CENTER);
        // ellipse(0, 0, (this.r * 2) / 1.2)
        arc(-this.r / 2, -this.r / 3, this.r, this.r, -PI, PI);
        arc(this.r / 2, -this.r / 3, this.r, this.r, -PI, PI);
        curve(this.r / 2, -this.r * 2.3, -this.r, -this.r / 3, 0, this.r, 0, 0);
        curve(-this.r / 2, -this.r * 2.3, this.r, -this.r / 3, 0, this.r, 0, 0);
        pop();
    }

    this.hit = function (bulletX, bulletY) {
        if (bulletX !== undefined && bulletY !== undefined) {
            if (dist(this.pos.x, this.pos.y, bulletX, bulletY) < this.r) {
                return true;
            }
        }
    }

    this.update = function () {
        this.pos.add(this.vel);
    }

    this.hitEdge = function () {
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
}
