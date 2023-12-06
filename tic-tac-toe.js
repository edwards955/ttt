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

 return { getBoard, markBoard };
}

function Player(name, token) {
  const getPlayerName = () => name;
  const getPlayerToken = () => token;
  return { getPlayerName, getPlayerToken };
}

function GameController() {
  const playerOne = Player(prompt('Enter name for Player One: '), 'X');
  const playerTwo = Player(prompt('Enter name for Player Two: '), 'O');
  const board = GameBoard();

  let currentPlayer = playerOne;

  const getCurrentPlayer = () => currentPlayer;

  const changeCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  const playRound = (row, column) => {
    let correctMove = board.markBoard(row, column, currentPlayer.getPlayerToken());
    if (correctMove === false) {
      return 'badMove';
    }
    if (checkForWinner(currentPlayer.getPlayerToken()) === true) {
      return 'win';
    }
    if (checkForTie()) {
      return 'tie';
    }
    changeCurrentPlayer();
    return 'continue';
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

  return { playRound, getCurrentPlayer, getBoard: board.getBoard };
}

function DisplayController() {
  const game = GameController();
  const gameBoardDiv = document.querySelector('.gameBoard');
  const playerTurnDiv = document.querySelector('.turn');

  const updateDisplay = (option = 'continue') => {
    gameBoardDiv.textContent = "";

    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    switch (option) {
      case 'continue':
        playerTurnDiv.textContent = `${currentPlayer.getPlayerName()}'s turn`;
        break;
      case 'badMove':
        playerTurnDiv.textContent = `Space already filled. Try again.`;
        break;
      case 'tie':
        playerTurnDiv.textContent = `It's a tie! Try again next time.`;
        break;
      case 'win':
        playerTurnDiv.textContent = `${currentPlayer.getPlayerName()} wins!`;
        break;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const cellButton = document.createElement('button');
        cellButton.setAttribute('data-row', rowIndex);
        cellButton.setAttribute('data-column', columnIndex);
        cellButton.textContent = `${column}`;
        cellButton.classList.toggle('cellButton');
        gameBoardDiv.appendChild(cellButton);
      })
    })
  }

  const boardClickHandler = (e) => {
    let row = Number(e.target.getAttribute('data-row'));
    let column = Number(e.target.getAttribute('data-column'));
    let option = game.playRound(row, column);
    updateDisplay(option);
  }

  gameBoardDiv.addEventListener('click', boardClickHandler);
  updateDisplay();
  
}

DisplayController();