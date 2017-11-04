function GUI() {

    this.margin = 30;
    this.lives = 3;
    this.score = 0;

    this.show = function() {
        text(this.score, 45, 90);
        text(this.lives, 45 , 150);
    }
}
