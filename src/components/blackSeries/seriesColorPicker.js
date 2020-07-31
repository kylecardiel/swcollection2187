import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { Color } from 'shared/styles/color';

const {
    BS_ORANGE,
    BS_BLUE,
    BS_RED,
    BS_DELUX,
    BS_40TH,
    BS_ARCHIVE,
    BS_VEHICLE,
    BS_CENTERPIECE,
} = ASSORTMENT;

export const seriesColorPicker = series => {
    let color;
    switch (series) {
        case BS_ORANGE:
            color = 'orange';
            break;
        case BS_BLUE:
            color = 'blue';
            break;
        case BS_RED:
            color = 'red';
            break;
        case BS_DELUX:
            color = 'red';
            break;
        case BS_40TH:
            color = 'grey';
            break;
        case BS_ARCHIVE:
            color = 'grey';
            break;
        case BS_VEHICLE:
            color = 'yellow';
            break;
        case BS_CENTERPIECE:
            color = 'yellow';
            break;
        default:
            break;
    }
    return Color.primary(color);
};