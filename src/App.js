/* eslint-disable no-labels */
import europeMap from './assets/map_europe_no_borders.svg';
import { EUROPEAN_COUNTRIES } from './constants';
import './App.css';
import { PuzzlePiece } from './components/PuzzlePiece/PuzzlePiece.js';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard.js';
import { ResultBox } from './components/ResultBox/ResultBox.js';
import { Map } from './components/Map/Map.js';
import { useState, useRef, useEffect } from 'react';


let shuffledList = Array.from(EUROPEAN_COUNTRIES);
for (let i = shuffledList.length - 1; i > 0; i--) {
  let random = Math.floor(Math.random() * (1 + i));
  [shuffledList[i], shuffledList[random]] = [shuffledList[random], shuffledList[i]]
}

function App() {

  let [winScore, setWinScore] = useState(0);
  let [loseScore, setLoseScore] = useState(0);
  let [gameEnd, setGameEnd] = useState(false);
  let [bestResultData, setBestresultData] = useState(null);
  let [index, setIndex] = useState(1);
  const MapRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080')
      .then((response) => response.text())
      .then((data) => setBestresultData(data))
  }, []);

  function endGame() {
    console.log("END GAME")
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
        <div className='best_result'>The best result ever scored in this game is <span>{bestResultData}%</span></div>
        {shuffledList.slice(0, index).map((country) => <PuzzlePiece
          key={country.name}
          country={country}
          onTurnEnd={() => {
            if (shuffledList.length > index) {
              setIndex(index + 1)
            } else {
              endGame();
            }
          }
          }
          win={() => setWinScore(winScore + 1)}
          lose={() => setLoseScore(loseScore - 1)}
          myRef={MapRef}
        />)}
        {gameEnd &&
          <ResultBox
            result={calcEndResult()}
          />
        }
      </div>
    </div>

  );
}

export default App;

