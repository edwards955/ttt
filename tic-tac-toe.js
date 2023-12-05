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

 return { getBoard, markBoard };
}

function Player(name, token) {
  const getPlayerName = () => name;
  const getPlayerToken = () => token;
  return { getPlayerName, getPlayerToken };
}