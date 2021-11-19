import './index.scss';

function Home({updateStart}) {
    
    return (
      <div className='home'>
        <h1>Connect <span>4</span></h1>
        <button className="btn" onClick={() => updateStart(true)}>Play now</button>
      </div>
    );
  }
  
  export default Home;