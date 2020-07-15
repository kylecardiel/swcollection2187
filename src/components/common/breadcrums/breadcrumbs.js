import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Color } from 'shared/styles/color';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: grey[400],
        width: '100.25%',
    },
    breadcrumb: {
        marginLeft: theme.spacing(3),
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        // color: Color.primary('eliteRed')
    },
    text: {
        color: Color.primary('eliteRed')
    }
}));

export const CommonBreadCrumbs = props => {

    const classes = useStyles();
    const { links, currentTitle } = props;

    const linkBreadcrums = links.map(link => {
        return <Link key={link.route}  href={`#${link.route}`} className={classes.text}>
            {link.title}
        </Link>
    });

    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item xs={12} >
                <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />} className={classes.breadcrumb}>
                    {linkBreadcrums}
                    <Typography color='textPrimary' className={classes.text}>{currentTitle}</Typography>
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
};
