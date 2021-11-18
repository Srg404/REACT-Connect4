import './index.scss';
import {useState} from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import Buttons from './buttons';

function Board() {
    
    const [myTable, updateMyTable] = useState([
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ]);
    const [btDisable, updateBtDisable] = useState([false,false,false,false,false,false,false]);
    const [currentValue, updateCurrentValue] = useState(1);

    let lastMove = [];
    let counter = [];

  // This function increment counter and return true or false
  const areYouWin = (element) => {
    console.log('Are you Win ?');
    (element) && counter.push([element[0],element[1]]);
    return (counter.length >= 3) ? true : false
  } 

  const thisPosExist = (array,pos) => {
    if ((pos[0] === -1) || (pos[1] === -1)) return false;
    if ((pos[0] > array.length) || (pos[1] > array[pos[0]].length)) return false
    return true
  } 

  // This function return a value to test and the position of this value
  const toTest = (move,direction,type) => {
    console.log('move : ',move);
    let nextMove = [];
    switch (type) {
      case 'vert':
        nextMove = (direction === 'right') ? [move[0]+1,move[1]] : [move[0]-1,move[1]];
        break;
      case 'hori':
        nextMove = (direction === 'right') ? [move[0],move[1]+1] : [move[0],move[1]-1];
        break;
      case 'diag1':
        nextMove = (direction === 'right') ? [move[0]+1,move[1]+1] : [move[0]-1,move[1]-1];
        break;
      case 'diag2':
        nextMove = (direction === 'right') ? [move[0]+1,move[1]-1] : [move[0]-1,move[1]+1];
        break;
      default:
        console.log(`Sorry, only this values are authorized 'vert','hori','diag1','diag2'`);
    }

    // function de test l'existance de la position dans le tableau (return true or false)
    if (thisPosExist(myTable,[nextMove[0],nextMove[1]])) {
      return {
        value : myTable[nextMove[0]][nextMove[1]],
        pos: nextMove
      }
    }else {
      return {
        value : null,
        pos: null
      }
    }
    
  }

    const checkMove = (move,direction,type) => {
      console.log(type);
      const valueToTest = toTest(move,direction,type);
      console.log(valueToTest);
    // une fonction qui s'auto appelle (valeur a tester [Y,X], Direction [left,right], type de ligne[vert,hori,diag1,diag2])
      //  - tester si la case est de la bonne couleur alors ajouter au tableau de comptage (counter) sinon on arrete (reset counter) ou on change de sens (direction)
      //    tester si on est au bout du tableau et si oui changer de sens (direction) ou arrter (reset counter)
      //  - si le tableau de comptage est rempli vous avez gagner sinon on relance la fonction avec une incrementation
  
      if (valueToTest.value === currentValue) {
        if (areYouWin([valueToTest.pos[0],valueToTest.pos[1]])) {
          window.alert('You Win !');
          updateBtDisable([true,true,true,true,true,true,true]);
          return 'You win';
        } else{
          checkMove([valueToTest.pos[0],valueToTest.pos[1]],direction,type);
        }
      } else{ 
        if (direction === 'right') {
          direction = 'left';
          checkMove([lastMove[0],lastMove[1]],direction,type);
        } else {
          // Reset counter
          counter = []
        }
      }
    }

    const checkLastMove = (lastMove) => {
      console.log('lastMove => ',lastMove);
      // Check horizontal
      checkMove(lastMove,'right','hori');
      // Check vertical
      checkMove(lastMove,'left','vert');
      // Check diagonal 1
      checkMove(lastMove,'right','diag1');
      // Check diagonal 2
      checkMove(lastMove,'right','diag2');
    }

    const addValue = (val,col) => {
      let flag = false;
      const newTable = myTable.reverse().map((el,index) => {
        let newLine = el;
        if ((el[col] === 0) && !flag) {
          newLine[col] = val;
          flag = true;
  
          lastMove = [index,col];
  
          // Desactiver un bouton si une collone est remplie
          if (index === myTable.length - 1) { 
            const newBtDisable = btDisable;
            newBtDisable[col] = true;
            updateBtDisable(newBtDisable);
          };
  
        }
        return newLine;
      })
  
      updateMyTable([...newTable.reverse()]);
      updateCurrentValue(currentValue === 1 ? 2 : 1);
  
      checkLastMove(lastMove);
  
      // fin du jeux si toutes les collone sont remplie
      if ( btDisable.filter((el) => el).length === myTable.length +1 ) { window.alert('GameOver') }
  
    }

    return (
      <div className='board'>
        <div className="buttons">
          <Buttons 
            disableList={btDisable} 
            currentValue={currentValue}
            addValue={addValue}
          />
        </div>
        <div className="board-table">
          {myTable.map(
            (row,index) => (
              <Row key={index} row={row}/>
            )
          )}
        </div>
      </div>
    );
  }

  Board.propTypes = {

  }
  
  export default Board;