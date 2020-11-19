import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

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
                <RemoveCircleIcon 
                    fontSize='large' 
                    style={{ color: minusColor, marginTop: '2%', cursor: 'pointer' }} 
                    onClick={onClickMinus}
                />
                <div className={classes.quantityDetail}>{qty}</div>
                <AddCircleIcon 
                    fontSize='large' 
                    style={{ color: Color.green(), marginTop: '2%', cursor: 'pointer' }} 
                    onClick={onClickAdd}
                />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        flexGrow: 1,
    },
    quantityDetailHeader: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minWidth: props => props.minWidth,
    },
    quantityDetail: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        minWidth: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

Quantity.propTypes = {
    title: PropTypes.string.isRequired,
    qty: PropTypes.number,
    qtyType: PropTypes.string.isRequired,
    changeQty: PropTypes.string.isRequired,
    isMobileDevice: PropTypes.bool.isRequired,
};
