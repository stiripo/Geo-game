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
        left: 10.27500057220459,
        top: 520.6375122070312,
        image: portugal
    },
    {
        name: 'Spain',
        width: 248.771,
        height: 224.412,
        left: 33.275001525878906,
        top: 491.63751220703125,
        image: spain
    },
    {
        name: 'France',
        width: 235.186,
        height: 235.769,
        left: 139.27500915527344,
        top: 391.63751220703125,
        image: france
    }
];

export const ERROR_MARGIN = 50;
