import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export const SectionHeader = ({ text }) => {
    const classes = useStyles();
    return (
        <Typography gutterBottom variant="subtitle1">
            <span className={classes.textStyle}>{text}:</span>
        </Typography>
    );
};

const useStyles = makeStyles(() => ({
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
}));

SectionHeader.propTypes = {
    text: PropTypes.string.isRequired,
};