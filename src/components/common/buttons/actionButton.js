import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Color } from 'shared/styles/color';

export const ActionButton = ({ color, buttonLabel, icon, onClick, disabled }) => {
    const classes = useStyles({ backgroundColor: color });
    const labelComponent = buttonLabel && 
                                <div className={classes.buttonLabel}>
                                    {buttonLabel}
                                </div>;

    const onButtonClick = e => {
        e.preventDefault();
        onClick();
    };

    return (
        <Button 
            variant='contained'
            className={classes.button} 
            onClick={e => onButtonClick(e)}
            disabled={disabled}
        >
            {icon}
            {labelComponent}
        </Button>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        backgroundColor: props => props.backgroundColor,
        borderRadius: '5',
        color: Color.white(),
        '&:hover': {
            backgroundColor: props => props.backgroundColor,
            color: Color.white(),
        },
    },
    buttonLabel: {
        marginLeft: '5px',
    },
}));

ActionButton.propTypes = {
    buttonLabel: PropTypes.string,
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    onClick: PropTypes.func.isRequired,
};