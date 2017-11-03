function Bullet(shipTipX, shipTipY, rotation) {
    this.pos = createVector(shipTipX, shipTipY);
    this.rot = rotation;

    this.vx = this.vy = 10;

    this.show = function () {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        rotate(this.rot + PI / 2);
        quad(-4, 4, 0, -4, 4, 4, 0, 2);

        //debug for bullet collision
        if (debug == true) {
            stroke(0, 255, 0);
            ellipse(0, 0, 8, 8);
        }
        pop();
    }

    this.offScreen = function () {
        if (this.pos.x <= -5 ||
            this.pos.x > width + 5) {
            return true;
        } else if (this.pos.y <= -5 ||
            this.pos.y > height + 5) {
            return true
        }
    }

    this.update = function () {
        this.pos.x += this.vx * Math.cos(this.rot);
        this.pos.y += this.vy * Math.sin(this.rot);
    }

    this.getPos = function () {
        //text("test", this.pos.x, this.pos.y);
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
}
