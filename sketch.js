var debug = false; //set this value to true in devloper tools to show debug functions

const BACKGROUND_COLOR = 51;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const SHIP_ROTATION_INCREMENT = 4;

const SHIP_MAX_HEALTH = 3;
const SHIELD_MAX_HEALTH = 3;

const ASTEROID_DAMAGE_SHIELD = 1;
const ASTEROID_DAMAGE_SHIP = 1;
const ASTEROID_MAX_NUMBER = 15;

let ship;
let sheild;
let asteroids = [];
let bullets = [];
let gameIsOver = false;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    ship = new Ship(SHIP_MAX_HEALTH, ASTEROID_DAMAGE_SHIP);
    shield = new Shield(SHIELD_MAX_HEALTH, ASTEROID_DAMAGE_SHIELD);
    for (let i = 0; i < ASTEROID_MAX_NUMBER; i++) {
        asteroids.push(new Asteroid(random(45, width - 45), random(45, height - 45), random(15, 45)));
    }
}

function draw() {
    background(BACKGROUND_COLOR);
    if (!gameIsOver) {
        ship.show();
        // shield.show();
        for (let i = bullets.length - 1; i > -1; i--) {
            bullets[i].show();
            bullets[i].update();

            /*
            if the bullets leave the screen area they are deleted from
            the array
            */
            if (bullets[i].getPos().x <= -5 ||
                bullets[i].getPos().x > width + 5) {
                bullets.splice(i, 1);
            } else if (bullets[i].getPos().y <= -5 ||
                bullets[i].getPos().y > height + 5) {
                bullets.splice(i, 1);
            } else if (debug == true) {
                text(Math.floor(bullets[i].getPos().x) +
                    ", " +
                    Math.floor(bullets[i].getPos().y),
                    bullets[i].getPos().x,
                    bullets[i].getPos().y);
            }

            /*used to test if bullets delete themselves from array if they 
            leave the screen area*/
            //console.log("Bullet Array Length: " + bullets.length);
        }

        //ERRORS MAY OCCUR!
        for (let i = asteroids.length - 1; i > -1; i--) {
            asteroids[i].show();
            asteroids[i].update();
            asteroids[i].hitEdge();
            for (let j = bullets.length - 1; j > -1; j--) {
                if (asteroids[i].hit(bullets[j].getPos().x, bullets[j].getPos().y)) {

                    //Debug statement
                    //console.log(asteroids[i].getRadius());

                    if (asteroids[i].getRadius() > 30) {
                        asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                        asteroids.push(new Asteroid(bullets[j].getPos().x, bullets[j].getPos().y, asteroids[i].getRadius() / 2));
                    }

                    bullets.splice(j, 1);
                    asteroids.splice(i, 1);
                }
            }

        }
        controls();
    }
}

function checkIfGameOver() {
    if (ship.getHealth < 0) {
        gameIsOver = true;
    }
}

function controls() {
    if (keyIsDown(LEFT_ARROW)) {
        ship.setRotate(SHIP_ROTATION_INCREMENT, "decrease");
    } else if (keyIsDown(RIGHT_ARROW)) {
        ship.setRotate(SHIP_ROTATION_INCREMENT, "increase");
    }
}

function keyPressed() {
    if (keyIsDown(32)) {
        bullets.push(new Bullet(ship.getShipTipPos().x,
            ship.getShipTipPos().y,
            ship.getRotationRadians()));
    }
}
