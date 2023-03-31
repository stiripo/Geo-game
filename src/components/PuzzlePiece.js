import { ERROR_MARGIN } from '../constants';
import Draggable from 'react-draggable';
import { useState } from 'react';

export function PuzzlePiece(props) {

    let [attempt, setAttempt] = useState(0);
    let [turnEnd, setTurnEnd] = useState(false);
    let [turnResult, setTurnResult] = useState(null);

    function handleDragStart(event) {
        event.preventDefault();
    }

    function handleDragStop(event) {
        event.preventDefault();
        let difX = Math.abs(event.target.getBoundingClientRect().left - props.country.left);
        let difY = Math.abs(event.target.getBoundingClientRect().top - props.country.top);
        // console.log(`real coordinates: ${event.target.getBoundingClientRect().left}`);
        // console.log(`country.left: ${props.country.left}`);
        // console.log(difX);
        const isCloseEnough = Math.sqrt(difX ** 2 + difY ** 2) < ERROR_MARGIN;
        // console.log(`iscloseEnough value: ${isCloseEnough}`);
        let currentAttempt = attempt + 1;
        setAttempt(currentAttempt);
        setTurnEnd(() => {
            return isCloseEnough || currentAttempt === 3;
        });
        if (isCloseEnough || currentAttempt === 3) {
            props.onTurnEnd();
        }
        if (!isCloseEnough && currentAttempt === 3) {
            setTurnResult('failure');
        }
    }

    return (
        <div
            className={turnEnd ? 'invisible' : 'country-shape'}
        >
            <div className="country-name">{turnEnd ? '' : props.country.name}</div>
            <Draggable
                onStart={handleDragStart}
                onStop={handleDragStop}
                position={turnEnd ? { x: 0, y: 0 } : undefined}
                disabled={turnEnd ? true : false}
            >
                <img
                    src={props.country.image}
                    style={turnEnd ? {
                        position: 'absolute',
                        top: props.country.top + 'px',
                        left: props.country.left + 'px',
                    } : {}}
                    className={turnResult === 'failure' ? 'filter-red' : ''}
                    alt='country shape'
                />
            </Draggable>
        </div>
    )
}

// change coordinates for checking position - not relative to the whole viewport, but relative to the map element
// find better namespaces
