import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


export const Homepage = props => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='lg'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.grid}>
                        <Typography component='h1' variant='h5'>
                            {'Welcome'}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};