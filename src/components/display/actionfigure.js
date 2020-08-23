import { Card, Container, Grid, makeStyles } from '@material-ui/core';
import { UserConsumer } from 'components/auth/authContext';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import { ActionFigureCardContent } from 'components/display/actionfigureCardContent';
import { DisplayNameSection } from 'components/display/displayName';
import { LazyImage } from 'components/display/lazyImage';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';

export const ActionFigure = ({ records, newBoxImage, catalogList, showAssortmentHeaders, view, sourceMaterials, assortments }) => {
    const classes = useStyles();
    const { loggedIn, id } = useContext(UserConsumer);
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const addFigureToCollection = figure => {
        let newCollectile = {
            catalogId: figure.id,
            owned: true,
            looseCompleteQty: 0,
            looseIncompleteQty: 0,
            newInBoxQty: 0,
            purchasePrice: 0,
        };
        UserApi.create(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, newCollectile)
    };

    const removeFigureToCollection = figure => {
        UserApi.delete(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, figure.ownedId)
    };

    const onclickCard = record => {
        return record.owned
            ? () => removeFigureToCollection(record)
            : () => addFigureToCollection(record);
    }

    const collectionButton = record => {
        let text, className;
        if (record.owned) {
            text = 'Remove from Collection';
            className = classes.owned;
        } else {
            text = 'Add to Collection';
            className = classes.nameText;
        }

        return <Card className={classes.buttonCard} onClick={onclickCard(record)}>
            <div className={className}>{text}</div>
        </Card>;
    };

    let { url } = useRouteMatch();

    const actionFigureCard = view && records && records.map(record =>
        <Grid item xs={12} md={2} key={record.id} >
            <Link
                to={{
                    pathname: `${url}/${record.name}${record.id}`,
                    state: {
                        figure: record,
                        catalogList: catalogList,
                        sourceMaterials,
                        assortments,
                        commingSoonPhotoUrl,
                    }
                }}
                style={{ textDecoration: 'none' }}
            >
                <Card className={classes.card} >
                    <DisplayNameSection
                        record={record}
                        sourceMaterials={sourceMaterials}
                        assortments={assortments}
                    />
                    <LazyImage
                        key={record.id}
                        src={newBoxImage
                                ? (record.newImageUrl || commingSoonPhotoUrl)
                                : (record.looseImageUrl || commingSoonPhotoUrl)}
                        name={record.name}
                    />
                </Card>
                <ActionFigureCardContent
                    record={record}
                    showAssortmentHeaders={showAssortmentHeaders}
                    sourceMaterials={sourceMaterials}
                />
            </Link>
            {loggedIn && collectionButton(record)}
        </Grid>
    );

    return (
        <Grid container spacing={2} className={classes.top}>
            <Container component='main' maxWidth='xl'>
                <Grid container spacing={2} className={classes.top}>
                    {actionFigureCard}
                </Grid>
            </Container>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    top: {
        marginTop: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
    },
    fullCard: {
        cursor: 'pointer',
    },
    card: {
        maxWidth: 325,
        maxHeight: 325,
        borderRadius: 0,
    },
    bottomCard: {
        maxWidth: 325,
        height: 125,
        backgroundColor: Color.black(),
        borderRadius: 0,
    },
    bottomtext: {
        fontSize: '11px',
        color: Color.white(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    source: {
        backgroundColor: Color.white(),
        width: '100%',
    },
    buttonCard: {
        maxWidth: 325,
        borderRadius: 0,
    },
    textStyle: {
        fontWeight: 'bold',
        color: Color.yellow(),
        display: 'inline-block',

    },
    statusDiv: {
        marginTop: theme.spacing(1),
    },
    newEntryButtonModal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    topText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(2),
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
        '&:hover': {
            backgroundColor: 'white',
            color: Color.green(),
        },
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