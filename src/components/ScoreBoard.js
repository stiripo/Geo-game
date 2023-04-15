export function ScoreBoard(props) {

    return (
        <div className="score-section">
        <p>Your score:</p>
        <div className="score-board">
          <div className="win">{props.win}</div>
          <div className="lose">{props.lose}</div>
        </div>
      </div>
    )
}