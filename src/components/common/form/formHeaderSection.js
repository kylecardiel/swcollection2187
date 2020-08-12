import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { HeaderText } from 'components/common/text/headerText';
import React from 'react';
import { Color } from 'shared/styles/color';

export const FormHeaderSection = ({ text, textColor, backgroundColor }) => {
    const classes = useStyles({ backgroundColor: backgroundColor });


    return (
        <Grid data-testid='FormHeaderId' container spacing={1} className={classes.headerContainer}>
            <Grid item xs={12} >
                <HeaderText text={text} textColor={textColor}/>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    headerContainer: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        background: props => props.backgroundColor ? props.backgroundColor : Color.primary('eliteBlackGradient'),
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
