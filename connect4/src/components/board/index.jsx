import './index.scss';
import PropTypes from 'prop-types';
import Row from './row';
import Buttons from './buttons';

function Board() {
    
    return (
      <div className='board'>
        <div className="buttons">
          <Buttons />
        </div>
        <div className="board-table">
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
          <Row />
        </div>
      </div>
    );
  }

  Board.propTypes = {

  }
  
  export default Board;