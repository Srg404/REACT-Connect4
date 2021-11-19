import './index.scss';
import { useState } from 'react';
import Row from './row';
import Buttons from './buttons';
import Modal from 'react-modal';
import PlayerPicture from '../player-picture';

function Board() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // The Array for the board 
  const [theBoard, setTheBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  // The Array for enable/disable buttons (true = enable)
  const [theButtons, setTheButtons] = useState([true, true, true, true, true, true, true]);

  // the current player value 1 (blue) or 2 (red)
  const [currentPlayer, setCurrentPlayer] = useState(1);

  // the position of the last move
  let lastRound = [];

  // array with coord of each element side by side around lastRound (if 3 you win)
  let counter = [];

  // This function add coord in a [counter] and return true if this [counter].length is > 3
  const areYouWin = (element) => {
    (element) && counter.push([element[0], element[1]]);
    return (counter.length >= 3) ? true : false
  }

  // This function test if a coord exist in an array
  const thisCoordExist = (array, coord) => {
    if ((coord[0] === -1) || (coord[1] === -1)) return false;
    if (array[coord[0]] === undefined) return false;
    if ((coord[0] > array.length) || (coord[1] > array[coord[0]].length)) return false
    return true
  }

  // This function return a coord(x,y) and a value (0,1,2) for test
  const coordToTest = (coord, direction, type) => {
    let nextCoord = [];
    switch (type) {
      case 'vert':
        nextCoord = (direction === 'right') ? [coord[0] + 1, coord[1]] : [coord[0] - 1, coord[1]];
        break;
      case 'hori':
        nextCoord = (direction === 'right') ? [coord[0], coord[1] + 1] : [coord[0], coord[1] - 1];
        break;
      case 'diag1':
        nextCoord = (direction === 'right') ? [coord[0] + 1, coord[1] + 1] : [coord[0] - 1, coord[1] - 1];
        break;
      case 'diag2':
        nextCoord = (direction === 'right') ? [coord[0] + 1, coord[1] - 1] : [coord[0] - 1, coord[1] + 1];
        break;
      default:
        console.info(`Sorry, the function "coordToTest" authorize only this values 'vert','hori','diag1','diag2'`);
    }

    if (thisCoordExist(theBoard, [nextCoord[0], nextCoord[1]])) {
      return {
        value: theBoard[nextCoord[0]][nextCoord[1]],
        coord: nextCoord
      }
    } else {
      return {
        value: null,
        coord: null
      }
    }

  }

  // This function test if they are a line of 4 same value (1 or 2) around the coord
  const checkCoord = (coord, direction, type) => {
    const coordToCheck = coordToTest(coord, direction, type);
    if (coordToCheck.value === currentPlayer) {
      if (areYouWin([coordToCheck.coord[0], coordToCheck.coord[1]])) {
        setTheButtons([false, false, false, false, false, false, false]);
        youWin(currentPlayer);
        return false;
      } else {
        checkCoord([coordToCheck.coord[0], coordToCheck.coord[1]], direction, type);
      }
    } else {
      if (direction === 'right') {
        direction = 'left';
        checkCoord([lastRound[0], lastRound[1]], direction, type);
      } else {
        // Reset counter
        counter = []
      }
    }
  }

  const checkLastRound = (lastRound) => {
    // Check horizontal
    (counter.length < 3) && checkCoord(lastRound, 'right', 'hori');
    // Check vertical
    (counter.length < 3) && checkCoord(lastRound, 'left', 'vert');
    // Check diagonal 1
    (counter.length < 3) && checkCoord(lastRound, 'right', 'diag1');
    // Check diagonal 2
    (counter.length < 3) && checkCoord(lastRound, 'right', 'diag2');
  }

  const addRound = (currentPlayer, col) => {
    let flag = false;
    const newBoard = theBoard.reverse().map((el, index) => {
      let newLine = el;
      if ((el[col] === 0) && !flag) {
        newLine[col] = currentPlayer;
        flag = true;
        lastRound = [index, col];
        // disabled button if column is filled
        if (index === theBoard.length - 1) {
          const newButtons = theButtons;
          newButtons[col] = false;
          setTheButtons(newButtons);
        };

      }
      return newLine;
    })

    setTheBoard([...newBoard.reverse()]);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    checkLastRound(lastRound);

    // Game over if all collumns are filled
    if (theButtons.filter((el) => !el).length === theBoard.length + 1) { gameOver() }

  }

  const resetGame = () => {
    setTheBoard([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    setTheButtons([true, true, true, true, true, true, true]);
    setCurrentPlayer(1);
    lastRound = [];
    counter = [];
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    resetGame();
 
  }

  const youWin = (player) => {
    // const winner = (player === 1) ? 'Blue' : 'Red';
    const status = (player === 1) ? 3 : 4;
    const winBoard = theBoard;

    winBoard[lastRound[0]][lastRound[1]] = status;
    counter.forEach((el) => {
      winBoard[el[0]][el[1]] = status;
    });
    setTheBoard([...winBoard.reverse()]);

    setCurrentPlayer(player);

    setTimeout(() => {
      openModal();
    }, 1000);
    
  }

  const gameOver = () => {
    window.alert('GameOver')
  }

  return (
    <>
      <div className='board'>
        <div className="buttons">
          <Buttons
            disableList={theButtons}
            currentPlayer={currentPlayer}
            addRound={addRound}
          />
        </div>
        <div className="board-table">
          {theBoard.map(
            (row, index) => (
              <Row key={index} row={row} />
            )
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={250}
        className='modal__content'
        overlayClassName='modal__overlay'
      >
        <PlayerPicture player={`player-${currentPlayer}`} />
        <h2>Player {(currentPlayer === 1) ? "Blue" : "Red"} Win !</h2>
        <button onClick={closeModal} className='btn'>Play again</button>
      </Modal>
    </>
  );
}

export default Board;