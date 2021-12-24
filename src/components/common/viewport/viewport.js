/* eslint-disable react/prop-types */
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { slugify } from 'shared/util/stringUtil';

export const Viewport = ({ CardComponent, displayList, other, CARD_HEIGHT, CARD_WIDTH, GAP_SIZE, isDisabled }) => {
    const classes = useStyles();
    let { url } = useRouteMatch();

    const Item = ({ data, index, style }) => {
        const { cardHeight, cardWidth, columnCount, gapSize, itemCount } = data;
        const startIndex = index * columnCount;
        const stopIndex = Math.min(itemCount - 1, startIndex + columnCount - 1);

        const cards = [];
        for (let i = startIndex; i <= stopIndex; i++) {
            cards.push(
                <div
                    key={`${displayList[i]}-${i}`}
                    className={classes.card}
                    style={{
                        flex: `0 0 ${cardWidth}px`,
                        height: cardHeight,
                        margin: `0 ${gapSize / 2}px`,
                    }}
                >
                    <Grid item xs={12} key={displayList[i].id} >
                        <Link
                            to={isDisabled ? 
                                {
                                    pathname: `${url}`,
                                } : 
                                {
                                    pathname: `${url}/${slugify([
                                        displayList[i].assortment,
                                        displayList[i].name,
                                        displayList[i].additionalNameDetails,
                                    ])}`,
                                    state: { id: displayList[i].id },
                                }
                            }
                            style={{ textDecoration: 'none' }}
                        >
                            <CardComponent item={displayList[i]} other={other}/>
                        </Link>
                    </Grid>
                </div >,
            );
        }

        return (
            <div className={classes.item} style={style}>
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
                className={classes.item}
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
        <AutoSizer disableHeight >
            {({ width }) => (
                <ListWrapper
                    height={window.innerHeight*.8}
                    itemCount={displayList.length}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};

const useStyles = makeStyles(() => ({
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

Viewport.propTypes = {
    CardComponent: PropTypes.func.isRequired,
    displayList: PropTypes.array.isRequired,
    other: PropTypes.object,
    CARD_HEIGHT: PropTypes.number.isRequired,
    CARD_WIDTH: PropTypes.number.isRequired,
    GAP_SIZE: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
};
