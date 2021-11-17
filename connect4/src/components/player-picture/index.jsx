import './index.scss';
import PropTypes from 'prop-types';

function PlayerPicture({player}) {
    
    const theClassName = `player-picture ${player}`;

    return (
      <div className={theClassName}>
        <div className="content">
        <div className="head">
          <div className="hairs"></div>
          <div className="ear-left"></div>
          <div className="ear-right"></div>
          <div className="nose"></div>
          <div className="mouth"></div>
          <div className="eye-left"></div>
          <div className="eye-right"></div>
        </div>
        </div>
      </div>
    );
  }

  PlayerPicture.propTypes = {
    player: PropTypes.oneOf(['player-1', 'player-2'])
  }
  
  export default PlayerPicture;