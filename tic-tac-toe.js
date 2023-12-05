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

  const printNewRound = () => {
    board.printBoard();
    console.log(`${currentPlayer.getPlayerName()}'s turn`)
  }

  const playRound = (row, column) => {
    board.markBoard(row, column, currentPlayer.getPlayerToken());
    if (checkForWinner(currentPlayer.getPlayerToken()) === true) {
      console.log(`${currentPlayer.getPlayerName()} wins!`);
      return;
    }
    changeCurrentPlayer();
    printNewRound();
  }

  const checkForWinner = token => {
    if (board.getBoard()[0][0] === token && board.getBoard()[0][1] === token && board.getBoard()[0][2] === token) {
      return true;
    }
    else if (board.getBoard()[1][0] === token && board.getBoard()[1][1] === token && board.getBoard()[1][2] === token) {
      return true;
    }
    else if (board.getBoard()[2][0] === token && board.getBoard()[2][1] === token && board.getBoard()[2][2] === token) {
      return true;
    }
    else if (board.getBoard()[0][0] === token && board.getBoard()[1][0] === token && board.getBoard()[2][0] === token) {
      return true;
    }
    else if (board.getBoard()[0][1] === token && board.getBoard()[1][1] === token && board.getBoard()[2][1] === token) {
      return true;
    }
    else if (board.getBoard()[0][2] === token && board.getBoard()[1][2] === token && board.getBoard()[2][2] === token) {
      return true;
    }
    else if (board.getBoard()[0][0] === token && board.getBoard()[1][1] === token && board.getBoard()[2][2] === token) {
      return true;
    }
    else if (board.getBoard()[0][2] === token && board.getBoard()[1][1] === token && board.getBoard()[2][0] === token) {
      return true;
    } else {
      return false;
    }
  }

  printNewRound();

  return { playRound };
}

const myGame = GameController();