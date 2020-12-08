const snakeboard = document.getElementById("gameCanvas");
const snakeboard_cxt = snakeboard.getContext("2d");
// I first grab a hold of the html element then use the canvas API to get the context of the canvas.

document.addEventListener("keydown", change_direction);

let snake = [{
    x: 200,
    y: 200
}, {
    x: 190,
    y: 200
}, {
    x: 180,
    y: 200
}, {
    x: 170,
    y: 200
}, {
    x: 160,
    y: 200
}, ];
// Here I set the coordinates for my initial snake
const board_background = "white";
const board_border = 'black';
const snake_col = 'lightblue';
const snake_border = 'darkblue';
// I set the colors of the background and the border of both, the canvas and the peaces of snake. 

let changing_direction = false;
let score = 0;
let dx = 10;
let dy = 0;
let food_x;
let food_y;
// I assign these coordinates to add on to the snake as a head when it needs to grow.

// With this function I create a clean canvas and I'm using its JS API to give its background and it's border so I am able to keep doing it whenever I call the function
function clearCanvas() {

    snakeboard_cxt.fillStyle = board_background;

    snakeboard_cxt.strokestyle = board_border;

    snakeboard_cxt.fillRect(0, 0, snakeboard.width, snakeboard.height);

    snakeboard_cxt.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
// Same goes for the snake parts - I am coloring them here so that is done each time I call the function (in the function drawSnake)
function drawSnakePart(snakePart) {

    snakeboard_cxt.fillStyle = snake_col;

    snakeboard_cxt.strokestyle = snake_border;

    snakeboard_cxt.fillRect(snakePart.x, snakePart.y, 10, 10);

    snakeboard_cxt.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
// drawSnake calls drawSnakePart with the coordinates of each snake part which are listed in the snake array.
function drawSnake() {
    snake.forEach(drawSnakePart)
}

/* moveSnake creates the head,
 adds it to the snake
  and removes its last part */
function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        gen_food();
    } else {
        snake.pop();
    }

}
/* The loop starts targeting the 5th element of the snake
 because with its head the snake cannot "touch" the other ones
  therefore there's no need of them being checked */

/* The right and bottom walls use -10
 to the width and height respectively
 because that is the coordinate that once the API method starts filling the square
 it results in the suqare that touches the edge. */
function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall

}
// random_food actually generates a random coordinate within provided limits
function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
/* gen_food generates the food 
using the random coordinates from the function above it
But then checks if the product of that
 would collide with any of the snake's squares
*/
function gen_food() {
    food_x = random_food(0, snakeboard.width - 10);
    food_y = random_food(0, snakeboard.height - 10);

    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x === food_x && part.y === food_y;
        if (has_eaten) gen_food()
    });
}
gen_food();

function drawFood() {
    snakeboard_cxt.fillStyle = 'lightgreen';
    snakeboard_cxt.strokestyle = 'darkgreen';
    snakeboard_cxt.fillRect(food_x, food_y, 10, 10);
    snakeboard_cxt.strokeRect(food_x, food_y, 10, 10);
}

function change_direction(event) {
    const left_key = 37;
    const right_key = 39;
    const up_key = 38;
    const down_key = 40;

    if (changing_direction) return;
    changing_direction = true;

    const keyPressed = event.keyCode;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === left_key && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === up_key && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === right_key && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === down_key && !goingUp) {
        dx = 0;
        dy = 10;
    }

}
// main keeps reloading what we see on screen by calling the functions over and over every second
// clearCanvas provides the canvas
// moveSnake creates the new head and removes the tail-last square
// drawSnake draws the new snake
// the three are being called every second which creates the ilusion of the snake moving when it isn't the same squares on the board
function main() {
    if (has_game_ended()) return;
    changing_direction = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        // call main again so to keep being called by itself forever or until the game ends - a condition I'll write later;
        main();

    }, 100)
}


main();