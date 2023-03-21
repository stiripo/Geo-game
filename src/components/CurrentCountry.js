import { EUROPEAN_COUNTRIES, ERROR_MARGIN } from '../constants';
import Draggable from 'react-draggable';
import { DraggableCore } from 'react-draggable';
import { useState } from 'react';

export function CurrentCountry() {
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    // const [phase, setPhase] = useState('start');

    // function setPosition() {
    //     if (phase === 'start') {
    //         return {position: 'relative'};
    //     } else {
    //         return {
    //             position: 'absolute',
    //             top: y + 'px',
    //             left: x + 'px',
    //             zIndex: 1000,
    //         };
    //     }
    // }

    function handleDragStart(event) {
        event.preventDefault();
        console.log("Drag start");
    }

    function handleDragStop(event) {
        event.preventDefault();
        console.log(`bounding rect Y:${event.target.getBoundingClientRect().top}, X: ${event.target.getBoundingClientRect().left}`)
        console.log(event);
        console.log(`Drag stopped at x:${event.clientX}, y:${event.clientY}`);
        let difX = Math.abs(event.target.getBoundingClientRect().left - country.left);
                let difY = Math.abs(event.target.getBoundingClientRect().top - country.top);
                let placedCloseEnough = Math.sqrt(difX ** 2 + difY ** 2) < ERROR_MARGIN;
                if (placedCloseEnough) {
                    console.log("Close enough!");
                } else {
                    console.log("NOT close enough!")
                }

    }

    let index = Math.floor(Math.random() * EUROPEAN_COUNTRIES.length);
    let country = EUROPEAN_COUNTRIES[index];
    // EUROPEAN_COUNTRIES.splice(index, 1);
    return (
        <div className="country-shape">
            <div className="country-name">{country.name}</div>
            <Draggable
            onStart={handleDragStart}
            onStop={handleDragStop}
            >
                <img
                    src={country.image}
                    // style={setPosition()}
                    alt='country shape'
                />
            </Draggable>
        </div>
    )
}

// add attempt state
// put country in place (style= transform: translage(...px, ...px))