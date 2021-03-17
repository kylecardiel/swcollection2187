import { makeStyles } from '@material-ui/core/styles';
import { signInWithGoogle } from 'backend/googleAuth';
import React from 'react';
import Grid from '@material-ui/core/Grid';

export const GoogleButton = () => {
    const classes = useStyles();
    return (
        <Grid container direction='row' justify='space-around' alignItems='center' spacing={1} className={classes.container} onClick={signInWithGoogle}>
            <Grid item className={classes.icon}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png' alt='google icon' width='25px' height='25px' />
            </Grid>
            <span className={classes.spanButtonText}>Continue with Google</span>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        background: 'white',
        color: '#555555',
        height: 55,
        maxWidth: 400,
        boxShadow: '1px 1px 1px grey',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: '1px solid #dddddd',
        borderRadius: '5px',
    },
    icon: {
        marginTop: theme.spacing(.5),
        paddingLeft: theme.spacing(2),
        background: 'white',
    },
    spanButtonText: {
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingRight: theme.spacing(9),
        fontSize: '14px',
        fontWeight: 'bold',
    },
}));
