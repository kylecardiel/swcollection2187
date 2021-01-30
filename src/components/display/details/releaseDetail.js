import React from 'react';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SectionHeader } from 'components/display/details/sectionHeader';
import Typography from '@material-ui/core/Typography';

export const ReleaseDetails = ({ assortment, exclusiveRetailer, multipack, multipackQuantity, packageType, retailPrice, wave, year }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        const adjustedValue = value ? value : 'N/A';
        return <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{label}:</span>
            {` ${adjustedValue}`}
        </Typography>;
    };

    const retailPriceFormatted = `$${(retailPrice * (multipackQuantity)).toFixed(2)}`;
    const dontWantToBackfillPackageType = packageType ? packageType : 'Standard Box';

    return (
        <Grid xs={12} md={10} item className={classes.detailComponent}>
            <SectionHeader text={BS_DETAILS_LABEL.RELEASE_DETAILS_HEADER} />
            {generateDetail(BS_DETAILS_LABEL.ASSORTMENT, assortment)}
            {generateDetail(BS_DETAILS_LABEL.WAVE, wave)}
            {generateDetail(BS_DETAILS_LABEL.YEAR, year)}
            {generateDetail(BS_DETAILS_LABEL.MULTIPACK, multipack)}
            {generateDetail(BS_DETAILS_LABEL.EXCLUSIVE_RETAILER, exclusiveRetailer)}
            {generateDetail(BS_DETAILS_LABEL.RETAIL_PRICE, retailPriceFormatted)}
            {generateDetail(BS_DETAILS_LABEL.PACKAGE_TYPE, dontWantToBackfillPackageType)}
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
    packageType: PropTypes.string,
    retailPrice: PropTypes.string.isRequired,
    wave: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};