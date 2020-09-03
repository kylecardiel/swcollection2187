import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export const NoSignUp = () => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xl'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <section>
                            <h3>{'Sorry!'}</h3>
                            <p>{'We need a little more time to get ready for you to join. Check back Soon!'}</p>
                        </section>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
}));