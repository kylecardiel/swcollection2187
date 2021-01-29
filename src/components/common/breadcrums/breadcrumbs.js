import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export const CommonBreadCrumbs = ({ links, currentTitle }) => {
    const classes = useStyles();

    const linkBreadcrums = links.map(link => {
        return <Link key={link.route} href={`#${link.route}`} className={classes.text}>
            {link.title}
        </Link>;
    });

    return (
        <div className={classes.container}>
            <Grid container spacing={1} >
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
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: Color.black(),
        width: '100vw',
    },
    breadcrumb: {
        paddingLeft: theme.spacing(5),
    },
    text: {
        color: Color.yellow(),
    },
}));

CommonBreadCrumbs.propTypes = {
    links: PropTypes.array.isRequired,
    currentTitle: PropTypes.string.isRequired,
};
