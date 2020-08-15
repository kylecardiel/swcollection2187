import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';
import { assortmentAttributes } from 'components/blackSeries/assortmentColor';

export const DisplayNameSection = ({ name, seriesNumber, assortment }) => {
    const nameSize = seriesNumber ? 10 : 12;
    const classes = useStyles({ color: assortmentAttributes(assortment).color });
    const formattedSeriesNumber = () => {
        switch (seriesNumber) {
            case '40th':
                return '40';
            default:
                return seriesNumber;
        };
    };

    return (
        <Grid container spacing={0} >
            <Grid item xs={nameSize} className={classes.nameText}>{name}</Grid>
            {seriesNumber &&
                <Grid item xs={2} className={classes.seriesNumber}>{formattedSeriesNumber()}</Grid>
            }
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
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
        backgroundColor: props => props.color,
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
    },
}));
