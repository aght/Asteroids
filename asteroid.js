function Asteroid(posX, posY, radius) {
    this.pos = createVector(posX, posY);
    this.points = Math.floor(random(8, 12));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.r = radius
    this.offset = [];

    for (let i = 0; i < this.points; i++) {
        this.offset[i] = random(-10, 10);
    }

    this.show = function () {
        push();
        stroke(255);
        noFill();
        angleMode(RADIANS)
        translate(this.pos.x + this.r, this.pos.y + this.r);
        beginShape();
        for (let i = 0; i < this.points; i++) {
            let angle = map(i, 0, this.points, 0, TWO_PI);
            let x = (this.r + this.offset[i]) * Math.cos(angle);
            let y = (this.r + this.offset[i]) * Math.sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);

        //debug for asteroid collisions        
        if (debug == true) {
            stroke(0, 255, 0);
            ellipse(0, 0, this.r * 2);
            pop();
        }
        pop();
    }

    this.update = function () {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }

    this.hitEdge = function () {
        if (this.pos.x > width + this.r * 1.5) {
            this.pos.x = -(this.r * 1.5);
        }
        if (this.pos.x < -(this.r * 1.5)) {
            this.pos.x = width + this.r * 1.5;
        }
        if (this.pos.y > height + this.r * 1.5) {
            this.pos.y = -(this.r * 1.5);
        }
        if (this.pos.y < -60) {
            this.pos.y = height + this.r * 1.5;
        }
    }

    this.hit = function (bulletX, bulletY) {
        if (dist(this.pos.x, this.pos.y, bulletX, bulletY) < this.r) {
            // push();
            // textAlign(CENTER);
            // text("HIT", this.pos.x, this.pos.y);
            // pop();
            return true;
        }
    }

    this.getRadius = function () {
        return this.r;
    }

    this.getPos = function () {
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
}
