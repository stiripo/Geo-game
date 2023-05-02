import spain from './assets/spain.svg';
import portugal from './assets/portugal.svg';
import france from './assets/france.svg';
import germany from './assets/germany.svg';
import belgium from './assets/belgium.svg';

export const MAP_DIMENSIONS = {
    x: 900.675,
    y: 734.475,
}

export const EUROPEAN_COUNTRIES = [
    {
        name: 'Portugal',
        width: 68.086,
        height: 100.969,
        left: 2.1500000953674316,
        top: 554.7250366210938,
        image: portugal
    },
    {
        name: 'Spain',
        width: 186.698,
        height: 160.897,
        left: 25.149999618530273,
        top: 525.9000244140625,
        image: spain
    },
    {
        name: 'France',
        width: 169.574,
        height: 172.589,
        left: 128.15000915527344,
        top: 417.6000061035156,
        image: france
    },
    {
        name: 'Germany',
        width: 113.413,
        height: 151.350,
        left: 274.1499938964844,
        top: 352.6000061035156,
        image: germany
    },
    {
        name: 'Belgium',
        width: 45.323,
        height: 40.065,
        left: 233.15000915527344,
        top: 413.7250061035156,
        image: belgium
    }
];

export const ERROR_MARGIN = 50;
