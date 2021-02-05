import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormFilter } from 'components/common/form/formFilter';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import { DateUtils } from 'shared/util/dateUtil';

export const CollectorDetailCard = ({ looseCompleteQtyInput, looseIncompleteQtyInput, newInBoxQtyInput, ownedId, userId }) => {
    const [newInBoxQty, setNewInBoxQty] = useState(newInBoxQtyInput);
    const [looseCompleteQty, setLooseCompleteQty] = useState(looseCompleteQtyInput);
    const [looseIncompleteQty, setLooseIncompleteQty] = useState(looseIncompleteQtyInput);
    
    const classes = useStyles();
    const totalOwned = newInBoxQty + looseCompleteQty + looseIncompleteQty;

    const changeQty = (e, specificQty) => {
        const updateQty = e.target.value;
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

    const formInputs = (label, changeValue, initialValue) => {
        return <FormFilter
            key={label}
            menuList={quantitySelection}
            onChange={e => changeQty(e, changeValue)}
            label={label}
            value={initialValue.toString()}
        />;
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.COLLECTORS_DETAILS_HEADER}
                </Typography>
                <Divider />
                <div className={classes.detailRow}>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {BS_DETAILS_LABEL.TOTAL_OWNED}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        {totalOwned}
                    </Typography>
                </div>
                <Divider />
                {formInputs(BS_DETAILS_LABEL.NEW_IN_BOX_QUANTITY, 'newInBoxQty', newInBoxQty)}
                {formInputs(BS_DETAILS_LABEL.OPEN_COMPLETE_QUANTITY, 'looseCompleteQty', looseCompleteQty)}
                {formInputs(BS_DETAILS_LABEL.OPEN_INCOMPLETE_QUANTITY, 'looseIncompleteQty', looseIncompleteQty)}
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
}));

CollectorDetailCard.propTypes = {
    looseCompleteQtyInput: PropTypes.number,
    looseIncompleteQtyInput: PropTypes.number,
    newInBoxQtyInput: PropTypes.number,
    ownedId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};
