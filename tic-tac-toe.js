function GameBoard() {
 const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
 ];

 const getBoard = () => board;
 
 const markBoard = (row, column, token) => {
  if (board[row][column] != '') return;
  board[row][column] = token;
 }

 const printBoard = () => {
  console.log(board);
 }

 return { getBoard, markBoard, printBoard };
}

function Player(name, token) {
  const getPlayerName = () => name;
  const getPlayerToken = () => token;
  return { getPlayerName, getPlayerToken };
}

function GameController() {
  const playerOne = Player('Player One', 'X');
  const playerTwo = Player('Player Two', 'O');
  const board = GameBoard();

  let currentPlayer = playerOne;

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  const playRound = (row, column) => {
    board.markBoard(row, column, currentPlayer.getPlayerToken());
    changeCurrentPlayer();
  }
}