import { Card, CardMedia, Grid, makeStyles } from '@material-ui/core';
import { UserConsumer } from 'components/auth/authContext';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import { ActionFigureCardContent } from 'components/display/actionfigureCardContent';
import { DisplayNameSection } from 'components/display/displayName';
import React, { useContext, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { ScreenSizeConsumer } from 'context/screenSizeContext';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { SREEN_SIZE } from 'shared/constants/screenSize';
import { LoadingSpinner } from 'components/display/loading';

export const ActionFigure = ({ records, newBoxImage, showAssortmentHeaders, sourceMaterials, assortments }) => {
    const classes = useStyles();
    const { loggedIn, id } = useContext(UserConsumer);
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);
    const screenSize = useContext(ScreenSizeConsumer);

    const windowWidth = () => {
        if (screenSize.isMobileDevice && !screenSize.isPortrait) return 100;
        if (screenSize.isMobileDevice && screenSize.isPortrait) return 500;
        if (screenSize.isTablet && !screenSize.isPortrait) return SREEN_SIZE.MD;
        if (screenSize.isTablet && screenSize.isPortrait) return SREEN_SIZE.LG;
        if (screenSize.isMediumDesktopOrLaptop) return 1400;
        if (screenSize.isLargeDesktopOrLaptop) return SREEN_SIZE.XL;
    }

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

    const GAP_SIZE = 20;
    const CARD_HEIGHT = 500;
    const CARD_WIDTH = 200;

    const Item = ({ data, index, style }) => {
        const { cardHeight, cardWidth, columnCount, gapSize, itemCount } = data;
        const startIndex = index * columnCount;
        const stopIndex = Math.min(itemCount - 1, startIndex + columnCount - 1);

        const cards = [];
        for (let i = startIndex; i <= stopIndex; i++) {
            cards.push(
                <div
                    key={`${records[i]}-${i}`}
                    className={classes.sampleCard}
                    style={{
                        flex: `0 0 ${cardWidth}px`,
                        height: cardHeight,
                        margin: `0 ${gapSize / 2}px`
                    }}
                >
                    <Grid item xs={12} key={records[i].id} >
                        <Link
                            to={{
                                pathname: `${url}/${records[i].id}`
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card className={classes.card} >
                                <DisplayNameSection
                                    record={records[i]}
                                    sourceMaterials={sourceMaterials}
                                    assortments={assortments}
                                />
                                <CardMedia
                                    style={{ paddingTop: '60%', height: 250 }}
                                    image={
                                        newBoxImage
                                            ? (records[i].newImageUrl || commingSoonPhotoUrl)
                                            : (records[i].looseImageUrl || commingSoonPhotoUrl)
                                    }
                                    title={records[i].name}
                                    src={records[i].name}
                                />
                            </Card>
                            <ActionFigureCardContent
                                record={records[i]}
                                showAssortmentHeaders={showAssortmentHeaders}
                                sourceMaterials={sourceMaterials}
                            />
                        </Link>
                        {loggedIn && collectionButton(records[i])}
                    </Grid>
                </div >
            );
        }

        return (
            <div className={classes.sampleItem} style={style}>
                {cards}
            </div>
        );
    };

    function ListWrapper({ height, itemCount, width }) {
        const columnCount = Math.floor((width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE));
        const rowCount = Math.ceil(itemCount / columnCount);

        const itemData = useMemo(
            () => ({
                columnCount,
                itemCount,
                cardWidth: CARD_WIDTH,
                cardHeight: CARD_HEIGHT,
                gapSize: GAP_SIZE
            }),
            [columnCount, itemCount]
        );

        return (
            <List
                className={classes.sampleList}
                height={height}
                itemCount={rowCount}
                itemSize={CARD_HEIGHT + GAP_SIZE}
                width={width}
                itemData={itemData}
            >
                {Item}
            </List>
        );
    }

    return (
        <>
            {sourceMaterials && assortments ?
                <AutoSizer>
                    {() => (
                        <ListWrapper
                            height={1000}
                            itemCount={records.length}
                            width={windowWidth()}
                        />
                    )}
                </AutoSizer>
                : <div className={classes.centerLoader}>
                    <LoadingSpinner />
                </div>
            }
        </>
    )
};

const useStyles = makeStyles(theme => ({
    sampleCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sampleItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    GridItemOdd: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
    GridItemEven: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
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
        boxShadow: '0 0 5px',
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
        boxShadow: '0 0 5px',
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
    centerLoader: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }
}));
