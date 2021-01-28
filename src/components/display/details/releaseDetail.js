import React from 'react';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SectionHeader } from 'components/display/details/sectionHeader';
import Typography from '@material-ui/core/Typography';

export const ReleaseDetails = ({ assortment, exclusiveRetailer, multipack, multipackQuantity, retailPrice, wave, year }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        return <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{label}:</span>
            {` ${value}`}
        </Typography>;
    };

    const retailPriceFormatted = `$${(retailPrice * (multipackQuantity)).toFixed(2)}`;

    return (
        <Grid xs={12} md={10} item className={classes.detailComponent}>
            <SectionHeader text={BS_DETAILS_LABEL.RELEASE_DETAILS_HEADER} />
            {generateDetail(BS_DETAILS_LABEL.ASSORTMENT, assortment)}
            {generateDetail(BS_DETAILS_LABEL.WAVE, wave)}
            {generateDetail(BS_DETAILS_LABEL.YEAR, year)}
            {multipack && generateDetail(BS_DETAILS_LABEL.MULTIPACK, multipack)}
            {exclusiveRetailer && generateDetail(BS_DETAILS_LABEL.EXCLUSIVE_RETAILER, exclusiveRetailer)}
            {generateDetail(BS_DETAILS_LABEL.RETAIL_PRICE, retailPriceFormatted)}
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    detailName: {
        marginLeft: theme.spacing(2),
    },
    detailComponent: {
        border: '2px solid black',
    },
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
}));

ReleaseDetails.propTypes = {
    assortment: PropTypes.string.isRequired,
    exclusiveRetailer: PropTypes.string,
    multipack: PropTypes.string,
    multipackQuantity: PropTypes.number,
    retailPrice: PropTypes.string.isRequired,
    wave: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};