/* eslint-disable no-labels */
import europeMap from './assets/map_europe_no_borders.svg';
import { EUROPEAN_COUNTRIES } from './constants';
import './App.css';
import { PuzzlePiece } from './components/PuzzlePiece/PuzzlePiece.js';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard.js';
import { ResultBox } from './components/ResultBox/ResultBox.js';
import { Map } from './components/Map/Map.js';
import { useState, useRef, useEffect } from 'react';

//TODO: pickRandomCountry function is not pure as it mutates the countries list
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
  let [bestResultData, setBestresultData] = useState(null);
  const MapRef = useRef(null);

  //TODO: useEffect fires twice in dev mode;
  //TODO: do I need useEffect?

  useEffect(() => {
    fetch('http://localhost:8080')
      .then((response) => response.text())
      .then((data) => setBestresultData(data))
  }, []);

  useEffect(() => {
    if (gameEnd) {
      let endResult = calcEndResult();
      fetch('http://localhost:8080', {
        method: 'POST',
        body: JSON.stringify(endResult),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(`New result ${endResult} has been sent to server`)
        })
    }
  });

  function addNewPuzzlePiece() {
    if (EUROPEAN_COUNTRIES.length > 0) {
      let newPuzzlePiece = pickRandomCountry();
      let allPuzzlePieces = [...puzzlePieces, newPuzzlePiece];
      setPuzzlePieces(allPuzzlePieces);
    }
  }

  function endGame() {
    setTimeout(() => {
      setGameEnd(true);
    }, 2000);
  }

  function calcEndResult() {
    return (Math.round(winScore * 100 / (winScore - loseScore)));
  }

  return (
    <div className='game_field'>
      <Map
        src={europeMap}
        ref={MapRef}
      />
      <div className="game_info">
        <p className="big_heading">EUROPE</p>
        <ScoreBoard
          win={winScore}
          lose={loseScore}
        />
        <div>The best result ever scored in this game is {bestResultData}%</div>
        {puzzlePieces.map((country) => <PuzzlePiece
          key={country.name}
          country={country}
          onTurnEnd={EUROPEAN_COUNTRIES.length > 0 ? addNewPuzzlePiece : endGame}
          win={() => setWinScore(winScore + 1)}
          lose={() => setLoseScore(loseScore - 1)}
          myRef={MapRef}
        />)}
        {gameEnd &&
          <ResultBox
            result={calcEndResult() + '%'}
          />
        }
      </div>
    </div>

  );
}

export default App;

