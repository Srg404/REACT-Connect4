import './index.scss';
import PropTypes from 'prop-types';

function Home() {
    
    return (
      <div className='home'>
        <h1>Connect <span>4</span></h1>
        <button className="btn">Play now</button>
      </div>
    );
  }

  Home.propTypes = {

  }
  
  export default Home;