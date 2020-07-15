import { DOMAIN_CONSTANTS } from 'shared/constants/domainConstants';

export const MOVIE_NAMES = Object.keys(DOMAIN_CONSTANTS.SOURCE.MOVIES).map(function(key) {
    return DOMAIN_CONSTANTS.SOURCE.MOVIES[key].NAME;
});

const getAllKeysInArrayFormat = obj => Object.keys(obj).map(function(key) {
    return obj[key];
});

export const GROUP_NAMES = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.GROUPS);
export const VERSIONS = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.VERSIONS);
export const TV_SHOWS = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.SOURCE.TV_SHOWS);
export const VIDEO_GAME = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.SOURCE.VIDEO_GAME);
export const ALL_SOURCE_NAMES = MOVIE_NAMES.concat(TV_SHOWS).concat(VIDEO_GAME);
export const MOVIE_FORMATS = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.SOURCE.MOVIE_MEDIA_FORMATS);
export const CHARACTER_NAMES = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.CHARATERS);

export const PRODUCT_TYPE = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.PRODUCT.TYPE);
export const GET_PRODUCT_TYPE = demoMode => {
    return demoMode
        ? ['Action Figures','Movies','Video Games']
        : PRODUCT_TYPE;
};

export const PRODUCT_TYPE_DETAILS = DOMAIN_CONSTANTS.PRODUCT.TYPE;
export const VIDEO_GAME_SYSTEMS = getAllKeysInArrayFormat(DOMAIN_CONSTANTS.PRODUCT.VIDEO_GAMES.SYSTEMS);
export const MOVIE_SETS = DOMAIN_CONSTANTS.SOURCE.MOVIE_SETS;

const PRODUCT_INFO = FilterCriteria => {
    return Object.keys(DOMAIN_CONSTANTS.PRODUCT.LINES.ACTION_FIGURES).map(function(key) {
        return DOMAIN_CONSTANTS.PRODUCT.LINES.ACTION_FIGURES[key][FilterCriteria];
    });
};
export const PRODUCT_LINES = PRODUCT_INFO('NAME');

const convertArrayToObject = array => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        const newKey = item.replace(/\s/g, '_').replace(/[^a-zA-Z ]/g, '').toUpperCase();
        return {
            ...obj,
            [newKey]: item,
        };
    }, initialValue);
};

export const PRODUCT_LINES_OBJ = convertArrayToObject(PRODUCT_LINES);

export const ASSORTMENT = DOMAIN_CONSTANTS.PRODUCT.LINES.ACTION_FIGURES.BLACK_SERIES_6.ASSORMENTS;

export const ACTION_FIGURE_PRODUCT_LINE = DOMAIN_CONSTANTS.PRODUCT.LINES.ACTION_FIGURES;

export const GET_SPECIFIC_ASSORTMENT = productLine => {
    let specificAssortment;
    if(productLine){
        Object.keys(ACTION_FIGURE_PRODUCT_LINE).forEach(assortment => {
            if(ACTION_FIGURE_PRODUCT_LINE[assortment].NAME === productLine){
                specificAssortment = ACTION_FIGURE_PRODUCT_LINE[assortment].ASSORMENTS;
            } 
        });
    }
    return specificAssortment;
};

const GET_ASSORTMENT = () => {
    let allAssort =  Object.keys(ACTION_FIGURE_PRODUCT_LINE).map(function(key) {
        return Object.values(ACTION_FIGURE_PRODUCT_LINE[key].ASSORMENTS);
    });
    return allAssort.flat();
};

export const ALL_ASSORTMENT = GET_ASSORTMENT();
