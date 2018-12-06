const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const row = 20;       
const column = 10;
const squareSize = 40;
const empty = "black"; // color of an empty square

// draws a single square
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*squareSize, y*squareSize, squareSize, squareSize);

  ctx.strokeStyle = "gray";
  ctx.strokeRect(x*squareSize, y*squareSize, squareSize, squareSize);
}

// creates the tetris board 
let board = [];
for (r = 0; r < row; r++) {           // creates the rows
  board[r] = [];
  for(c = 0; c < column; c++) {       // creates the columns
    board[r][c] = empty;
  }
}

// draw the board to the canvas
function drawBoard() {
  for (r = 0; r < row; r++) {         // draws the rows
    for(c = 0; c < column; c++) {
      drawSquare(c, r, board[r][c]);  //draws the columns
    }
  }
}

drawBoard();

