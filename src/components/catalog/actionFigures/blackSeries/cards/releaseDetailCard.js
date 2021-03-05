import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';

export const ReleaseDetailCard = ({ assortment, assortmentNumber, assortmentBackgroundColor, exclusiveRetailer, multipack, multipackQuantity, packageType, retailPrice, wave, year }) => {
    const classes = useStyles({ assortmentBackgroundColor });

    const generateDetail = (label, value, backgroundColor) => {
        const adjustedValue = value ? value : 'N/A';
        const className = backgroundColor ? classes.detailRowWithColor : classes.detailRow;
        const labelColor = backgroundColor ? 'textPrimary' : 'textSecondary';
        const fontWeight = backgroundColor ? 'fontWeightBold' : 'fontWeightRegular';
        return <>
            <Divider />
            <div className={className} >
                <Typography variant='body2' color={labelColor} component='span'>
                    <Box fontWeight={fontWeight} >
                        {label}
                    </Box>
                </Typography>
                <Typography variant='body2' component='span'>
                    <Box fontWeight='fontWeightBold' >
                        {adjustedValue}
                    </Box>
                </Typography>
            </div>
        </>;
    };

    const retailPriceFormatted = `$${(retailPrice * (multipackQuantity)).toFixed(2)}`;
    const dontWantToBackfillPackageType = packageType ? packageType : 'Standard Box';
    const needsBackgroundColor = true;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.RELEASE_DETAILS_HEADER}
                </Typography>
                {generateDetail(BS_DETAILS_LABEL.ASSORTMENT, assortment, needsBackgroundColor)}
                {generateDetail(BS_DETAILS_LABEL.ASSORTMENT_NUMBER, assortmentNumber, needsBackgroundColor)}
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
    detailRowWithColor: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: props => props.assortmentBackgroundColor,
    },
}));

ReleaseDetailCard.propTypes = {
    assortment: PropTypes.string.isRequired,
    assortmentNumber:  PropTypes.string,
    assortmentBackgroundColor:  PropTypes.string,
    exclusiveRetailer: PropTypes.string,
    multipack: PropTypes.string,
    multipackQuantity: PropTypes.number,
    packageType: PropTypes.string,
    retailPrice: PropTypes.string.isRequired,
    wave: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
};
