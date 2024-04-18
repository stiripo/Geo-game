import styles from './ScoreBoard.module.css';

export function ScoreBoard(props) {

  return (
    <div className={styles.score_section}>
      <div className={styles.score_title}>Your score:</div>
      <div className={styles.score_numbers}>
        <div className={styles.win}>{props.win}</div>
        <div className={styles.lose}>{props.lose}</div>
      </div>
    </div>
  )
}