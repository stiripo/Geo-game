import { EUROPEAN_COUNTRIES, ERROR_MARGIN } from '../constants';
import Draggable from 'react-draggable';
import { useState } from 'react';

export function CurrentCountry() {

    function setPosition() {
        return {
            position: 'absolute',
            top: country.top + 'px',
            left: country.left + 'px',
        };
    }

    const [placedCloseEnough, setPlacedCloseEnough] = useState(false);

    function handleDragStart(event) {
        event.preventDefault();
    }

    function handleDragStop(event) {
        event.preventDefault();
        let difX = Math.abs(event.target.getBoundingClientRect().left - country.left);
        let difY = Math.abs(event.target.getBoundingClientRect().top - country.top);
        setPlacedCloseEnough(Math.sqrt(difX ** 2 + difY ** 2) < ERROR_MARGIN);
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
                position={placedCloseEnough ? { x: 0, y: 0 } : undefined}
                disabled={placedCloseEnough ? true : false}
            >
                <img
                    src={country.image}
                    style={placedCloseEnough ? {
                        position: 'absolute',
                        top: country.top + 'px',
                        left: country.left + 'px',
                    } : {}}
                    alt='country shape'
                />
            </Draggable>
        </div>
    )
}

// add attempt state
// put country in place (style= transform: translage(...px, ...px))