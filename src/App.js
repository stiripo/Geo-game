import europeMap from './assets/europe-map_clipped.svg';
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
  const MapRef = useRef(null);

  function addNewPuzzlePiece() {
    if (EUROPEAN_COUNTRIES.length > 0) {
      let newPuzzlePiece = pickRandomCountry();
      let allPuzzlePieces = [...puzzlePieces, newPuzzlePiece];
      setPuzzlePieces(allPuzzlePieces);
    }
  }

  return (
    <div className="container">
      <div className="left-side">
        <img
          ref={MapRef}
          src={europeMap}
          className='europe'
          alt='europe map' />
      </div>
      <div className="right-side">
        <h1 className="big-heading">European Puzzle</h1>
        {puzzlePieces.map((country) => <PuzzlePiece
          country={country}
          onTurnEnd={addNewPuzzlePiece}
          win={() => setWinScore(winScore + 1)}
          lose={() => setLoseScore(loseScore - 1)}
          myRef={MapRef}
        />)}
        <ScoreBoard
          win={winScore}
          lose={loseScore}
        />
      </div>
    </div>
  );
}

export default App;
