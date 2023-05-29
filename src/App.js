import europeMap from './assets/map_europe_no_borders.svg';
import { EUROPEAN_COUNTRIES } from './constants';

import './App.css';

import { PuzzlePiece } from './components/PuzzlePiece';
import { ScoreBoard } from './components/ScoreBoard';
import { useState } from 'react';
import { useRef } from 'react';


function pickRandomCountry() {
  let index = Math.floor(Math.random() * EUROPEAN_COUNTRIES.length);
  let country = EUROPEAN_COUNTRIES[index];
  EUROPEAN_COUNTRIES.splice(index, 1);
  return country;
}

const initialState = pickRandomCountry();

function App() {

  let [winScore, setWinScore] = useState(0);
  let [loseScore, setLoseScore] = useState(0);
  let [puzzlePieces, setPuzzlePieces] = useState([initialState]);
  let [gameEnd, setGameEnd] = useState(false);
  const MapRef = useRef(null);

  function addNewPuzzlePiece() {
    if (EUROPEAN_COUNTRIES.length > 0) {
      let newPuzzlePiece = pickRandomCountry();
      let allPuzzlePieces = [...puzzlePieces, newPuzzlePiece];
      setPuzzlePieces(allPuzzlePieces);

    }
  }

  function endGame() {
    setTimeout(() => setGameEnd(true), 2000);
  }

  return (
    <div className='game-field'>
      <div className="map-container">
        <img
          ref={MapRef}
          src={europeMap}
          className='map'
          alt='europe map' />
      </div>
      <div className="game-info">
        <p className="big-heading">EUROPE</p>
        <ScoreBoard
          win={winScore}
          lose={loseScore}
        />
        {puzzlePieces.map((country) => <PuzzlePiece
          key={country.name}
          country={country}
          onTurnEnd={EUROPEAN_COUNTRIES.length > 0 ? addNewPuzzlePiece : endGame}
          win={() => setWinScore(winScore + 1)}
          lose={() => setLoseScore(loseScore - 1)}
          myRef={MapRef}
        />)}
        <div className={gameEnd ? 'result-screen-shown' : 'result-screen-hidden'}>
          Your result is:
          <div className='result-percent'>{Math.round(winScore * 100 / (winScore - loseScore))}%</div>
        </div>
      </div>
    </div>

  );
}

export default App;
