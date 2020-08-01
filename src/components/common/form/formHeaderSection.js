import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import { HeaderText } from 'components/common/text/headerText';
import CancelIcon from '@material-ui/icons/Cancel';

export const FormHeaderSection = props => {
    const classes = useStyles();
    const { text, textColor } = props;

    return (
        <Grid data-testid='FormHeaderId' container spacing={1} className={classes.headerContainer}>
            <Grid item xs={12} >
                <HeaderText text={text} textColor={textColor}/>
            </Grid>
            {/* <Grid item xs={1} className={classes.cancelGrid}>
                <CancelIcon fontSize='large' style={{ color:'white' }} />
            </Grid> */}
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    headerContainer: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        background: Color.primary('eliteBlackGradient'),
    },
    cancelGrid: {
        display: 'flex,',
        justifyContent: 'flex-end',
        alignItems: 'right',
    },
    cancelIconColor: {
        color: 'white',
    },
}));
