import React, { useContext, useState } from 'react';
import { Color } from 'shared/styles/color';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { FormFilter } from 'components/common/form/formFilter';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { getSourceColor, getAssortmentColor } from 'components/display/figureColors';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import { BS_DETAILS_LABEL, PAGES } from 'shared/constants/stringConstantsSelectors';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { SortingUtils } from 'shared/util/sortingUtil';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import Typography from '@material-ui/core/Typography';
import { UserApi } from 'shared/api/orchestrator';
import { UserConsumer } from 'components/auth/authContext';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const ActionFigureDetails = ({ figureId, catalogList, userList, sourceMaterials, assortments, screenSize }) => {
    const { id } = useContext(UserConsumer);
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const figure = singleList.filter(f => f.id === figureId)[0];
    const similarFigures = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => el.name === figure.name && el.id !== figure.id), 'year');
    const multipackFigures = singleList.filter(el => el.multipack !== '' && el.multipack === figure.multipack && el.id !== figure.id);

    const [newInBoxQty, setNewInBoxQty] = useState(figure.newInBoxQty);
    const [looseCompleteQty, setLooseCompleteQty] = useState(figure.looseCompleteQty);
    const [looseIncompleteQty, setLooseIncompleteQty] = useState(figure.looseIncompleteQty);

    const [newImage, setNewImage] = useState(false);
    const changeImage = () => setNewImage(!newImage);

    const numberBackgroundColor = () => {
        const isSeries4 = figure.assortment === 'Series 4.0';
        let color = '';
        if (isSeries4) {
            const sourceMaterialColors = getSourceColor(sourceMaterials, figure.sourceMaterial);
            color = sourceMaterialColors.backgroundColor;
        } else {
            const assortmentColors = getAssortmentColor(assortments, figure.assortment);
            color = assortmentColors.backgroundColor;
        }
        return color;
    };

    const flexFlowDirection = screenSize.isMobileDevice && screenSize.isPortrait ? 'column' : 'row';

    const classes = useStyles({ seriesColor: Color.primary(numberBackgroundColor()), flexFlowDirection });
    const headerText = figure.additionalNameDetails ? `${figure.name} (${figure.additionalNameDetails})` : figure.name;
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

        UserApi.update(id, FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, figure.ownedId, { [specificQty]: updateQty });
    };

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
        {
            route: BLACK_SERIES,
            title: PAGES.BLACK_SERIES_CATALOG.TITLE,
        },
    ];

    const currentTitleBreadCrumbs = figure.additionalNameDetails
        ? `${figure.name} (${figure.additionalNameDetails})`
        : `${figure.name}`;

    const guardedNewImageUrl = figure.newImageUrl ? figure.newImageUrl : commingSoonPhotoUrl;
    const guardedLooseImageUrl = figure.looseImageUrl ? figure.looseImageUrl : commingSoonPhotoUrl;
    const largeImage = newImage ? guardedNewImageUrl : guardedLooseImageUrl;

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
            <img className={classes.smallImage} alt='complex' src={guardedLooseImageUrl} />
        </Grid>
        <Grid xs={6} item className={classes.smallImageContainer}>
            <img className={classes.smallImage} alt='complex' src={guardedNewImageUrl} />
        </Grid>
    </Grid>;

    const multipackFigureQty = multipackFigures.length + 1;

    const releaseDetailsContainer = <Grid xs={12} md={10} item className={classes.detailComponent}>
        <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
            <span className={classes.textStyle}>{BS_DETAILS_LABEL.RELEASE_DETAILS_HEADER}:</span>
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{BS_DETAILS_LABEL.ASSORTMENT}:</span>
            {` ${figure.assortment}`}
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{BS_DETAILS_LABEL.WAVE}:</span>
            {` ${figure.wave}`}
        </Typography>
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{BS_DETAILS_LABEL.YEAR}:</span>
            {` ${figure.year}`}
        </Typography>
        {figure.multipack &&
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>{BS_DETAILS_LABEL.MULTIPACK}:</span>
                {` ${figure.multipack}`}
            </Typography>
        }
        {figure.exclusiveRetailer &&
            <Typography variant='body2' gutterBottom className={classes.detailName}>
                <span className={classes.textStyle}>{BS_DETAILS_LABEL.EXCLUSIVE_RETAILER}:</span>
                {` ${figure.exclusiveRetailer}`}
            </Typography>
        }
        <Typography variant='body2' gutterBottom className={classes.detailName}>
            <span className={classes.textStyle}>{BS_DETAILS_LABEL.RETAIL_PRICE}:</span>
            {` $${(figure.retailPrice * (multipackFigureQty)).toFixed(2)}`}
        </Typography>
    </Grid>;

    const quantitySelect = Array.from(Array(16).keys());

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={currentTitleBreadCrumbs} />
            <div className={classes.root}>
                <FormHeaderSection text={headerText} textColor={'white'} backgroundColor={'black'} />
                <Container maxWidth='sm' className={classes.container}>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        <Grid xs={12} md={5} item className={classes.verticalContainer}>
                            {imageContainer}
                        </Grid>
                        <Grid xs={12} md={7} item className={classes.verticalContainer}>
                            <Grid container spacing={2} className={classes.detailsContainer}>
                                {releaseDetailsContainer}
                                <Grid xs={12} md={2} item className={classes.seriesNumberComp}>
                                    <Typography variant='h3' className={classes.seriesNumberText} >
                                        {figure.seriesNumber}
                                    </Typography>
                                </Grid>
                                <Grid xs={12} md={12} item className={classes.detailComponent}>
                                    <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                        <span className={classes.textStyle}>{BS_DETAILS_LABEL.CHARACTER_DETAILS_HEADER}:</span>
                                    </Typography>
                                    <Typography variant='body2' gutterBottom className={classes.detailName}>
                                        <span className={classes.textStyle}>{BS_DETAILS_LABEL.SOURCE}:</span>
                                        {` ${figure.sourceMaterial}`}
                                    </Typography>
                                    <Typography variant='body2' gutterBottom className={classes.detailName}>
                                        <span className={classes.textStyle}>{BS_DETAILS_LABEL.MORE(figure.name, similarFigures.length)}</span>
                                    </Typography>
                                    <div className={classes.similarFiguresContainer}>
                                        {similarFigures.length > 0 && similarFigures.map(f => (
                                            <Typography variant='body2' gutterBottom className={classes.similarFigures} key={`${f.additionalNameDetails}-${f.assortment}`}>
                                                {`${f.name} `}
                                                {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                                {BS_DETAILS_LABEL.MORE_ASSORTMENT(f.assortment)}
                                                {f.version && `[${f.version}]`}
                                            </Typography>
                                        ))}
                                    </div>
                                    {figure.multipack &&
                                        <>
                                            <Typography variant='body2' gutterBottom className={classes.detailName}>
                                                <span className={classes.textStyle}>{BS_DETAILS_LABEL.MULTIPACK_FIGURES(multipackFigureQty)}</span>
                                            </Typography>
                                            <div className={classes.similarFiguresContainer}>
                                                {multipackFigures.map(f => (
                                                    <Typography key={f.name} variant='body2' gutterBottom className={classes.similarFigures}>
                                                        {`${f.name} `}
                                                        {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                                        {`[${f.multipack}]`}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </>
                                    }
                                </Grid>
                                {figure.owned &&
                                    <>
                                        <Grid xs={12} md={10} item className={classes.detailComponent}>
                                            <Grid container spacing={1} className={classes.quantityGridContainer}>
                                                <Grid xs={12} item>
                                                    <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                                        <span className={classes.textStyle}>{BS_DETAILS_LABEL.COLLECTORS_DETAILS_HEADER}:</span>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <FormFilter
                                                        key={BS_DETAILS_LABEL.NEW_IN_BOX_QUANTITY}
                                                        menuList={quantitySelect}
                                                        onChange={e => changeQty(e, 'newInBoxQty')}
                                                        label={BS_DETAILS_LABEL.NEW_IN_BOX_QUANTITY}
                                                        value={newInBoxQty.toString()}
                                                    />
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <FormFilter
                                                        key={BS_DETAILS_LABEL.OPEN_COMPLETE_QUANTITY}
                                                        menuList={quantitySelect}
                                                        onChange={e => changeQty(e, 'looseCompleteQty')}
                                                        label={BS_DETAILS_LABEL.OPEN_COMPLETE_QUANTITY}
                                                        value={looseCompleteQty.toString()}
                                                    />
                                                </Grid>
                                                <Grid xs={12} item>
                                                    <FormFilter
                                                        key={BS_DETAILS_LABEL.OPEN_INCOMPLETE_QUANTITY}
                                                        menuList={quantitySelect}
                                                        onChange={e => changeQty(e, 'looseIncompleteQty')}
                                                        label={BS_DETAILS_LABEL.OPEN_INCOMPLETE_QUANTITY}
                                                        value={looseIncompleteQty.toString()}
                                                    />
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
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    container: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
        maxWidth: '99%',
        height: '75vh',
    },
    gridContainer: {
        display: 'flex',
        flexFlow: props => props.flexFlowDirection,
        height: '70vh',
    },
    quantityGridContainer: {
        display: 'flex',
        flexFlow: 'column',
        backgroundColor: Color.white(),
    },
    verticalContainer: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        height: '69vh',
    },
    detailName: {
        marginLeft: theme.spacing(2),
    },
    detailsContainer: {
        flexGrow: 1,
        backgroundColor: Color.white(),
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
        maxHeight: 100,
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
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Color.grey(),
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

ActionFigureDetails.propTypes = {
    figureId: PropTypes.string.isRequired,
    catalogList: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired,
    sourceMaterials: PropTypes.array.isRequired,
    assortments: PropTypes.array.isRequired,
    screenSize: PropTypes.object.isRequired,
};