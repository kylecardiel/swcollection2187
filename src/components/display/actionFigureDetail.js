import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Container from '@material-ui/core/Container';
import { assortmentAttributes } from 'components/blackSeries/assortmentColor';
import { UserConsumer } from 'components/auth/authContext';
import { UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Quantity } from 'components/display/quantity';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Color } from 'shared/styles/color';

const ADD = 'ADD';

export const ActionFigureDetails = ({ catalog, figure, similarFigures, multipackFigures }) => {
    const { id } = useContext(UserConsumer);

    const [newInBoxQty, setNewInBoxQty] = useState(figure.newInBoxQty);
    const [looseCompleteQty, setLooseCompleteQty] = useState(figure.looseCompleteQty);
    const [looseIncompleteQty, setLooseIncompleteQty] = useState(figure.looseIncompleteQty);

    const [newImage, setNewImage] = useState(false);
    const changeImage = () => {
        setNewImage(!newImage);
    };

    const seriesColor = assortmentAttributes(figure.assortment).color;
    const classes = useStyles({ seriesColor: seriesColor, catalog: catalog });
    const headerText = figure.additionalNameDetails ? `${figure.name} (${figure.additionalNameDetails})` : figure.name;
    const totalOwned = newInBoxQty + looseCompleteQty + looseIncompleteQty;
    // const purchasePrice = figure.purchasePrice ? ` $${figure.purchasePrice}` : '';

    const changeQty = (specificQty, direction) => {
        let updateQty;
        let updateCollectible = {};
        updateCollectible[figure.ownedId] = {
            catalogId: figure.id,
            owned: true,
            looseCompleteQty: looseCompleteQty,
            looseIncompleteQty: looseIncompleteQty,
            newInBoxQty: newInBoxQty,
            purchasePrice: figure.purchasePrice,
        };

        switch (specificQty) {
            case 'newInBoxQty':
                updateQty = direction === ADD ? newInBoxQty + 1 : newInBoxQty - 1;
                setNewInBoxQty(updateQty);
                updateCollectible.newInBoxQty = updateQty;
                break;
            case 'looseCompleteQty':
                updateQty = direction === ADD ? looseCompleteQty + 1 : looseCompleteQty - 1;
                setLooseCompleteQty(updateQty);
                updateCollectible.looseCompleteQty = updateQty;
                break;
            case 'looseIncompleteQty':
                updateQty = direction === ADD ? looseIncompleteQty + 1 : looseIncompleteQty - 1;
                setLooseIncompleteQty(updateQty);
                updateCollectible.looseIncompleteQty = updateQty;
                break;
            default:
                break;
        };

        UserApi.update(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, figure.ownedId, updateCollectible);
    };

    const largeImage = newImage ? figure.newImageUrl : figure.looseImageUrl;

    const imageContainer = <Grid container spacing={2} className={classes.detailsContainer}>
        <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={changeImage}>
            <KeyboardArrowLeftIcon />
        </Grid>
        <Grid xs={10} item className={classes.largeImageContainer}>
            <img className={classes.largeImage} alt='complex' src={largeImage} />
        </Grid>
        <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={changeImage}>
            <KeyboardArrowRightIcon />
        </Grid>
        <Grid xs={6} item className={classes.smallImageContainer}>
            <img className={classes.smallImage} alt='complex' src={figure.looseImageUrl} />
        </Grid>
        {/* {figure.looseBlackImageUrl &&
            <Grid xs={4} item className={classes.smallImageContainer}>
                <img className={classes.smallImage} alt='complex' src={figure.looseBlackImageUrl} />
            </Grid>
        } */}
        <Grid xs={6} item className={classes.smallImageContainer}>
            <img className={classes.smallImage} alt='complex' src={figure.newImageUrl} />
        </Grid>
    </Grid>;

    const releaseDetailsContainer = <Grid xs={12} md={10} item className={classes.detailComponent}>
        <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
            <span className={classes.textStyle}>Release Details:</span>
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>Assortment:</span>
            {` ${figure.assortment}`}
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>Wave:</span>
            {` ${figure.wave}`}
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>Year:</span>
            {` ${figure.year}`}
        </Typography>
        {figure.multipack && 
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>Part of Multipack:</span>
                {` ${figure.multipack}`}
            </Typography>
        }
        {figure.exclusiveRetailer && 
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>Exclusive Retailer:</span>
                {` ${figure.exclusiveRetailer}`}
            </Typography>
        }
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>Retail Price:</span>
            {` $${figure.retailPrice}`}
        </Typography>
    </Grid>;

    return (
        <div className={classes.root}>
            <FormHeaderSection text={headerText} textColor={'white'} />
            <Container maxWidth='sm' className={classes.container}>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid xs={5} item className={classes.verticalContainer}>
                        {imageContainer}
                    </Grid>
                    <Grid xs={7} item className={classes.verticalContainer}>
                        <Grid container spacing={2} className={classes.detailsContainer}>
                            {releaseDetailsContainer}
                            {/* <Grid xs={12} md={6} item className={classes.detailComponent}>
                                Temp holding spot
                            </Grid> */}
                            <Grid xs={12} md={2} item className={classes.seriesNumberComp}>
                                <Typography variant='h3' className={classes.seriesNumberText} >
                                    {figure.seriesNumber}
                                </Typography>
                            </Grid>
                            <Grid xs={12} md={12} item className={classes.detailComponent}>
                                <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                    <span className={classes.textStyle}>Character Details:</span>
                                </Typography>
                                <Typography variant='body2' gutterBottom className={classes.detailName}>
                                    <span className={classes.textStyle}>Source/First Apperance:</span>
                                    {` ${figure.sourceMaterial}`}
                                </Typography>
                                <Typography variant='body2' gutterBottom className={classes.detailName}>
                                    <span className={classes.textStyle}>{`More ${figure.name} Figures: (${similarFigures.length})`}</span>
                                    <div className={classes.similarFiguresContainer}>
                                        {similarFigures.length > 0 && similarFigures.map(f => (
                                            <Typography variant='body2' gutterBottom className={classes.similarFigures}>
                                                {`${f.name} `}
                                                {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                                {`from [${f.assortment} assortment] `}
                                                {f.version && `[${f.version}]`}
                                            </Typography>
                                        ))}
                                    </div>
                                </Typography>
                                {figure.multipack &&
                                    <Typography variant='body2' gutterBottom className={classes.detailName}>
                                        <span className={classes.textStyle}>{`Multipack Figures: (${multipackFigures.length})`}</span>
                                        <div className={classes.similarFiguresContainer}>
                                            {multipackFigures.map(f => (
                                                <Typography variant='body2' gutterBottom className={classes.similarFigures}>
                                                    {`${f.name} `}
                                                    {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                                    {`[${f.multipack}]`}
                                                </Typography>
                                            ))}
                                        </div>
                                    </Typography>
                                }
                            </Grid>
                            {!catalog &&
                                <>
                                    <Grid xs={12} md={10} item className={classes.detailComponent}>
                                        <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                            <span className={classes.textStyle}>Collector Details:</span>
                                        </Typography>
                                        {/* <Typography variant='body2' gutterBottom className={classes.detailName}>
                                            <span className={classes.textStyle}>Buy Price:</span>
                                            {purchasePrice}
                                        </Typography> */}
                                        <Typography variant='body2' gutterBottom className={classes.detailName}>
                                            <span className={classes.textStyle}>Quantity Owned:</span>
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Quantity
                                                title={'New in Box:'}
                                                qty={newInBoxQty}
                                                qtyType={'newInBoxQty'}
                                                changeQty={changeQty}
                                            />
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Quantity
                                                title={'Open (complete):'}
                                                qty={looseCompleteQty}
                                                qtyType={'looseCompleteQty'}
                                                changeQty={changeQty}
                                            />
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Quantity
                                                title={'Open (incomplete):'}
                                                qty={looseIncompleteQty}
                                                qtyType={'looseIncompleteQty'}
                                                changeQty={changeQty}
                                            />
                                        </Typography>
                                    </Grid>
                                    <Grid xs={12} md={2} item className={classes.totalQuanity}>
                                        <Typography variant='subtitle2' className={classes.seriesNumberText} >
                                            Total Owned
                                </Typography>
                                        <Typography variant='h3' className={classes.seriesNumberText} >
                                            {totalOwned}
                                        </Typography>
                                    </Grid>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    container: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
        maxWidth: '99%',
        // border: '5px solid red',
        height: '75vh'
    },
    gridContainer: {
        display: 'flex',
        flexFlow: 'row',
        height: '70vh',
        // border: '5px solid green',
    },
    verticalContainer: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        height: '69vh',
        // border: '5px solid blue',
    },
    detailName: {
        marginLeft: theme.spacing(2),
    },
    topDetailsContainer: {
        // border: '5px solid yellow',
        flexGrow: 1,
        marginLeft: theme.spacing(-1.5),
    },
    detailsContainer: {
        // border: '5px solid yellow',
        flexGrow: 1
    },
    detailComponent: {
        border: '2px solid black',
    },
    seriesNumberComp: {
        border: '2px solid black',
        backgroundColor: props => props.seriesColor,
        textAlign: 'center',
    },
    seriesNumberText: {
        paddingTop: theme.spacing(5),
    },
    quantity: {
        marginLeft: theme.spacing(2),
    },
    quantityContainer: {
        margin: theme.spacing(0),
        padding: 0,
        // border: '1px solid yellow',
        flexGrow: 1
    },
    totalQuanity: {
        border: '2px solid black',
        textAlign: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    similarFiguresContainer: {
        marginLeft: theme.spacing(2),
        maxHeight: props => props.catalog ? 250 : 100,
        overflow: 'scroll',
    },
    similarFigures: {
        marginLeft: theme.spacing(1),
    },
    largeImageArrowContainer: {
        border: '2px solid black',
        minHeight: 375,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: Color.primary('grey'),
        },
    },
    largeImageContainer: {
        border: '2px solid black',
        minHeight: 375,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    smallImageContainer: {
        border: '2px solid black',
        maxHeight: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    largeImage: {
        flexShrink: 0,
        maxHeight: 375,
    },
    smallImage: {
        flexShrink: 0,
        maxHeight: 125,
    },
}));
