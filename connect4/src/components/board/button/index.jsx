import './index.scss';
import PropTypes from 'prop-types';
import Round from '../round';

function Button({disable,currentPlayer,addRound,index}) {
    return (
      <button 
        className="button" 
        disabled={!disable} 
        onClick={() => addRound(currentPlayer,index)}
        >
        <Round status={currentPlayer} />
      </button>
    );
  }

  Button.defaultProps = {
    // addRound: () => {}
  }

  Button.propTypes = {
    disabled : PropTypes.bool,
    currentPlayer: PropTypes.oneOf([1,2]),
    addRound: PropTypes.func,
    index: PropTypes.number,
  }
  
  export default Button;