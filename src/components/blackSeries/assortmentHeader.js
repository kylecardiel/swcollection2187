import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HeaderText } from 'components/common/text/headerText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Color } from 'shared/styles/color';

export const AssortmentHeader = ({ text, backgroundColor, onViewChange, view }) => {
    const classes = useStyles({ backgroundColor });
    const icon = view ? <ExpandLessIcon fontSize='large'/> : <ExpandMoreIcon fontSize='large'/>;
    return (
        <Grid container spacing={1} className={classes.headerContainer}>
            <Grid item xs={1} onClick={onViewChange}>
                <div className={classes.button}>{icon}</div>
            </Grid>
            <Grid item xs={10} >
                <HeaderText text={text} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    headerContainer: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        width: '100%',
        background: props => props.backgroundColor,
    },
    button: {
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: Color.white(),
        },
    },
}));