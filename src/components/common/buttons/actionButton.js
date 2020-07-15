import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const ActionButton = props => {
    const classProps = { backgroundColor: props.color};
    const classes = useStyles(classProps);

    const labelComponent = props.buttonLabel && 
                                <div style={{ marginLeft: '5px' }}>
                                    {props.buttonLabel}
                                </div>;

    return (
        <Button 
            variant="contained" 
            className={classes.button} 
            onClick={e => props.onClick()}
        >
            {props.icon}
            {labelComponent}
        </Button>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        backgroundColor: props => props.backgroundColor,
        borderRadius: '5',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: props => props.backgroundColor,
        },
    }
}));
