import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { Color } from 'shared/styles/color';

const { BS_ORANGE, BS_BLUE, BS_RED, BS_DELUX, BS_40TH, BS_ARCHIVE, BS_VEHICLE, BS_CENTERPIECE, BS_GAMING_GREATS, BS_RED_EXCLUSIVES } = ASSORTMENT;

export const assortmentColor = assortment => {
    switch (assortment) {
        case BS_ORANGE:
            return Color.primary('orange');
        case BS_BLUE:
            return Color.primary('blue');
        case BS_RED:
            return Color.primary('red');
        case BS_DELUX:
            return Color.primary('red');
        case BS_RED_EXCLUSIVES:
            return Color.primary('red');
        case BS_40TH:
            return Color.primary('grey');
        case BS_ARCHIVE:
            return Color.primary('lightGrey');
        case BS_VEHICLE:
            return Color.primary('red');
        case BS_CENTERPIECE:
            return Color.primary('yellow');
        case BS_GAMING_GREATS:
            return Color.primary('purple');
        case 'Convention Exclusive':
            return Color.primary('green');
        default:
            return Color.primary('white');
    };
};