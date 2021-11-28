import PropTypes from 'prop-types';
import './index.scss';
import Modal from 'react-modal';
import PlayerPicture from '../../player-picture';
import TrophyPicture from '../../trophy-picture';

function ModalInfo({modalIsOpen,currentPlayer,closeModal}) {
        
    const winner = `player-${currentPlayer}`;

    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={250}
        className={`modal__content ${winner}`}
        overlayClassName='modal__overlay'
        ariaHideApp={false}
      >
        <div className="who-win">
          <TrophyPicture player={winner}/>
          <PlayerPicture player={winner} />
        </div>
        <h2>Player {(currentPlayer === 1) ? "Blue" : "Red"} Win !</h2>
        <button onClick={closeModal} className='btn'>Play again</button>
      </Modal>
    );
  }

  ModalInfo.propTypes = {
    
  }
  
  export default ModalInfo;