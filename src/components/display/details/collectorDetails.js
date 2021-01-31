import React, { useState } from 'react';
import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { FormFilter } from 'components/common/form/formFilter';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { SectionHeader } from 'components/display/details/sectionHeader';
import Typography from '@material-ui/core/Typography';
import { UserApi } from 'shared/api/userApi';

export const CollectorDetails = ({ isMobile, looseCompleteQtyInput, looseIncompleteQtyInput, newInBoxQtyInput, ownedId, userId }) => {
    const [newInBoxQty, setNewInBoxQty] = useState(newInBoxQtyInput);
    const [looseCompleteQty, setLooseCompleteQty] = useState(looseCompleteQtyInput);
    const [looseIncompleteQty, setLooseIncompleteQty] = useState(looseIncompleteQtyInput);

    const flexFlowDirection = isMobile ? 'column' : 'row';
    const classes = useStyles({ flexFlowDirection });
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

        UserApi.update(userId, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, ownedId, { [specificQty]: updateQty });
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
        <React.Fragment>
            <Grid xs={12} md={10} item className={classes.detailComponent}>
                <Grid container spacing={1} className={classes.quantityGridContainer}>
                    <Grid xs={12} item>
                        <SectionHeader text={BS_DETAILS_LABEL.COLLECTORS_DETAILS_HEADER} />
                    </Grid>
                    <Grid xs={12} item>
                        {formInputs(BS_DETAILS_LABEL.NEW_IN_BOX_QUANTITY, 'newInBoxQty', newInBoxQty)}
                        {formInputs(BS_DETAILS_LABEL.OPEN_COMPLETE_QUANTITY, 'looseCompleteQty', looseCompleteQty)}
                        {formInputs(BS_DETAILS_LABEL.OPEN_INCOMPLETE_QUANTITY, 'looseIncompleteQty', looseIncompleteQty)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} md={2} item className={classes.totalQuanity}>
                <Typography variant='subtitle2' className={classes.seriesNumberText} >
                    {BS_DETAILS_LABEL.TOTAL_OWNED}
                </Typography>
                <Typography variant='h3' className={classes.seriesNumberText} >
                    {totalOwned}
                </Typography>
            </Grid>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    quantityGridContainer: {
        display: 'flex',
        backgroundColor: Color.white(),
    },
    detailComponent: {
        border: '2px solid black',
    },
    seriesNumberText: {
        paddingTop: theme.spacing(5),
    },
    totalQuanity: {
        border: '2px solid black',
        textAlign: 'center',
        backgroundColor: Color.white(),
    },
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
}));

CollectorDetails.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    looseCompleteQtyInput: PropTypes.number.isRequired,
    looseIncompleteQtyInput: PropTypes.number.isRequired,
    newInBoxQtyInput: PropTypes.number.isRequired,
    ownedId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};