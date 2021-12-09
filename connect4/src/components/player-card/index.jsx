import PlayerPicture from '../player-picture';
import PropTypes from 'prop-types';
import './index.scss';

function PlayerCard({player,active}) {

    const playerIs = (player === "player-1") ? "blue" : "red";
    const activeClass = (active) ? "active" : "";
    return (
      <div className={`player-card ${player} ${activeClass}`}>
        <PlayerPicture player={player}/>
        <h2>{playerIs}</h2>
      </div>
    );
  }

  PlayerCard.propTypes = {
    player: PropTypes.oneOf(['player-1', 'player-2']),
    active: PropTypes.bool
  }
  
  export default PlayerCard;