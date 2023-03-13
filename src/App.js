import { Map } from './assets/map.js';
import spain from './assets/spain.svg';
import './App.css';

function App() {
  return (
    <div className="container">
    <div className="left-side">
      <Map/>
    </div>
    <div className="right-side">
        <h1 className="big-heading">European Puzzle</h1>
        <div className="country-name"></div>
        <div className="country-shape">
          <img src={spain} alt='country shape'/>
          {/* <img src='./assets/spain.svg' alt='country shape'/> */}
        </div>
        <div className="score-section">
            <p>Your score:</p>
            <div className="score-board">
                <div className="win">0</div>
                <div className="lose">0</div>
            </div>
        </div>
    </div>
</div>
  );
}

export default App;
