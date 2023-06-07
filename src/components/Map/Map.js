import { forwardRef } from 'react';
import styles from './Map.module.css';

export const Map = forwardRef(
    function Map(props, ref) {
        return (
            // <div className="map-container">
                <img
                    ref={ref}
                    src={props.src}
                    className={styles.map}
                    alt='map'
                />
            // </div>
        )
    }
)