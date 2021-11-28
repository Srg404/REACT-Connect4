import './index.scss';
import PropTypes from 'prop-types';

function TrophyPicture({ player }) {


  return (
    <div className={`trophy ${player}`}>
      <div className="picture">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

TrophyPicture.propTypes = {
  player: PropTypes.oneOf(['player-1', 'player-2'])
}

export default TrophyPicture;