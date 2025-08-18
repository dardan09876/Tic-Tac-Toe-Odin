let gameBoard = ["", "", "", "", "", "", "", "", ""];

function printGameBoard() {
  console.log(`
   ${gameBoard[0] || "1"} | ${gameBoard[1] || "2"} | ${gameBoard[2] || "3"}
   --+---+--
   ${gameBoard[3] || "4"} | ${gameBoard[4] || "5"} | ${gameBoard[5] || "6"}
   --+---+--
   ${gameBoard[6] || "7"} | ${gameBoard[7] || "8"} | ${gameBoard[8] || "9"}
  `);
}

printGameBoard();
