export function ResultBox(props) {
    return (
        <div className='result-box'>
            Your result is:
            <div className='result-percent'>{props.result}</div>
        </div>
    )

}