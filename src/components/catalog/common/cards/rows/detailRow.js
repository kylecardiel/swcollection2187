import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

export const DetailRow = ({ label, value }) => {
    const classes = useStyles();
    const adjustedValue = value ? value : 'N/A';

    return <>
        <Divider />
        <div className={classes.detailRow}>
            <Typography variant='body2' color={'textSecondary'} component='p'>
                {label}
            </Typography>
            <Typography variant='body2' component='p'>
                <Box fontWeight={'fontWeightBold'} >
                    {adjustedValue}
                </Box>
            </Typography>
        </div>
    </>;
};

const useStyles = makeStyles(() => ({
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

DetailRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};
