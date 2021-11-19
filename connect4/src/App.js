import './App.scss';
import { useState } from 'react';
import PlayerCard from './components/player-card';
import Board from './components/board';
import Home from './components/home';

function App() {

  const [start, setStart] = useState(false);

  if (start) {
    return (
      <div className="app" id="app">      
        <div className="container">
          <PlayerCard player="player-1"></PlayerCard>
          <div className="content">
            <Board />
          </div>
          <PlayerCard player="player-2"></PlayerCard>
        </div>
        
      </div>
    );
  }else{
    return (
      <div className="app" id="app">      
        <div className="container">
          <Home setStart={setStart}/>
        </div>
      </div>
    );
  }

  
}

export default App;
