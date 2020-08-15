import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { Color } from 'shared/styles/color';

export const CommonBreadCrumbs = ({ links, currentTitle }) => {
    const classes = useStyles();

    const linkBreadcrums = links.map(link => {
        return <Link key={link.route} href={`#${link.route}`} className={classes.text}>
            {link.title}
        </Link>
    });

    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item xs={12} >
                <Breadcrumbs 
                    aria-label='breadcrumb' 
                    separator={<NavigateNextIcon fontSize='small' style={{ color: Color.yellow() }} />} 
                    className={classes.breadcrumb}
                >
                    {linkBreadcrums}
                    <Typography color='textPrimary' className={classes.text}>{currentTitle}</Typography>
                </Breadcrumbs>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'black',
        width: '100.25%',
    },
    breadcrumb: {
        marginLeft: theme.spacing(3),
        padding: theme.spacing(.5),
        paddingLeft: theme.spacing(4),
    },
    text: {
        color: Color.yellow()
    }
}));
