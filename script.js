const snakeboard = document.getElementById("gameCanvas");
const snakeboard_cxt = snakeboard.getContext("2d");

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

const board_background = "white";
const board_border = 'black';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let dx = 10;
let dy = 0;



function clearCanvas() {

    snakeboard_cxt.fillStyle = board_background;

    snakeboard_cxt.strokestyle = board_border;

    snakeboard_cxt.fillRect(0, 0, snakeboard.width, snakeboard.height);

    snakeboard_cxt.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function drawSnakePart(snakePart) {

    snakeboard_cxt.fillStyle = snake_col;

    snakeboard_cxt.strokestyle = snake_border;

    snakeboard_cxt.fillRect(snakePart.x, snakePart.y, 10, 10);

    snakeboard_cxt.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}


function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    snake.unshift(head);
    snake.pop();
}

function main() {
    setTimeout(function onTick() {
        clearCanvas();
        moveSnake();
        drawSnake();
        // call main again so to keep being called by itself forever or until the game ends - a condition I'll write later;
        main();

    }, 100)
}


main();