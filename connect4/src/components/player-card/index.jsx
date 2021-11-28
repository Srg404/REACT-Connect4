import PlayerPicture from '../player-picture';
import PropTypes from 'prop-types';
import './index.scss';

function PlayerCard({player}) {
        
    const playerIs = (player === "player-1") ? "blue" : "red"
    return (
      <div className={`player-card ${player}`}>
        <PlayerPicture player={player}/>
        <h2>{playerIs}</h2>
      </div>
    );
  }

  PlayerCard.propTypes = {
    player: PropTypes.oneOf(['player-1', 'player-2'])
  }
  
  export default PlayerCard;