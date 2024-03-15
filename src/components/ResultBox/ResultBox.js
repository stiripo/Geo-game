import { useEffect } from 'react';
import styles from './ResultBox.module.css';

export function ResultBox(props) {

  useEffect(() => {
    fetch('http://localhost:8080', {
      method: 'POST',
      body: JSON.stringify(props.result),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`New result ${props.result} has been sent to server`)
      })
  }, []);

  return (
    <div className={styles.result_box}>
      Your result is:
      <div className={styles.result_number}>{props.result}%</div>
    </div>
  )

}