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
        arc(-this.r / 2, -this.r / 3, this.r, this.r, -PI, PI);
        arc(this.r / 2, -this.r / 3, this.r, this.r, -PI, PI);
        curve(this.r / 2, -this.r * 2.3, -this.r, -this.r / 3, 0, this.r, 0, 0);
        curve(-this.r / 2, -this.r * 2.3, this.r, -this.r / 3, 0, this.r, 0, 0);
        pop();

        if (debug === true) {
            push();
            stroke(0, 255, 0);
            noFill()
            ellipse(this.pos.x, this.pos.y, (this.r * 2) / 1.2);
            pop();
   
        }
    }

    this.hit = function (bulletX, bulletY) {
        if (dist(this.pos.x, this.pos.y, bulletX, bulletY) < this.r) {
            return true;
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

function Hyperspace() {
    this.transport = function () {
        let x = random(45, width - 45);
        let y = random(45, height - 45);
        return {
            x: x,
            y: y
        };
    }
}
