function GUI() {

    this.margin = 30;

    this.show = function(lives, score) {
        text(lives, 45, 90);
        text(score, 45 , 150);
    }
}
