import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { UploadImage } from 'components/admin/uploadImage';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const { HOME } = ROUTE_CONSTANTS;

export const Admin = () => {
    const classes = useStyles();
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ADMIN.TITLE} />
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <UploadImage />
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
        margin: theme.spacing(3),
    },
}));