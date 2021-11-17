import './index.scss';
import PropTypes from 'prop-types';
import Round from '../round';

function Button() {
    
    return (
      <button className="button">
        <Round status={0}/>
      </button>
    );
  }

  Button.propTypes = {

  }
  
  export default Button;