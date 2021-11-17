import './App.scss';
import PlayerCard from './components/player-card';
import Home from './components/home';
import Board from './components/board';

function App() {
  return (
    <div className="app" id="app">
      <div className="container">
        <PlayerCard player="player-1"></PlayerCard>
        <div className="content">
          {/* <Home /> */}
          <Board />
        </div>
        <PlayerCard player="player-2"></PlayerCard>
      </div>
      

    </div>
  );
}

export default App;
