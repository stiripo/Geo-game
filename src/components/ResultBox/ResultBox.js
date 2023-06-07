import styles from './ResultBox.module.css';

export function ResultBox(props) {
    return (
        <div className={styles.result_box}>
            Your result is:
            <div className={styles.result_number}>{props.result}</div>
        </div>
    )

}