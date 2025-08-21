function createPlayer(name, symbol, isAI = false) {
  return { name, symbol, isAI };
}

let player1, player2, currentPlayer;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let vsAI = false;

const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const onePlayerBtn = document.getElementById("onePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");

const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame(modeAI) {
  vsAI = modeAI;
  player1 = createPlayer("Player 1", "X");
  player2 = vsAI
    ? createPlayer("AI", "O", true)
    : createPlayer("Player 2", "O");
  currentPlayer = player1;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  renderBoard();
}

function renderBoard() {
  boardElement.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    if (cell !== "") {
      cellDiv.textContent = cell;
      cellDiv.classList.add("taken");
    }
    if (!currentPlayer.isAI && cell === "" && !gameOver) {
      cellDiv.addEventListener("click", () => makeMove(index));
    }
    boardElement.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (gameOver || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer.symbol;

  if (checkWin(currentPlayer.symbol)) {
    gameOver = true;
    messageElement.textContent = `${currentPlayer.name} (${currentPlayer.symbol}) wins!`;

    renderBoard();

    const winningPattern = winCombo.find(pattern =>
      pattern.every(i => gameBoard[i] === currentPlayer.symbol)
    );

    winningPattern.forEach(i => {
      boardElement.children[i].style.backgroundColor = "#90ee90"; 
    });
    return;
  }

  if (gameBoard.every(cell => cell !== "")) {
    messageElement.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  }

  renderBoard();

  if (!gameOver && currentPlayer.isAI) {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let winningMove = findBestMove(currentPlayer.symbol);
  if (winningMove !== null) {
    makeMove(winningMove);
    return;
  }

  let opponent = currentPlayer === player1 ? player2 : player1;
  let blockMove = findBestMove(opponent.symbol);
  if (blockMove !== null) {
    makeMove(blockMove);
    return;
  }

  let emptyIndices = gameBoard
    .map((cell, idx) => cell === "" ? idx : null)
    .filter(idx => idx !== null);

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex);
}

function findBestMove(symbol) {
  for (let pattern of winCombo) {
    let values = pattern.map(index => gameBoard[index]);
    if (values.filter(v => v === symbol).length === 2 && values.includes("")) {
      return pattern[values.indexOf("")];
    }
  }
  return null;
}``

function checkWin(symbol) {
  return winCombo.some((pattern) =>
    pattern.every((index) => gameBoard[index] === symbol)
  );
}

function resetGame() {
  startGame(vsAI);
}

resetBtn.addEventListener("click", resetGame);
onePlayerBtn.addEventListener("click", () => startGame(true));
twoPlayerBtn.addEventListener("click", () => startGame(false));

messageElement.textContent = "Choose 1 Player or 2 Players to start!";