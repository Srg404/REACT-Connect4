import './index.scss';
import PropTypes from 'prop-types';
import Round from '../round';

function Row() {
    
    return (
      <div className='row'>
        <Round status={0} />
        <Round status={0} />
        <Round status={1} />
        <Round status={2} />
        <Round status={0} />
        <Round status={0} />
        <Round status={0} />
      </div>
    );
  }

  Row.propTypes = {

  }
  
  export default Row;