import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';

export const HeaderText = ({ textColor, staticTextSize, text }) => {
    const classes = useStyles({ textColor: textColor ? textColor : 'black'});
    const className = staticTextSize ? classes.textStatic : classes.textSizeChange;
    return (
        <div data-testid='headerTextId' className={className}>
            {text}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    textSizeChange: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '36px',
        },
        fontWeight: '800',
        textTransform: 'uppercase',
        color: props => Color.primary(props.textColor),
    },
    textStatic: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '36px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: props => Color.primary(props.textColor),
    },
}));
