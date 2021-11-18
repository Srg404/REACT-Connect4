import './index.scss';
import PropTypes from 'prop-types';
import Button from '../button';

function Buttons({disableList,currentValue,addValue}) {
    return (
      <div className='row'>
        {disableList.map(
            (disable,index) => (
              <Button 
                key={index} 
                currentValue={currentValue} 
                disable={disable}
                addValue={addValue}
                index={index}
                />
            )
        )}
      </div>
    );
  }

  Buttons.propTypes = {
    disableList: PropTypes.array,
    currentValue: PropTypes.oneOf([0,1,2]),
    addValue: PropTypes.func,
  }
  
  export default Buttons;