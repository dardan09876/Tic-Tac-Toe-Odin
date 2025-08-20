const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
let currentPlayer = player1;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
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

function createPlayer(name, symbol) {
  return { name, symbol };
}

function printGameBoard() {
  boardElement.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    if (cell !== "") {
      cellDiv.textContent = cell;
      cellDiv.classList.add("taken");
    }
    cellDiv.addEventListener("click", () => choice(index));
    boardElement.appendChild(cellDiv);
  });
}

function choice(index) {
  if (gameOver || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer.symbol;

  if (checkWin(currentPlayer.symbol)) {
    messageElement.textContent = `${currentPlayer.name} (${currentPlayer.symbol}) wins!`;
    gameOver = true;
  } else if (gameBoard.every((cell) => cell !== "")) {
    messageElement.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  }

  printGameBoard();
}

function checkWin(symbol) {
  return winCombo.some((pattern) =>
    pattern.every((index) => gameBoard[index] === symbol)
  );
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = player1;
  gameOver = false;
  messageElement.textContent = `${currentPlayer.name}'s turn (${currentPlayer.symbol})`;
  printGameBoard();
}

resetBtn.addEventListener("click", resetGame);

printGameBoard();
