import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import { HeaderText } from 'components/common/text/headerText';

const useStyles = makeStyles(theme => ({
    headerContainer: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%',
        background: props => Color.primary(props.backgroundColor),
    },
}));

export const AssortmentHeader = props => {
    const { text, backgroundColor } = props;
    const classes = useStyles({backgroundColor: backgroundColor});
    return (
        <Grid container spacing={1} className={classes.headerContainer}>
            <Grid item xs={12} >
                <HeaderText text={text} />
            </Grid>
        </Grid>
    );
}
