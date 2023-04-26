import spain from './assets/spain.svg';
import portugal from './assets/portugal.svg';
import france from './assets/france.svg';

export const MAP_DIMENSIONS = {
    x: 900.675,
    y: 734.475,
}

export const EUROPEAN_COUNTRIES = [
    {
        name: 'Portugal',
        width: 87.761,
        height: 136.426,
        left: 1.5625,
        top: 555.0375366210938,
        image: portugal
    },
    {
        name: 'Spain',
        width: 248.771,
        height: 224.412,
        left: 25.5625,
        top: 526.0375366210938,
        image: spain
    },
    {
        name: 'France',
        width: 235.186,
        height: 235.769,
        left: 128.5625,
        top: 418.0375061035156,
        image: france
    }
];

export const ERROR_MARGIN = 50;
