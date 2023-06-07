import { ERROR_MARGIN } from '../../constants';
import Draggable from 'react-draggable';
import { useState, useRef } from 'react';
import styles from './PuzzlePiece.module.css';


export function PuzzlePiece(props) {

    let [attempt, setAttempt] = useState(0);
    let [turnEnd, setTurnEnd] = useState(false);
    let [turnResult, setTurnResult] = useState(null);
    let [readyToSnap, setReadyToSnap] = useState(false);
    let [countryTop, setCountryTop] = useState('');
    let [countryLeft, setCountryLeft] = useState('');
    const nodeRef = useRef(null);

    function handleDragStart(event) {
        event.preventDefault();
    }

    function handleDragStop(event) {
        event.preventDefault();
        const mapY = props.myRef.current.getBoundingClientRect().top + window.pageYOffset;
        const mapX = props.myRef.current.getBoundingClientRect().left + window.pageXOffset;
        const countryX = event.target.getBoundingClientRect().left + window.pageXOffset;
        const countryY = event.target.getBoundingClientRect().top + window.pageYOffset;

        console.log(`Left: ${countryX}, Top: ${countryY}`);
        const difX = Math.abs(countryX - mapX - props.country.left);
        const difY = Math.abs(countryY - mapY - props.country.top);
        const isCloseEnough = Math.sqrt(difX ** 2 + difY ** 2) < ERROR_MARGIN;
        let currentAttempt = attempt + 1;
        setAttempt(currentAttempt);
        setReadyToSnap(() => {
            return isCloseEnough || currentAttempt === 3;
        });
        // if (isCloseEnough || currentAttempt === 3) {
        //     props.onTurnEnd();
        // }
        if (!isCloseEnough && currentAttempt === 3) {
            setTurnResult('lose');
            props.lose();
        }
        if (isCloseEnough) {
            setTurnResult('win');
            props.win();
        }
        if (isCloseEnough || currentAttempt === 3) {
            setCountryLeft(countryX);
            setCountryTop(countryY);
            setTimeout(() => {
                setTurnEnd(true);
                props.onTurnEnd();
            }, 500)
        };
    };

    function setCountryImagePosition() {
        if (turnEnd) {
            return {
                position: 'absolute',
                top: props.country.top + 'px',
                left: props.country.left + 'px',
                transition: 'all 0.2s ease-in',
            }
        };
        if (readyToSnap) {
            return {
                position: 'absolute',
                top: countryTop + 'px',
                left: countryLeft + 'px',
            }
        };
    }

    function setCountryColor() {
        if (turnResult === 'lose') {
            return styles.filter_red;
        };
        if (turnResult === 'win') {
            return styles.filter_green;
        }
    }

    return (
        <div
            className={readyToSnap ? styles.invisible : styles.country_info}
        >
            <div className={styles.country_name}>{readyToSnap ? '' : props.country.name}</div>
            <Draggable
                nodeRef={nodeRef}
                onStart={handleDragStart}
                onStop={handleDragStop}
                position={readyToSnap ? { x: 0, y: 0 } : undefined}
                disabled={readyToSnap ? true : false}
            >
                <img
                    ref={nodeRef}
                    src={props.country.image}
                    style={setCountryImagePosition()}
                    className={setCountryColor()}
                    alt='country shape'
                />
            </Draggable>
        </div>
    )
}


