import './index.scss';
import PropTypes from 'prop-types';
import Round from '../round';

function Row({row}) {
    return (
      <div className='row'>
        {row.map(
            (status,index) => (
              <Round key={index} status={status} />
            )
        )}
      </div>
    );
  }

  Row.propTypes = {
    row: PropTypes.array,
  }
  
  export default Row;