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

export const SourceMaterialForm = ({ selectedSourceColor, setSelectedSourceColor }) => {
    const classes = useStyles();
    // const [source] = useState(sourceUpdated);  sourceUpdated

    return(
        <Grid 
            container
            direction='column'
            alignItems='center'
            spacing={1}
            className={classes.container}
        >
            <Grid item>
                Source Color Picker
            </Grid>
            <Grid item>
                <ChromePicker 
                    color={selectedSourceColor}
                    onChangeComplete={setSelectedSourceColor}
                />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
    },
    textStyle: {
        fontWeight: 'bold',
        color: 'black',
        display: 'inline-block',
    },
}));

SourceMaterialForm.propTypes = {
    selectedSourceColor: PropTypes.string.isRequired,
    setSelectedSourceColor: PropTypes.func.isRequired,
};