import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const DisplayNameSection = ({ name, reissue, smallFigureView, seriesNumber }) => {
    const nameSize = !smallFigureView ? seriesNumber ? 10 : 12 : 12;
    const classes = useStyles({ reissue, smallFigureView });

    const formatedName = smallFigureView && name.length > 15 ? name.substring(0, 12) + '...' : name ;
    
    return (
        <Grid container spacing={0} className={classes.container}>
            <Grid item xs={nameSize} className={classes.nameText}>{formatedName}</Grid>
            {!smallFigureView && seriesNumber &&
                <Grid item xs={2} className={classes.seriesNumber}>{seriesNumber}</Grid>
            }
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: props => props.reissue ? Color.red() : Color.yellow(),
        color: Color.black(),
    },
    nameText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: props => props.smallFigureView ? '7px' : '14px',
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
    name: PropTypes.string.isRequired,
    reissue: PropTypes.bool,
    smallFigureView: PropTypes.bool,
    seriesNumber: PropTypes.string.isRequired,
};

