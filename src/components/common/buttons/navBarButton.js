import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        width: '300px',
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
          backgroundColor: grey[600],
        },
    }
}));

export const NavBarButton = props => {
    const classes = useStyles();
    return (
        <Button 
            variant="contained" 
            className={classes.button}
            component={Link} 
            to={props.location} 
        >
            {props.buttonLabel}
        </Button>
    );
};
