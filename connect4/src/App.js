import './App.scss';
import { useState } from 'react';
import PlayerCard from './components/player-card';
import Board from './components/board';
import Home from './components/home';

function App() {

  const [start, setStart] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const updatePlayer = (val) => {
    setCurrentPlayer(val);
  }

  if (start) {
    return (
      <div className="app" id="app">
        <div className="container">
          <PlayerCard 
            player="player-1"
            active={(currentPlayer === 1) ? true : false}
          ></PlayerCard>
          <div className="content">
            <Board updatePlayer={updatePlayer}/>
          </div>
          <PlayerCard 
            player="player-2"
            active={(currentPlayer === 2) ? true : false}  
          ></PlayerCard>
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
