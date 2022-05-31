import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { isProduction } from 'shared/util/environment';
import packageJson from '../../../package.json';

export const DevInfo = () => {
    const classes = useStyles();
    const devSection = !isProduction && 
    <Grid item xs={12} container direction='row' justifyContent='flex-start' alignItems='center' spacing={1} className={classes.version}>
        {`Development ENV & on Version: ${packageJson.version}`}
    </Grid>;

    return (
        devSection
    );
};

const useStyles = makeStyles(theme => ({
    version:{
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(5),
        },

    },
}));