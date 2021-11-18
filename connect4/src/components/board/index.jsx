import './index.scss';
import { useState } from 'react';
import Row from './row';
import Buttons from './buttons';

function Board() {

  // The Array for the board 
  const [theBoard, updateTheBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  // The Array for show buttons (true = button enable)
  const [theButtons, updateTheButtons] = useState([true, true, true, true, true, true, true]);

  // the current player value 1 (blue) or 2 (red)
  const [currentPlayer, updateCurrentPlayer] = useState(1);

  // the position of the last move
  let lastRound = [];

  // array with coord of each element side by side (if 4 you win)
  let counter = [];

  // This function add coord in a array and return true if array.length is > 3
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

  // This function return a coord(x,y) and his value (0,1,2) to test
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
        youWin(currentPlayer);
        updateTheButtons([false, false, false, false, false, false, false]);
        return 'You win';
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
    checkCoord(lastRound, 'right', 'hori');
    // Check vertical
    checkCoord(lastRound, 'left', 'vert');
    // Check diagonal 1
    checkCoord(lastRound, 'right', 'diag1');
    // Check diagonal 2
    checkCoord(lastRound, 'right', 'diag2');
  }

  const addRound = (currentPlayer, col) => {
    let flag = false;
    const newBoard = theBoard.reverse().map((el, index) => {
      let newLine = el;
      if ((el[col] === 0) && !flag) {
        newLine[col] = currentPlayer;
        flag = true;

        lastRound = [index, col];

        // Desactiver un bouton si une collone est remplie
        if (index === theBoard.length - 1) {
          const newButtons = theButtons;
          newButtons[col] = false;
          updateTheButtons(newButtons);
        };

      }
      return newLine;
    })

    updateTheBoard([...newBoard.reverse()]);    
    updateCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    checkLastRound(lastRound);

    // Game over if all collumns are filled
    if (theButtons.filter((el) => !el).length === theBoard.length + 1) { gameOver() }

  }

  const youWin = (player) => {
    const winner = (player === 1) ? 'Blue' : 'Red';
    window.alert(`${winner} Win !`);
  }

  const gameOver = () => {
    window.alert('GameOver')
  }

  return (
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
  );
}

export default Board;