/* eslint-disable react/prop-types */
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { ActionButton } from 'components/common/buttons/actionButton';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { BS_CARD_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

export const CollectorButton = ({ card, figureId, ownedId, recordOwned, smallFigureView }) => {
    const classes = useStyles();
    const { id } = useContext(UserConsumer);

    const [ownedVG, setOwnedVG] = useState(recordOwned);

    const addFigureToCollection = () => {
        let newCollectile = {
            catalogId: figureId,
            owned: true,
            looseCompleteQty: 0,
            looseIncompleteQty: 0,
            newInBoxQty: 1,
            averageBuyPrice: 0,
        };
        setOwnedVG(!ownedVG);
        UserApi.create(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, newCollectile);
    };

    const removeFigureToCollection = () => {
        setOwnedVG(!ownedVG);
        UserApi.delete(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, ownedId);
    };

    const onClickCard = e => {
        e.preventDefault();
        return ownedVG
            ? removeFigureToCollection()
            : addFigureToCollection();
    };

    const onClickDetails = () => {
        return ownedVG
            ? () => removeFigureToCollection()
            : () => addFigureToCollection();
    };

    const textBasedOnSize = (text) => {
        return smallFigureView ? text.split(' ')[0] : text;
    };

    const collectionButton = () => {
        let text, className;
        if (ownedVG) {
            text = textBasedOnSize(BS_CARD_BUTTONS.REMOVE);
            className = classes.owned;
        } else {
            text = textBasedOnSize(BS_CARD_BUTTONS.ADD);
            className = classes.nameText;
        }

        if(card){
            return <Card className={classes.buttonCard} onClick={e => onClickCard(e)}>
                <div className={className}>{text}</div>
            </Card>;
        } else {
            return <ActionButton
                buttonLabel={text}
                onClick={onClickDetails()}
                color={ownedVG ? Color.red() : Color.green()}
            />;
        }
    };

    return (
        <>
            {collectionButton()}
        </>
    );
};

const useStyles = makeStyles(() => ({
    buttonCard: {
        maxWidth: 325,
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },
    nameText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.white(),
        backgroundColor: Color.green(),
        cursor: 'pointer',
        // '&:hover': {
        //     backgroundColor: 'white',
        //     color: Color.green(),
        // },
        height: 30,
    },
    owned: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.white(),
        backgroundColor: Color.grey(),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Color.red(),
        },
        height: 30,
    },
}));

CollectorButton.propTypes = {
    card: PropTypes.bool.isRequired,
    figureId: PropTypes.string.isRequired,
    ownedId: PropTypes.string,
    recordOwned: PropTypes.bool,
    smallFigureView: PropTypes.bool.isRequired,
};
