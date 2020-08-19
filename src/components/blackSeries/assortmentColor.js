import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { Color } from 'shared/styles/color';

const { BS_ORANGE, BS_BLUE, BS_RED, BS_DELUX, BS_40TH, BS_ARCHIVE, BS_VEHICLE, BS_CENTERPIECE, BS_GAMING_GREATS, BS_RED_EXCLUSIVES } = ASSORTMENT;

export const assortmentAttributes = assortment => {
    switch (assortment) {
        case BS_ORANGE:
            return {
                color: Color.orange(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_BLUE:
            return {
                color: Color.blue(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_RED:
            return {
                color: Color.red(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_DELUX:
            return {
                color: Color.red(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_RED_EXCLUSIVES:
            return {
                color: Color.red(),
                sortingAttribute: 'name',
            };
        case BS_40TH:
            return {
                color: Color.grey(),
                sortingAttribute: 'sourceMaterial',
            };
        case BS_ARCHIVE:
            return {
                color: Color.lightGrey(),
                sortingAttribute: 'wave',
            };
        case BS_VEHICLE:
            return {
                color: Color.red(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_CENTERPIECE:
            return {
                color: Color.yellow(),
                sortingAttribute: 'seriesNumber',
            };
        case BS_GAMING_GREATS:
            return {
                color: Color.purple(),
                sortingAttribute: 'name',
            };
        case 'Convention Exclusive':
            return {
                color: Color.green(),
                sortingAttribute: 'name',
            };
        case 'Red - Mini':
            return {
                color: Color.red(),
                sortingAttribute: 'year',
            };
        default:
            return {
                color: Color.white(),
                sortingAttribute: 'seriesNumber',
            };
    };
};