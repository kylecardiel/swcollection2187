import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Color } from 'shared/styles/color';

export const ActionButton = ({ color, buttonLabel, icon, onClick }) => {
    const classes = useStyles({ backgroundColor: color});
    const labelComponent = buttonLabel && 
                                <div style={{ marginLeft: '5px' }}>
                                    {buttonLabel}
                                </div>;

    return (
        <Button 
            variant="contained" 
            className={classes.button} 
            onClick={e => onClick()}
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
        borderRadius: '0',
        color: Color.white(),
        '&:hover': {
            backgroundColor: Color.white(),
            color: props => props.backgroundColor,
        },
    }
}));
