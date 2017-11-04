function Asteroid(posX, posY, radius) {
    this.pos = createVector(posX, posY);
    this.points = Math.floor(random(8, 12));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.r = radius
    this.offset = [];
    this.wrapEdgesFactor = 1.2;

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
        pop();
              
        if (debug == true) {
            push();
            noFill();
            translate(this.pos.x + this.r, this.pos.y + this.r);
            stroke(0, 255, 0);
            ellipseMode(CENTER);
            ellipse(0, 0, this.r * 2);
            pop();
        }
    }

    this.update = function () {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }

    this.hitEdge = function () {
        if (this.pos.x > width + this.r * this.wrapEdgesFactor) {
            this.pos.x = -(this.r * this.wrapEdgesFactor);
        }
        if (this.pos.x < -(this.r * this.wrapEdgesFactor)) {
            this.pos.x = width + this.r * this.wrapEdgesFactor;
        }
        if (this.pos.y > height + this.r * this.wrapEdgesFactor) {
            this.pos.y = -(this.r * this.wrapEdgesFactor);
        }
        if (this.pos.y < -(this.r * this.wrapEdgesFactor)) {
            this.pos.y = height + this.r * this.wrapEdgesFactor;
        }
    }

    this.hit = function (bulletX, bulletY) {
        if (dist(this.pos.x + this.r, this.pos.y + this.r, bulletX, bulletY) < this.r) {
            return true;
        }
    }

    this.getRadius = function () {
        return this.r;
    }

    this.getPos = function () {
        return {
            x: (this.pos.x + this.r),
            y: (this.pos.y + this.r)
        };
    }
}
