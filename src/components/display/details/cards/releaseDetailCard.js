import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export const ReleaseDetailCard = ({ assortment, assortmentNumber, exclusiveRetailer, multipack, multipackQuantity, packageType, retailPrice, wave, year }) => {
    const classes = useStyles();

    const generateDetail = (label, value) => {
        const adjustedValue = value ? value : 'N/A';
        return <>
            <Divider />
            <div className={classes.detailRow}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    {label}
                </Typography>
                <Typography variant='body2' component='p'>
                    {adjustedValue}
                </Typography>
            </div>
        </>;
    };

    const retailPriceFormatted = `$${(retailPrice * (multipackQuantity)).toFixed(2)}`;
    const dontWantToBackfillPackageType = packageType ? packageType : 'Standard Box';

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.RELEASE_DETAILS_HEADER}
                </Typography>
                {generateDetail(BS_DETAILS_LABEL.ASSORTMENT, assortment)}
                {generateDetail(BS_DETAILS_LABEL.ASSORTMENT_NUMBER, assortmentNumber)}
                {generateDetail(BS_DETAILS_LABEL.YEAR, year)}
                {generateDetail(BS_DETAILS_LABEL.PACKAGE_TYPE, dontWantToBackfillPackageType)}
                {generateDetail(BS_DETAILS_LABEL.RETAIL_PRICE, retailPriceFormatted)}
                {generateDetail(BS_DETAILS_LABEL.EXCLUSIVE_RETAILER, exclusiveRetailer)}
                {generateDetail(BS_DETAILS_LABEL.MULTIPACK, multipack)}
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

ReleaseDetailCard.propTypes = {
    assortment: PropTypes.string.isRequired,
    assortmentNumber:  PropTypes.string,
    exclusiveRetailer: PropTypes.string,
    multipack: PropTypes.string,
    multipackQuantity: PropTypes.number,
    packageType: PropTypes.string,
    retailPrice: PropTypes.string.isRequired,
    wave: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};
