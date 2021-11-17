import './index.scss';
import PropTypes from 'prop-types';
import Button from '../button';

function Row() {
    
    return (
      <div className='row'>
        <Button status={0} />
        <Button status={0} />
        <Button status={1} />
        <Button status={2} />
        <Button status={0} />
        <Button status={0} />
        <Button status={0} />
      </div>
    );
  }

  Row.propTypes = {

  }
  
  export default Row;