import './index.scss';
import PropTypes from 'prop-types';
import Round from '../round';

function Button({disable,currentValue,addValue,index}) {
    return (
      <button 
        className="button" 
        disabled={disable} 
        onClick={() => addValue(currentValue,index)}
        >
        <Round status={currentValue} />
      </button>
    );
  }

  Button.propTypes = {
    disabled : PropTypes.bool,
    currentValue: PropTypes.oneOf([0,1,2]),
    addValue: PropTypes.func,
    index: PropTypes.number,
  }
  
  export default Button;