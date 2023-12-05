function GameBoard() {
 const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
 ];

 const getBoard = () => board;
 
 const markBoard = (row, column, token) => {
  if (board[row][column] !== '') {
    return false;
  }
  board[row][column] = token;
  return true;
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

  const getCurrentPlayer = () => currentPlayer;

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  const printNewRound = () => {
    board.printBoard();
    console.log(`${currentPlayer.getPlayerName()}'s turn`)
  }

  const playRound = (row, column) => {
    let correctMove = board.markBoard(row, column, currentPlayer.getPlayerToken());
    if (correctMove === false) {
      console.log('Space already filled. Try again.');
      printNewRound();
      return;
    }
    if (checkForWinner(currentPlayer.getPlayerToken()) === true) {
      console.log(`${currentPlayer.getPlayerName()} wins!`);
      return;
    }
    if (checkForTie()) {
      console.log(`It's a tie! Try again next time.`);
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

  const checkForTie = () => {
    let currentBoard = board.getBoard().flat();
    if (currentBoard.every(token => token !== '')) {
      return true;
    }
    return false;
  }

  printNewRound();

  return { playRound, getCurrentPlayer, getBoard: board.getBoard };
}

function DisplayController() {
  const game = GameController();
  const gameBoardDiv = document.querySelector('.gameBoard');
  const playerTurnDiv = document.querySelector('.turn');

  const updateDisplay = () => {
    gameBoardDiv.textContent = "";

    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    playerTurnDiv.textContent = `${currentPlayer.getPlayerName()}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const cellButton = document.createElement('button');
        cellButton.setAttribute('data-row', rowIndex);
        cellButton.setAttribute('data-column', columnIndex);
        cellButton.textContent = column;
        cellButton.classList.toggle('cellButton');
        gameBoardDiv.appendChild(cellButton);
      })
    })

  }

  updateDisplay();
  
}

DisplayController();