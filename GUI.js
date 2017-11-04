function GUI() {

    this.margin = 30;
    this.fontSize = fontSize;

    this.show = function (lives, score) {
        push();
        fill(255);
        translate(45, 45);
        text(score, 0, 0);
        //text(lives, 0, 24);
        pop();

        switch (lives) {
            case 6:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 17 * 5 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
            case 5:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 17 * 4 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
            case 4:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 17 * 3 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
            case 3:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 17 + 17 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
            case 2:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 17 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
            case 1:
                push();
                stroke(255);
                strokeWeight(1.5);
                noFill();
                translate(45 + 6, this.fontSize + 45);
                quad(-6, 6, 0, -10, 6, 6, 0, 2);
                pop();
                break;
        }




    }
}
