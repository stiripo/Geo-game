import { forwardRef } from 'react';

export const Map = forwardRef(
    function Map(props, ref) {
        return (
            <div className="map-container">
            <img
                ref={ref}
                src={props.src}
                className='map'
                alt='map'
            />
        </div>
        )
    }
)