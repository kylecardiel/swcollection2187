import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { Color } from 'shared/styles/color';

const { BS_ORANGE, BS_BLUE, BS_RED, BS_DELUX, BS_40TH, BS_ARCHIVE, BS_VEHICLE, BS_CENTERPIECE, BS_GAMING_GREATS, BS_RED_EXCLUSIVES } = ASSORTMENT;

export const assortmentAttributes = assortment => {
    switch (assortment) {
        case BS_ORANGE:
            return { 
                color: Color.primary('orange'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_BLUE:
            return { 
                color: Color.primary('blue'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_RED:
            return { 
                color: Color.primary('red'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_DELUX:
            return { 
                color: Color.primary('red'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_RED_EXCLUSIVES:
            return { 
                color: Color.primary('red'),
                sortingAttribute: 'name',
            };
        case BS_40TH:
            return { 
                color: Color.primary('grey'),
                sortingAttribute: 'sourceMaterial',
            };
        case BS_ARCHIVE:
            return { 
                color: Color.primary('lightGrey'),
                sortingAttribute: 'wave',
            };
        case BS_VEHICLE:
            return { 
                color: Color.primary('red'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_CENTERPIECE:
            return { 
                color: Color.primary('yellow'),
                sortingAttribute: 'seriesNumber',
            };
        case BS_GAMING_GREATS:
            return { 
                color: Color.primary('purple'),
                sortingAttribute: 'name',
            };
        case 'Convention Exclusive':
            return { 
                color: Color.primary('green'),
                sortingAttribute: 'name',
            };
        default:
            return { 
                color: Color.primary('white'),
                sortingAttribute: 'seriesNumber',
            };
    };
};