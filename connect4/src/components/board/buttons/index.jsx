import './index.scss';
import PropTypes from 'prop-types';
import Button from '../button';

function Buttons({disableList,currentPlayer,addRound}) {
    return (
      <div className='row'>
        {disableList.map(
            (disable,index) => (
              <Button 
                key={index} 
                currentPlayer={currentPlayer} 
                disable={disable}
                addRound={addRound}
                index={index}
                />
            )
        )}
      </div>
    );
  }

  Buttons.defaultProps = {
    // addRound: () => {}
  }

  Buttons.propTypes = {
    disableList: PropTypes.array,
    currentPlayer: PropTypes.oneOf([1,2]),
    addRound: PropTypes.func,
  }
  
  export default Buttons;