import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { getSourceColor } from 'components/catalog/actionFigures/blackSeries/helpers/figureColors';
import PropTypes from 'prop-types';
import React from 'react';
import { Color } from 'shared/styles/color';
import GroupIcon from '@material-ui/icons/Group';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

export const BlackSeriesCardContent = ({ record, sourceMaterials }) => {
    const classes = useStyles();

    const adjustedValue = value => {
        return value
            ? value.length > 25
                ? value.substring(0, 22) + '...'
                : value
            : '.';
    };

    const generateSourceMaterialDetail = value => {
        let sourceMaterialBackgroundColor = '';
        let sourceMaterialTextColor = 'yellow';
        const isSeries4 = record.packageType === 'Box w/Mural' || record.packageType === 'Box w/Mural [no plastic]';
        if (isSeries4) {
            const sourceMaterialColor = getSourceColor(sourceMaterials.values, value);
            sourceMaterialBackgroundColor = sourceMaterialColor.backgroundColor;
            sourceMaterialTextColor = sourceMaterialColor.textColor;
        }

        const adjustedValue = value ? value : '-';
        return <div style={{ backgroundColor: sourceMaterialBackgroundColor, textAlign: 'center' }}>
            <Typography variant='caption' gutterBottom style={{ color: Color.primary(sourceMaterialTextColor), fontFamily: 'Raleway, sans-serif' }}>
                <Box fontWeight={'fontWeightBold'}>
                    {adjustedValue}
                </Box>
            </Typography>
        </div>;
    };

    const generateDetail = value => {
        const hiddenTextClass = value ? classes.detailRow : classes.detailRowHiddenText;
        return <div className={hiddenTextClass}>
            <Typography variant='caption' gutterBottom style={{ fontFamily: 'Raleway, sans-serif' }}>
                <Box fontWeight={'fontWeightBold'}>
                    {adjustedValue(value)}
                </Box>
            </Typography>
        </div>;
    };

    const iconDetails = (multipack, exclusiveRetailer) => {
        return <div className={classes.iconRow}>
            { multipack && <GroupIcon /> }
            { exclusiveRetailer && <LoyaltyIcon /> }
        </div>;
    };

    const { additionalNameDetails, exclusiveRetailer, looseCompleteQty, looseIncompleteQty, multipack, newInBoxQty, owned, sourceMaterial, version } = record;

    return (
        <Card className={classes.bottomCard}>
            <CardContent >
                {generateDetail(additionalNameDetails)}
                {generateSourceMaterialDetail(sourceMaterial)}
                {generateDetail(version)}
                {iconDetails(multipack, exclusiveRetailer)}
                {owned && generateDetail(`Total Owned: ${newInBoxQty + looseCompleteQty + looseIncompleteQty}`)}
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    dividerColor: {
        marginTop: theme.spacing(-.5),
        backgroundColor: Color.white(),
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        color: Color.white(),
        fontSize: '10px',
    },
    detailRowYellow: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        color: Color.darkYellow(),
        fontSize: '10px',
    },
    detailRowHiddenText: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '10px',
    },
    iconRow: {
        display: 'flex',
        justifyContent: 'space-around',
        color: Color.white(),
    },
    bottomCard: {
        maxWidth: 325,
        height: 130,
        backgroundColor: Color.black(),
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },
    source: {
        backgroundColor: Color.white(),
        width: '100%',
    },
}));

BlackSeriesCardContent.propTypes = {
    record: PropTypes.object.isRequired,
    sourceMaterials: PropTypes.object.isRequired,
};