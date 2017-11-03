function Bullet(shipTipX, shipTipY, rotation) {
    this.pos = createVector(shipTipX, shipTipY);
    this.rot = rotation;
    
    this.vx = this.vy = 10;

    this.show = function () {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        rotate((this.rot) * (180 / Math.PI) + 90);
        quad(-4, 4, 0, -4, 4, 4, 0, 2);

        //debug for bullet collision
        if (debug == true) {
            stroke(0, 255, 0);
            ellipse(0, 0, 8, 8);
        }
        pop();
    }

    this.update = function () {
        this.pos.x += this.vx * Math.cos(this.rot);
        this.pos.y += this.vy * Math.sin(this.rot);
    }

    this.getPos = function () {
        return {
            x: this.pos.x,
            y: this.pos.y
        };
    }
}
