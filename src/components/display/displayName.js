import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';

export const DisplayNameSection = ({ name, seriesNumber, assortment, series }) => {

    const acceptableColor = ['red', 'blue', 'orange'];

    const nameSize = seriesNumber ? 10 : 12;
    const assortColor = assortment.split(' ')[0].toLowerCase();
    const seriesNumberColor = acceptableColor.includes(assortColor) ? assortColor : 'white';

    
    const seriesColorGenerator = series => {
        switch(series) {
            case 'Elite Series':
                return 'red';
            default:
                break;
          }
    };

    const classes = useStyles({ numberColor: seriesNumberColor, seriesColor: seriesColorGenerator(series)});

    return (
        <Grid container spacing={0} >
            <Grid item xs={nameSize} className={classes.nameText}>{name}</Grid>
            {seriesNumber &&
                <Grid item xs={2} className={classes.seriesNumber}>{`#${seriesNumber}`}</Grid>
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
        color: Color.primary('white'),
        backgroundColor: props => Color.primary(props.seriesColor),
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
        color: Color.primary('black'),
        backgroundColor: props => Color.primary(props.numberColor),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
    },
}));
