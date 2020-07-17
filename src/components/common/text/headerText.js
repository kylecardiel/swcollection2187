import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    textSizeChange: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '36px',
        },
        fontWeight: '800',
        textTransform: 'uppercase',
        color: props => props.textColor
    },
    textStatic: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '36px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: props => props.textColor
    },
}));

export const HeaderText = props => {

    const { textColor, staticTextSize } = props;
    const classes = useStyles({ textColor: textColor ? textColor : 'black'});

    return (
        <div data-testid='headerTextId' className={staticTextSize ? classes.textStatic : classes.textSizeChange}>
            {props.text}
        </div>
    );
}
