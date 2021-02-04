import { Color } from 'shared/styles/color';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const HeaderText = ({ textColor, staticTextSize, text }) => {
    const classes = useStyles({ textColor: textColor ? textColor : 'black' });
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
            paddingLeft: theme.spacing(.5),
            marginTop: theme.spacing(.5),
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '40px',
            paddingLeft: theme.spacing(2),
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

HeaderText.propTypes = {
    textColor: PropTypes.string.isRequired,
    staticTextSize: PropTypes.number,
    text: PropTypes.string.isRequired,
};
