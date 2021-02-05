import { Color } from 'shared/styles/color';
import { getSourceColor, getAssortmentColor } from 'components/display/figureColors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const DisplayNameSection = ({ assortments, record, smallFigureView, sourceMaterials }) => {
    const nameSize = !smallFigureView ? record.seriesNumber ? 10 : 12 : 12;
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

    const classes = useStyles({ color: numberBackgroundColor(), smallFigureView });
    
    const formattedSeriesNumber = () => {
        switch (record.seriesNumber) {
        case '40th':
            return '40';
        default:
            return record.seriesNumber;
        }
    };

    const name = record.name;
    const formatedName = smallFigureView && name.length > 15 ? name.substring(0, 12) + '...' : name ;
    
    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={nameSize} className={classes.nameText}>{formatedName}</Grid>
            {!smallFigureView && record.seriesNumber &&
                <Grid item xs={2} className={classes.seriesNumber}>{formattedSeriesNumber()}</Grid>
            }
            {!smallFigureView && 
                <Grid item xs={12} className={classes.seriesNumber}>{record.assortment}</Grid> 
            }
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: props => Color.primary(props.color),
        color: Color.black(),
    },
    nameText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: props => props.smallFigureView ? '7px' : '12px',
        fontWeight: '800',
        color: Color.white(),
        backgroundColor: Color.black(),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
        textOverflow: 'ellipsis',
    },
    seriesNumber: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
    },
}));

DisplayNameSection.propTypes = {
    assortments: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    smallFigureView: PropTypes.bool.isRequired,
    sourceMaterials: PropTypes.object.isRequired,
};

