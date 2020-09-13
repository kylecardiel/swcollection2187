import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import React from 'react';
import { Color } from 'shared/styles/color';

const ADD = 'ADD';
const MINUS = 'MINUS';

export const Quantity = ({ title, qty, qtyType, changeQty, isMobileDevice }) => {
    
    const minWidth = isMobileDevice ? '100%' : '200px';
    const classes = useStyles({ minWidth });

    const zeroQty = qty === 0;
    const minusColor = zeroQty ? Color.grey() : Color.red();
    
    const minus = () => !zeroQty && changeQty(qtyType, MINUS);
    const onClickMinus = () => minus();
    const onClickAdd = () => changeQty(qtyType, ADD);

    return (
        <Grid container spacing={2} className={classes.detailsContainer}>
            <Grid container spacing={2} className={classes.detailsContainer}>
                <div className={classes.quantityDetailHeader}>{title}</div>
                {/* <div className={classes.quantityDetailIcons} onClick={onClickMinus}> */}
                    <RemoveCircleIcon 
                        fontSize='large' 
                        style={{ color: minusColor, marginTop: '2%', cursor: 'pointer',  }} 
                        onClick={onClickMinus}
                    />
                {/* </div> */}
                <div className={classes.quantityDetail}>{qty}</div>
                {/* <div className={classes.quantityDetailIcons}  > */}
                    <AddCircleIcon 
                        fontSize='large' 
                        style={{ color: Color.green(), marginTop: '2%', cursor: 'pointer', }} 
                        onClick={onClickAdd}
                    />
                {/* </div> */}
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
        // minWidth: 200,
        minWidth: props => props.minWidth,
    },
    quantityDetailIcons: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        // border: '1px solid purple',
        minWidth: 50,
        minHeigth: 500,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'solid black 5px',
        '&:hover': {
            border: '1px solid purple',
        }
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