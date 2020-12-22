import { Color } from 'shared/styles/color';
import { getSourceColor, getAssortmentColor } from 'components/display/figureColors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const DisplayNameSection = ({ record, sourceMaterials, assortments }) => {
    const nameSize = record.seriesNumber ? 10 : 12;

    const numberBackgroundColor = () => {
        const isSeries4 = record.assortment === 'Series 4.0';
        let color = '';
        if (isSeries4) {
            const sourceMaterialColors = getSourceColor(sourceMaterials.values, record.sourceMaterial);
            color = sourceMaterialColors.backgroundColor;
        } else {
            const assortmentColors = getAssortmentColor(assortments.values, record.assortment);
            color = assortmentColors.backgroundColor;
        }
        return color;
    };

    const classes = useStyles({ color: numberBackgroundColor() });
    
    const formattedSeriesNumber = () => {
        switch (record.seriesNumber) {
        case '40th':
            return '40';
        default:
            return record.seriesNumber;
        }
    };

    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={nameSize} className={classes.nameText}>{record.name}</Grid>
            {record.seriesNumber &&
                <Grid item xs={2} className={classes.seriesNumber}>{formattedSeriesNumber()}</Grid>
            }
            <Grid item xs={12} className={classes.seriesNumber}>{record.assortment}</Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container:{
        backgroundColor: props => Color.primary(props.color),
    },
    nameText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.white(),
        backgroundColor: Color.black(),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
    },
    seriesNumber: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.black(),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
    },
}));

DisplayNameSection.propTypes = {
    record: PropTypes.object.isRequired,
    sourceMaterials: PropTypes.object.isRequired,
    assortments: PropTypes.object.isRequired,
};

