import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NotReadyYet } from 'components/common/notReadyYet';
import PropTypes from 'prop-types';
import React from 'react';

export const TermsOfService = ({ signUpPage }) => {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='xl'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {signUpPage
                            ? <NotReadyYet />
                            : <section>
                                <iframe 
                                    title='tos' 
                                    width='100%' 
                                    height='500' 
                                    src="https://docs.google.com/document/d/e/2PACX-1vTwSsP002N9avt-gpBxUhO4TRqI8sGBF2mgySw3cvytjb5qMdbSRbBOmHSHBE9AuOeSTZTWFaptc887/pub?embedded=true"
                                ></iframe>
                            </section>
                        }
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

TermsOfService.propTypes = {
    signUpPage: PropTypes.bool.isRequired,
};
