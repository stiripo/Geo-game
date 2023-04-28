export function ScoreBoard(props) {

  return (
    <div className="score-section">
      <div className="score-title">Your score:</div>
      <div className="score-numbers">
        <div className="win">{props.win}</div>
        <div className="lose">{props.lose}</div>
      </div>
    </div>
  )
}