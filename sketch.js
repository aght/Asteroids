var debug = false; //set this value to true in devloper tools to show debug functions

const BACKGROUND_COLOR = 51;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const SHIP_ROTATION_INCREMENT = 0.1;

const SHIP_MAX_LIVES = 4;

const ASTEROID_MIN_SPLIT_RADIUS = 15;
const ASTEROID_DAMAGE_SHIELD = 1;
const ASTEROID_DAMAGE_SHIP = 1;
const ASTEROID_MAX_SIZE = 45
const ASTEROID_MIN_SIZE = 15;

let maxNumAsteroids = 2;

const SCORE_LARGE = 25;
const SCORE_MEDIUM = 50;
const SCORE_SMALL = 100;

let score = 0;
let lives = 3;
let level = 1

let fontSize = 24

let healthUp = [];
let gui;
let ship;
let sheild;
let asteroids = [];
let bullets = [];
let powerUps;

let title

let gameIsOver = true;
let gameStarted = false;

let displayWelcome = true;
let displayGameOver = false;

let allowHyperspace = false;

function setup() {
    let font = loadFont('fonts/Hyperspace Bold.otf');
    textFont(font)
    textSize(fontSize);
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    ship = new Ship(ASTEROID_DAMAGE_SHIP);
    gui = new GUI(fontSize);
}

function draw() {
    background(BACKGROUND_COLOR);
    if (!gameIsOver && gameStarted) {
        gui.show(lives, score, level, allowHyperspace);
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
            if (lives <= 0) {
                gameIsOver = true;
                gameStarted = false;
                displayWelcome = false;
                displayGameOver = true;
            }
            for (let j = bullets.length - 1; j >= 0; --j) {
                if (asteroids[i] !== undefined) {
                    if (asteroids[i].hit(bullets[j].getPos().x, bullets[j].getPos().y)) {
                        if (asteroids[i].getRadius() > ASTEROID_MIN_SPLIT_RADIUS) {
                            asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                            asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                        }

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
        if (asteroids.length == 0) {
            level++;
            reset(true);
        }
        controls();
        pickPower();

        if (healthUp.length !== 0) {
            for (let i = healthUp.length - 1; i >= 0; --i) {
                healthUp[i].show();
                healthUp[i].update();
                healthUp[i].hitEdge();
                for (let j = bullets.length - 1; j >= 0; --j) {
                    if (bullets.length !== 0 && healthUp[i] !== undefined) {
                        if (healthUp[i].hit(bullets[j].getPos().x, bullets[j].getPos().y)) {
                            ship.gainLife();
                            healthUp.splice(i, 1);
                            bullets.splice(j, 1);
                        }
                    }
                }   
            }
        }
    } else {
        if (displayWelcome === true) {
            welcomeScreen();
        } else if (displayGameOver == true) {
            gameOverScreen();
        }
    }
}

function pickPower() {
    let randPowerIndex = round(random(1, 1000));
    let randHealthIndex = round(random(1, 1000));
    let randHyperspaceIndex = round(random(1, 1000));
    if (randPowerIndex === randHealthIndex) {
        healthUp.push(new HealthUp());
        console.log("Health Up");
    } else if (randPowerIndex === randHyperspaceIndex) {
        allowHyperspace = true;
        console.log("Hyperspace");
    }
}

function welcomeScreen() {
    push();
    translate(width / 2, height / 2);
    textAlign(CENTER);
    fill(255);
    stroke(255);
    textSize(90);
    text("Asteroids", 0, 0);
    textSize(20);
    text("Press 'Enter' to start", 0, height / 2 - 20);
    pop();
}

function gameOverScreen() {
    push();
    translate(width / 2, height / 2);
    fill(255);
    stroke(255);
    textSize(90)
    textAlign(CENTER);
    text("GAME OVER", 0, 0);
    textSize(20);
    text("Press 'Enter' to try again", 0, height / 2 - 20);
    pop();
}

function createAsteroids() {
    for (let i = 0; i < maxNumAsteroids; i++) {
        //TODO do not allow asteroids to spawn on or near ship
        let randX = random(45, width - 45);
        let randY = random(45, height - 45);
        let randRadius = random(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE);
        while (dist(randX, randY, width / 2, height / 2) <= (randRadius + ship.getRadius()) * 4) {
            console.log("Asteroid too close to ship, creating new one.");
            randX = random(45, width - 45);
            randY = random(45, height - 45);
        }
        asteroids.push(new Asteroid(randX, randY, randRadius));
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
    if (keyCode === 32) {
        bullets.push(new Bullet(ship.getShipTipPos().x,
            ship.getShipTipPos().y,
            ship.getRotationRadians()));
    }
    if (keyCode === 13) {
        reset();
    }
    if (keyCode === 16) {
        if (allowHyperspace === true) {
            console.log("Hyperspace Activated");
            ship.setPos(random(45, width - 45), random(45, height - 45));
            allowHyperspace = false;
        }
       
    }
}

function reset(newLevel) {
    if (newLevel !== undefined && newLevel === true) {
        ship.setPos(width / 2, height / 2);
        asteroids = [];
        bullets = [];
        maxNumAsteroids += 2;
        createAsteroids();
    } else {
        ship.gainLife(SHIP_MAX_LIVES);
        maxNumAsteroids = 2;
        lives = SHIP_MAX_LIVES;
        score = 0;
        level = 1
        ship.setPos(width / 2, height / 2);
        gameIsOver = false;
        gameStarted = true;
        asteroids = [];
        bullets = [];
        createAsteroids();
    }
}
