import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Color } from 'shared/styles/color';

const ADD = 'ADD';
const MINUS = 'MINUS';

export const Quantity = ({ title, qty, qtyType, changeQty }) => {
    const classes = useStyles();

    const zeroQty = qty === 0;
    const minusColor = zeroQty ? 'grey' : 'red';
    
    const minus = () => {
        if(!zeroQty){
            changeQty(qtyType, MINUS);
        }
    };

    return (
        <Grid container spacing={2} className={classes.detailsContainer}>
            <Grid container spacing={2} className={classes.detailsContainer}>
                <div className={classes.quantityDetailHeader}>{title}</div>
                <div className={classes.quantityDetailIcons}>
                    <RemoveCircleIcon 
                        fontSize='small' 
                        style={{ color: Color.primary(minusColor) }} 
                        onClick={() => minus()}
                        className={classes.icon}
                    />
                </div>
                <div className={classes.quantityDetail}>{qty}</div>
                <div className={classes.quantityDetailIcons}>
                    <AddCircleIcon 
                        fontSize='small' 
                        style={{ color: Color.primary('green') }} 
                        onClick={() => changeQty(qtyType, ADD)} 
                        className={classes.icon}
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
        // border: '1px solid purple',
        minWidth: 200,
    },
    quantityDetailIcons: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // border: '1px solid purple',
        minWidth: 50,
        textAlign: 'center',
        // cursor: 'pointer',
    },
    quantityDetail: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // border: '1px solid purple',
        minWidth: 50,
        textAlign: 'center',
    },
    icon: {
        cursor: 'pointer',
    },
}));