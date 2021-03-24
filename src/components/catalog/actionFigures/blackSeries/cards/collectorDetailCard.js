import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormFilter } from 'components/common/form/formFilter';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { DateUtils } from 'shared/util/dateUtil';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { IOSSwitch } from 'components/common/switcher/iOSSwitch';

export const CollectorDetailCard = ({ looseCompleteQtyInput, looseIncompleteQtyInput, newInBoxQtyInput, ownedId, userId, averageBuyPriceInput, preorderedInput, sellableInput, tradeableInput }) => {
    const [newInBoxQty, setNewInBoxQty] = useState(newInBoxQtyInput);
    const [looseCompleteQty, setLooseCompleteQty] = useState(looseCompleteQtyInput);
    const [looseIncompleteQty, setLooseIncompleteQty] = useState(looseIncompleteQtyInput);
    
    const defaultAverageBuyPriceInput = averageBuyPriceInput ? averageBuyPriceInput : 0;
    const [averageBuyPrice, setAverageBuyPrice] = useState(defaultAverageBuyPriceInput);

    const [preordered, setPreordered] = useState(preorderedInput ? preorderedInput : false);
    const [tradeable, setTradeable] = useState(tradeableInput ? tradeableInput :false);
    const [sellable, setSellable] = useState(sellableInput ? sellableInput : false);

    const classes = useStyles();
    const totalOwned = newInBoxQty + looseCompleteQty + looseIncompleteQty;

    const changeQty = (e, specificQty) => {
        let updateQty = e.target.value;
        switch (specificQty) {
        case 'newInBoxQty':
            setNewInBoxQty(updateQty);
            break;
        case 'looseCompleteQty':
            setLooseCompleteQty(updateQty);
            break;
        case 'looseIncompleteQty':
            setLooseIncompleteQty(updateQty);
            break;
        case 'averageBuyPrice':
            setAverageBuyPrice(updateQty);
            break;
        case 'preordered':
            updateQty = !preordered;
            setPreordered(!preordered);
            break;
        case 'tradeable':
            updateQty = !tradeable;
            setTradeable(!tradeable);
            break;
        case 'sellable':
            updateQty = !sellable;
            setSellable(!sellable);
            break;
        default:
            break;
        }

        UserApi.update(
            userId, 
            FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, 
            ownedId, 
            { 
                [specificQty]: updateQty,
                lastModifiedDate: DateUtils.getCurrentTimestamp(),
            });
    };

    const quantitySelection = Array.from(Array(16).keys());
    const formInputs = (label, changeValue, initialValue, menuList) => {
        return <FormFilter
            key={label}
            menuList={menuList}
            onChange={e => changeQty(e, changeValue)}
            label={label}
            value={initialValue.toString()}
        />;
    };

    const formQuantityInputs = (label, changeValue, initialValue) => {
        return formInputs(label, changeValue, initialValue, quantitySelection);
    };


    const averageBuyPriceForm = <Grid container justify='center'>
        <FormControl fullWidth className={classes.averageBuyPriceForm} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-amount'>{BS_DETAILS_LABEL.AVERAGE_BUY_PRICE}</InputLabel>
            <OutlinedInput
                classes={{ input: classes.averageBuyPriceInput }}
                id='outlined-adornment-amount'
                value={averageBuyPrice}
                onChange={e => changeQty(e, 'averageBuyPrice')}
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                labelWidth={105}
                type={'number'}
            />
        </FormControl>
    </Grid>;
    
    const generateSwitch = (label, changeValue, initialValue) => {
        return <Grid container justify='flex-start'>
            <FormControlLabel
                className={classes.switcher}
                control={<IOSSwitch checked={initialValue} onChange={e => changeQty(e, changeValue)} name={changeValue} />}
                label={label}
            />
        </Grid>;
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.COLLECTORS_DETAILS_HEADER}
                </Typography>
                <Divider />
                <div className={classes.detailRow}>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        {BS_DETAILS_LABEL.TOTAL_OWNED}
                    </Typography>
                    <Typography variant='body2' component='span'>
                        <Box fontWeight='fontWeightBold'>
                            {totalOwned}
                        </Box>
                    </Typography>
                </div>
                <Divider />
                <div className={classes.detailRow}>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        {BS_DETAILS_LABEL.TOTAL_INVESTED}
                    </Typography>
                    <Typography variant='body2' component='span'>
                        <Box fontWeight='fontWeightBold'>
                            {`$${totalOwned * averageBuyPrice}`}
                        </Box>
                    </Typography>
                </div>
                <Divider />
                <Grid container spacing={1} direction='row' justify='space-around'  className={classes.outerContainer}>
                    <Grid className={classes.innerContainer}>
                        {formQuantityInputs(BS_DETAILS_LABEL.NEW_IN_BOX_QUANTITY, 'newInBoxQty', newInBoxQty)}
                        {formQuantityInputs(BS_DETAILS_LABEL.OPEN_COMPLETE_QUANTITY, 'looseCompleteQty', looseCompleteQty)}
                        {formQuantityInputs(BS_DETAILS_LABEL.OPEN_INCOMPLETE_QUANTITY, 'looseIncompleteQty', looseIncompleteQty)}
                    </Grid>
                    <Grid className={classes.innerContainer}>
                        {averageBuyPriceForm}
                        {generateSwitch(BS_DETAILS_LABEL.PREORDER, 'preordered', preordered)}
                        {generateSwitch(BS_DETAILS_LABEL.SELLABLE, 'sellable', sellable)}
                        {generateSwitch(BS_DETAILS_LABEL.TRADEABLE, 'tradeable', tradeable)}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    outerContainer: {
        marginTop: theme.spacing(1),
    },
    innerContainer: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(1),
        },
    },
    averageBuyPriceForm:{
        marginTop: theme.spacing(1),
        width: 225,
        backgroundColor: Color.white(),
    },
    averageBuyPriceInput: {
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
    switcher: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
        },
    },
}));

CollectorDetailCard.propTypes = {
    averageBuyPriceInput: PropTypes.string,
    looseCompleteQtyInput: PropTypes.number,
    looseIncompleteQtyInput: PropTypes.number,
    newInBoxQtyInput: PropTypes.number,
    ownedId: PropTypes.string,
    preorderedInput: PropTypes.bool,
    sellableInput: PropTypes.bool,
    tradeableInput: PropTypes.bool,
    userId: PropTypes.string.isRequired,
};
