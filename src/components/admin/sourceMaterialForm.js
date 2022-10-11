import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import { SortingUtils } from 'shared/util/sortingUtil';

const TYPES = {
    MOVIE: 'Movie',
    TV: 'TV',
    VG: 'Video Game',
};

export const SourceMaterialForm = ({ sourceMaterials, sourceUpdated }) => {
    const classes = useStyles();

    const [source] = useState(sourceUpdated);

    return(
        <Grid 
            container
            direction='row'
            alignItems='center'
            spacing={1}
        >
            form goes here?
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        maxHeight: 325,
        textAlign: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        color: 'black',
        display: 'inline-block',
    },
}));

SourceMaterialForm.propTypes = {
    sourceMaterials: PropTypes.object.isRequired,
    sourceUpdated: PropTypes.object.isRequired,
};