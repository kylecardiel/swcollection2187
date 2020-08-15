import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';

export const HeaderText = ({ textColor, staticTextSize, text }) => {
    const classes = useStyles({ textColor: textColor ? textColor : Color.black()});
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
