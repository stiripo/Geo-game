import { ERROR_MARGIN } from '../constants';
import Draggable from 'react-draggable';
import { useState, useRef } from 'react';


export function PuzzlePiece(props) {

    let [attempt, setAttempt] = useState(0);
    let [turnEnd, setTurnEnd] = useState(false);
    let [turnResult, setTurnResult] = useState(null);
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
        setTurnEnd(() => {
            return isCloseEnough || currentAttempt === 3;
        });
        if (isCloseEnough || currentAttempt === 3) {
            props.onTurnEnd();
        }
        if (!isCloseEnough && currentAttempt === 3) {
            setTurnResult('lose');
            props.lose();
        }
        if (isCloseEnough) {
            setTurnResult('win');
            props.win();
        }
    }

    return (
        <div
            className={turnEnd ? 'invisible' : 'country-info'}
        >
            <div className="country-name">{turnEnd ? '' : props.country.name}</div>
            <Draggable
                nodeRef={nodeRef}
                onStart={handleDragStart}
                onStop={handleDragStop}
                position={turnEnd ? { x: 0, y: 0 } : undefined}
                disabled={turnEnd ? true : false}
            >
                <img
                    ref={nodeRef}
                    src={props.country.image}
                    style={turnEnd ? {
                        position: 'absolute',
                        top: props.country.top + 'px',
                        left: props.country.left + 'px',
                        //TODO: on turnend first set position to absolute and leave in the actual place, and after that compare the actual coords with correct coords and smoothly transition from actual to correct.
                    } : {}}
                    className={turnResult === 'lose' ? 'filter-red' : ''}
                    alt='country shape'
                />
            </Draggable>
        </div>
    )
}

