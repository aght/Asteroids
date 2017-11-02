function Shield(health, damageRatio) {
    this.health = health;
    this.damageRatio = damageRatio;
    this.shieldRadius = 64;

    this.show = function () {
        fill(255);
        if (this.health > 0) {
            push();
            stroke(255);
            noFill();
            translate(width / 2, height / 2);
            ellipse(0, 0, this.shieldRadius, this.shieldRadius);
            ellipse(0, 0, this.shieldRadius + 6, this.shieldRadius + 6);
            pop();
        }
        text("Shield Health: " + this.health, 55, 66);
    }

    this.checkForDamage = function () {
        this.health -= this.damageRatio;
    }
}
