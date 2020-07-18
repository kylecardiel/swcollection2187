import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const ProgressBar = ({ percentage }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={percentage} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        percentage,
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});