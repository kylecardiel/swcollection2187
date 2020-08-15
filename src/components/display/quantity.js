import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React from 'react';
import { Color } from 'shared/styles/color';

const ADD = 'ADD';
const MINUS = 'MINUS';

export const Quantity = ({ title, qty, qtyType, changeQty }) => {
    const classes = useStyles();

    const zeroQty = qty === 0;
    const minusColor = zeroQty ? Color.grey() : Color.red();
    
    const minus = () => !zeroQty && changeQty(qtyType, MINUS);

    return (
        <Grid container spacing={2} className={classes.detailsContainer}>
            <Grid container spacing={2} className={classes.detailsContainer}>
                <div className={classes.quantityDetailHeader}>{title}</div>
                <div className={classes.quantityDetailIcons} onClick={() => minus()}>
                    <RemoveCircleIcon 
                        fontSize='large' 
                        style={{ color: minusColor }} 
                    />
                </div>
                <div className={classes.quantityDetail}>{qty}</div>
                <div className={classes.quantityDetailIcons} onClick={() => changeQty(qtyType, ADD)} >
                    <AddCircleIcon 
                        fontSize='large' 
                        style={{ color: Color.green() }} 
                    />
                </div>
            </Grid>
        </Grid>
    )
};

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        // border: '5px solid yellow',
        flexGrow: 1
    },
    quantityDetailHeader: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
        // border: '1px solid green',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minWidth: 200,
    },
    quantityDetailIcons: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // border: '1px solid purple',
        minWidth: 50,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    quantityDetail: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // border: '1px solid red',
        minWidth: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));