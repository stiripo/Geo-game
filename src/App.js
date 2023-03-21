import europeMap from './assets/europe-map_clipped.svg';
import './App.css';
import { CurrentCountry } from './components/CurrentCountry';


function App() {
  return (
    <div className="container">
    <div className="left-side">
      <img src={europeMap} className='europe' alt='europe map'/>
    </div>
    <div className="right-side">
        <h1 className="big-heading">European Puzzle</h1>
        
       <CurrentCountry/>
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
