// ------------------------------ GAMEBOARD ------------------------------
const cvs = document.getElementById('tetris');
const ctx = cvs.getContext('2d');
ctx.scale(20, 20); // 20pixels x 20 pixels
const board = createBoard(10, 20);

const activeShape = {
    pos: {x: 0, y: 0},
    matrix: null,
    next: null,
    score: 0,
    lines: 0,
    level: 0,
};

function createBoard(width, height) {
    const shape = [];
    while (height--) {
        shape.push(new Array(width).fill(0));
    }
    return shape;
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    drawShape(board, {x: 0, y: 0});
    drawShape(activeShape.matrix, activeShape.pos);

    drawNextShape(activeShape.next, {x:1, y:1}); 
}

// draws the shape on the tetris board
function drawShape(shape, offset) {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = colors[value];
                ctx.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function combine(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// ------------------------------ PREVIEW SCREEN ------------------------------
const cvsNext = document.getElementById('preview');
const ctxNext = cvsNext.getContext('2d');
ctxNext.scale(19,19);


let dropCounter = 0;
let dropInterval = 1000;
let startButton = document.getElementById("start");



function drawNextShape(shape, offset) {
    ctxNext.fillStyle = 'white';
    ctxNext.fillRect(0, 0, cvsNext.width, cvsNext.height);

    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctxNext.fillStyle = colors[value];
                ctxNext.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// ------------------------------ CONTROLS ------------------------------

// rotates the active shape
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// moves the active shape down on the board
function moveDown() {
    activeShape.pos.y++;
    if (collide(board, activeShape)) {
        activeShape.pos.y--;
        combine(board, activeShape);
        resetShape();
        checkRows();
        updateScore();
    }
    dropCounter = 0;
}


function moveShape(offset) {
    activeShape.pos.x += offset;
    if (collide(board, activeShape)) {
        activeShape.pos.x -= offset;
    }
}
function rotateShape(direction) {
    const pos = activeShape.pos.x;
    let offset = 1;
    rotate(activeShape.matrix, direction);
    while (collide(board, activeShape)) {
        activeShape.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > activeShape.matrix[0].length) {
            rotate(activeShape.matrix, -direction);
            activeShape.pos.x = pos;
            return;
        }
    }
}
// keycodes to control the active shape on the board
document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37:
            moveShape(-1);
            break;
        case 39:
            moveShape(1);
            break;
        case 40:
            moveDown();
            break;
        case 38:
            rotateShape(1);
            break;
    }
});

// ------------------------------ GAMEPLAY ------------------------------

// checks for full rows
function checkRows() {
    let rowCount = 1;
    outer: for (let y = board.length -1; y > 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;

        activeShape.score += rowCount * 10;
        activeShape.lines++;
        rowCount += 2;
        if(activeShape.lines % 3 === 0)
            activeShape.level++;
    }
}

// checks for collision 
function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}



function resetShape() {
    const pieces = 'TJLOSZI';
    dropInterval = 1000 - (activeShape.level * 100);
    if(activeShape.next === null) {
        activeShape.matrix = createShape(pieces[pieces.length * Math.random() | 0]);
    } else {
        activeShape.matrix = activeShape.next;
    }
    activeShape.next = createShape(pieces[pieces.length * Math.random() | 0]);
    activeShape.pos.y = 0;
    activeShape.pos.x = (board[0].length / 2 | 0) - (activeShape.matrix[0].length / 2 | 0);

    if (collide(board, activeShape)) {
        board.forEach(row => row.fill(0));
        // activeShape.score = 0;
        // activeShape.lines = 0;
        // activeShape.level = 0;
        // updateScore();
        alert("GAME OVER");
    }
}

let lastTime = 0;
function update(time = 0) {
    const timeChange = time - lastTime;

    dropCounter += timeChange;
    if (dropCounter > dropInterval) {
        moveDown();
    }

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerHTML = activeShape.score;
    document.getElementById('lines').innerHTML = activeShape.lines;
    document.getElementById('level').innerHTML = activeShape.level;
}

resetShape();
updateScore();
update();

