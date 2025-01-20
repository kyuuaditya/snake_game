var blockSize = 25; // Size of each block in the grid

var board;
var context;

var rows = 30;
var cols = 50;

var snakeBody = []; // Snake body array

var snakeX = blockSize * 5; // Initial position of the snake
var snakeY = blockSize * 5;

var velocityX = 0; // temp variables to store the velocity of the snake
var velocityY = 0;

var lastUpdateTime = 0; // Variable to store the last update time
var snakeSpeed = 100; // to control a tick in game loop

var gameOver = false; //  to check if the game is over or not

var hasMoved = true; // to check if the snake has moved or not

window.onload = function () {
  // loads the game
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood(); // place the food on a random place
  document.addEventListener("keyup", changeDirection); // change the direction of the snake
  requestAnimationFrame(update);
};

function update(currentTime) {
  if (gameOver) {
    return;
  }
  if (currentTime - lastUpdateTime < snakeSpeed) {
    requestAnimationFrame(update);
    return;
  }
  lastUpdateTime = currentTime;
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    updateScore();
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

  if ((event.code == "KeyW" || event.code == "ArrowUp") && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (
    (event.code == "KeyS" || event.code == "ArrowDown") &&
    velocityY != -1
  ) {
    velocityX = 0;
    velocityY = 1;
  } else if (
    (event.code == "KeyA" || event.code == "ArrowLeft") &&
    velocityX != 1
  ) {
    velocityX = -1;
    velocityY = 0;
  } else if (
    (event.code == "KeyD" || event.code == "ArrowRight") &&
    velocityX != -1
  ) {
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

//  scoring system

let score = 0;

function updateScore() {
  score += 10; // Increment score by 10 (or any other value)
  document.getElementById("score").innerText = `Score: ${score}`;
}

// Call eatFood function whenever the snake eats food
// This is just an example, you need to integrate it with your game logic
document.addEventListener("keydown", (event) => {
  if (event.key === "f") {
    // Press 'f' to simulate eating food
    eatFood();
  }
});
