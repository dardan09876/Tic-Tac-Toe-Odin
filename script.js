let gameBoard = ["", "", "", "", "", "", "", "", ""];
const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
let currentPlayer = player1;

function createPlayer(name, symbol) {
  return {
    name: name,
    symbol: symbol
  };
}

function printGameBoard() {
  console.log(`
   ${gameBoard[0] || "1"} | ${gameBoard[1] || "2"} | ${gameBoard[2] || "3"}
  ---+---+---
   ${gameBoard[3] || "4"} | ${gameBoard[4] || "5"} | ${gameBoard[5] || "6"}
  ---+---+---
   ${gameBoard[6] || "7"} | ${gameBoard[7] || "8"} | ${gameBoard[8] || "9"}
  `);
}

function winGame(symbol) {
    const winCombo = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winCombo.some(function(pattern) {
    return pattern.every(function(index) {
      return gameBoard[index] === symbol;
    });
  });
}

console.log(player1);
console.log(player2);
printGameBoard();
console.log("Tic Tac Toe!");
