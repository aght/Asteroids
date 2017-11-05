function GUI(fontSize) {

    this.margin = 45;
    this.fontSize = fontSize;
    this.scoreZeroPaddingLength = 6;
    this.levelZeroPaddingLength = 2;

    this.show = function (lives, score, level) {
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
        // switch (lives) {
        //     case 6:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 17 * 5 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //     case 5:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 17 * 4 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //     case 4:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 17 * 3 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //     case 3:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 17 + 17 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //     case 2:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 17 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //     case 1:
        //         push();
        //         stroke(255);
        //         strokeWeight(1.5);
        //         noFill();
        //         translate(45 + 6, this.fontSize + 45);
        //         quad(-6, 6, 0, -10, 6, 6, 0, 2);
        //         pop();
        //         break;
        // }
    }
}
