import './App.scss';
import PlayerCard from './components/player-card';
import Board from './components/board';
import Home from './components/home';

function App() {

  return (
    <div className="app" id="app">
      <div className="container">
        <Home />
      </div>
      <div className="container">
        <PlayerCard player="player-1"></PlayerCard>
        <div className="content">
          <Board />
        </div>
        <PlayerCard player="player-2"></PlayerCard>
      </div>
      
    </div>
  );
}

export default App;
