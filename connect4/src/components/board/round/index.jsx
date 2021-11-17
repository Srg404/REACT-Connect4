import './index.scss';
import PropTypes from 'prop-types';

function Round({status}) {

    const classNameStatus = `status-${status}`;

    return (
      <div className='round'>
        <div className={classNameStatus}>
            <span></span>
        </div>
      </div>
    );
  }

  Round.propTypes = {
    status: PropTypes.oneOf([0,1,2])
  }
  
  export default Round;