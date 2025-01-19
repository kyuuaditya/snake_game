// board
var blockSize = 25;
var rows = 30;
var cols = 50;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var lastUpdateTime = 0;
var snakeSpeed = 100;

var gameOver = false;

var hasMoved = true;

// // food
// var foodX = blockSize * 18;
// var foodY = blockSize * 28;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  //   setInterval(update, 1000 / 10);
  requestAnimationFrame(update);
};

function update(currentTime) {
  if (gameOver) {
    return;
  }
  if (currentTime - lastUpdateTime < snakeSpeed) {
    requestAnimationFrame(update);
    return 0;
  }
  lastUpdateTime = currentTime;
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  // Draw the grid
  drawGrid();

  if (!gameOver) {
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Set hasMoved to true after the snake has moved
    hasMoved = true;
  }

  // snakeX += velocityX * blockSize;
  // snakeY += velocityY * blockSize;
  context.fillStyle = "cyan";
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "cyan";
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= cols * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
  requestAnimationFrame(update);
}

function changeDirection(event) {
  if (!hasMoved) return 0;

  if (event.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  hasMoved = false;
}

function drawGrid() {
  //   context.fillRect(10, 10, 5, 80);
  const gap = 25;
  for (let x = 0; x < board.width; x += gap) {
    context.fillStyle = "#CCCCCC"; // Light grey color for the grid squares
    context.fillRect(x, 0, 0.5, board.height); // Draw squares with a small gap between them
  }
  for (let y = 0; y < board.height; y += gap) {
    // context.fillStyle = "cyan";
    context.fillStyle = "#CCCCCC"; // Light grey color for the grid squares
    context.fillRect(0, y, board.width, 0.5);
  }
  return 0;
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
