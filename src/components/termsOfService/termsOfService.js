import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NotReadyYet } from 'components/common/notReadyYet';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import PropTypes from 'prop-types';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME } = ROUTE_CONSTANTS;

export const TermsOfService = ({ signUpPage }) => {
    const classes = useStyles();

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.TERMS_OF_SERVICE.TITLE} />
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {!signUpPage
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
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(3)
,    },
}));

TermsOfService.propTypes = {
    signUpPage: PropTypes.bool.isRequired,
};
