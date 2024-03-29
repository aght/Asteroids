function GUI(fontSize) {

    this.margin = 45;
    this.fontSize = fontSize;
    this.scoreZeroPaddingLength = 6;
    this.levelZeroPaddingLength = 2;

    this.show = function (lives, score, level, hyperspaceStatus) {
        push();
        fill(255);
        translate(this.margin, this.margin);

        let paddedScore = score.toString();
        while(paddedScore.length < this.scoreZeroPaddingLength) {
            paddedScore = "0" + paddedScore ;
        }
        text(paddedScore, 0, 0);
        pop();

        push();
        fill(255);
        textAlign(CENTER);
        translate(width / 2, this.margin);
        let paddedLevel = level.toString();
        while(paddedLevel.length < this.levelZeroPaddingLength) {
            paddedLevel = "0" + paddedLevel ;
        }
        text(paddedLevel, 0,0);
        pop();

        for (let i = lives; i > 0; i--) {
            push();
            stroke(255);
            strokeWeight(1.5);
            noFill();
            translate(45 + 17 * (i - 1) + 6, this.fontSize + 45);
            quad(-6, 6, 0, -10, 6, 6, 0, 2);
            pop();
        }

        if (hyperspaceStatus === true) {
            push();
            fill(255);
            translate(this.margin, height - this.margin);
            textSize(this.fontSize - this.fontSize / 4);
            text("Hyperspace ready", 0, 0)
            pop();
        }
    }
}
