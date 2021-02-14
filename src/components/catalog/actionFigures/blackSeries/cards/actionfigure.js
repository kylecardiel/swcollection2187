/* eslint-disable react/prop-types */
import { Card, CardMedia, Grid, makeStyles } from '@material-ui/core';
import { UserConsumer } from 'components/auth/authContext';
import { ActionFigureCardContent } from 'components/catalog/actionFigures/blackSeries/cards/actionfigureCardContent';
import { CollectorButton } from 'components/catalog/actionFigures/blackSeries/button/collectorButton';
import { DisplayNameSection } from 'components/catalog/actionFigures/blackSeries/helpers/displayName';
import { LoadingSpinner } from 'components/common/loading';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { isProduction } from 'shared/util/environment';

export const ActionFigure = ({ assortments, newBoxImage, records, showAssortmentHeaders, smallFigureView, sourceMaterials }) => {
    const classes = useStyles({ smallFigureView });
    const { loggedIn } = useContext(UserConsumer);
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    let { url } = useRouteMatch();

    const GAP_SIZE = smallFigureView ? 5 : 20;
    const CARD_HEIGHT = smallFigureView ? 200 : 500;
    const CARD_WIDTH = smallFigureView ? 75 : 200;

    const cardMediaStyle = {
        paddingTop: smallFigureView ? 0 : '60%',
        height: smallFigureView ? 100 : 250,
    };

    const determineImage = (newImageUrl, looseImageUrl) => {
        if (isProduction){
            return newBoxImage ? (newImageUrl || commingSoonPhotoUrl) : (looseImageUrl || commingSoonPhotoUrl);
        } else {
            return IMAGE_PATHS.FILL_MURRAY;
        }
    };

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
                        margin: `0 ${gapSize / 2}px`,
                    }}
                >
                    <Grid item xs={12} key={records[i].id} >
                        <Link
                            to={{
                                pathname: `${url}/${records[i].id}`,
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card className={classes.card} >
                                <DisplayNameSection
                                    assortments={assortments}
                                    smallFigureView={smallFigureView}
                                    sourceMaterials={sourceMaterials}
                                    record={records[i]}
                                />
                                <CardMedia
                                    style={cardMediaStyle}
                                    image={determineImage(records[i].newImageUrl, records[i].looseImageUrl)
                                    }
                                    title={records[i].name}
                                    src={records[i].name}
                                />
                            </Card>
                            {!smallFigureView && 
                                <ActionFigureCardContent
                                    record={records[i]}
                                    showAssortmentHeaders={showAssortmentHeaders}
                                    sourceMaterials={sourceMaterials}
                                />
                            }
                        </Link>
                        {loggedIn && 
                            <CollectorButton 
                                card={true}
                                figureId={records[i].id}
                                ownedId={records[i].ownedId}
                                recordOwned={records[i].owned}
                                smallFigureView={smallFigureView}
                            />
                        }
                    </Grid>
                </div >,
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
                gapSize: GAP_SIZE,
            }),
            [columnCount, itemCount],
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
                <AutoSizer disableHeight >
                    {({ width }) => (
                        <ListWrapper
                            height={window.innerHeight*.8}
                            itemCount={records.length}
                            width={width}
                        />
                    )}
                </AutoSizer>
                : <div className={classes.centerLoader}>
                    <LoadingSpinner />
                </div>
            }
        </>
    );
};

const useStyles = makeStyles(() => ({
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
    card: {
        maxWidth: 325,
        maxHeight: 325,
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },
    centerLoader: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    cardMedia: {
        paddingTop: '60%',
        height: 250,
    },
}));

ActionFigure.propTypes = {
    assortments: PropTypes.object,
    newBoxImage: PropTypes.bool.isRequired,
    records: PropTypes.array.isRequired,
    showAssortmentHeaders: PropTypes.string,
    smallFigureView: PropTypes.bool.isRequired,
    sourceMaterials: PropTypes.object,
};
