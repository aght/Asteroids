var debug = false; //set this value to true in devloper tools to show debug functions

const BACKGROUND_COLOR = 51;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const SHIP_ROTATION_INCREMENT = 0.1;

const SHIP_MAX_LIVES = 3;

const ASTEROID_MIN_SPLIT_LIMIT = 15;
const ASTEROID_DAMAGE_SHIELD = 1;
const ASTEROID_DAMAGE_SHIP = 1;
const ASTEROID_MAX_NUMBER = 5;
const ASTEROID_MAX_SIZE = 45
const ASTEROID_MIN_SIZE = 15;

const SCORE_LARGE = 25;
const SCORE_MEDIUM = 50;
const SCORE_SMALL = 100;

let score = 0;
let lives = 3;
let level = 1

let font;
let fontSize = 24

let gui;
let ship;
let sheild;
let asteroids = [];
let bullets = [];

let title

let gameIsOver = false;
let gameStarted = false;

function preload() {
    font = loadFont('/fonts/Hyperspace Bold.otf');
}

function setup() {
    textFont(font)
    textSize(fontSize);
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    ship = new Ship(SHIP_MAX_LIVES, ASTEROID_DAMAGE_SHIP);
    gui = new GUI(fontSize);

    for (let i = 0; i < ASTEROID_MAX_NUMBER; i++) {
        //TODO do not allow asteroids to spawn on or near ship
        let randX = random(45, width - 45);
        let randY = random(45, height - 45);
        let randRadius = random(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE);
        asteroids.push(new Asteroid(randX, randY, randRadius));
    }
}

function draw() {
    background(BACKGROUND_COLOR);
    if (!gameIsOver && gameStarted) {
        gui.show(lives, score, level);
        ship.flash();
        ship.show();
        ship.turn();
        ship.update();
        ship.offScreen();
        for (let i = bullets.length - 1; i > -1; i--) {
            bullets[i].show();
            bullets[i].update();

            if (bullets[i].offScreen()) {
                bullets.splice(i, 1);
            }
        }

        for (let i = asteroids.length - 1; i >= 0; --i) {
            asteroids[i].show();
            asteroids[i].update();
            asteroids[i].hitEdge();

            ship.checkCollision(asteroids[i].getPos().x, asteroids[i].getPos().y, asteroids[i].getRadius());
            lives = ship.getLives();
            for (let j = bullets.length - 1; j >= 0; --j) {
                if (asteroids[i] != undefined) {
                    if (asteroids[i].hit(bullets[j].getPos().x, bullets[j].getPos().y)) {
                        if (asteroids[i].getRadius() > ASTEROID_MIN_SPLIT_LIMIT) {
                            asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                            asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                        }

                        //set score amount based on radius of asteroid
                        if (asteroids[i].getRadius() > 35 && asteroids[i].getRadius() <= 45) {
                            score += SCORE_LARGE;
                        } else if (asteroids[i].getRadius() > 25 && asteroids[i].getRadius() <= 35) {
                            score += SCORE_MEDIUM;
                        } else if (asteroids[i].getRadius() <= 25) {
                            score += SCORE_SMALL;
                        }

                        bullets.splice(j, 1);
                        asteroids.splice(i, 1);
                    }
                }
            }
        }
        controls();
    } else {
        push();
        translate(width/ 2, height / 2);
        textAlign(CENTER);
        fill(255);
        stroke(255);
        textSize(90);
        text("Asteroids", 0,0);
        textSize(20);
        text("Press 'Enter' to start", 0, height / 2 - 20);
        pop();
    }
}

function checkIfGameOver() {
    if (ship.getHealth < 0) {
        gameIsOver = true;
    }
}

function keyReleased() {
    ship.setRotate(0);
}

function controls() {
    if (keyIsDown(LEFT_ARROW)) {
        ship.setRotate(-SHIP_ROTATION_INCREMENT);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.setRotate(SHIP_ROTATION_INCREMENT);
    }
    if (keyIsDown(17)) {
        ship.addThrust();
    }
}

function keyPressed() {
    //Space
    if (keyCode == 32) {
        bullets.push(new Bullet(ship.getShipTipPos().x,
            ship.getShipTipPos().y,
            ship.getRotationRadians()));
    }

    //Enter
    if (keyCode == 13) {
        gameIsOver = false;
        gameStarted = true;
    }
}
