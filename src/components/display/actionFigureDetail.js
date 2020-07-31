import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Container from '@material-ui/core/Container';
import { seriesColorPicker } from 'components/blackSeries/seriesColorPicker';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export const ActionFigureDetails = ({ catalog, figure, similarFigures }) => {
    const seriesColor = seriesColorPicker(figure.assortment)

    const classes = useStyles({ seriesColor: seriesColor });
    const headerText = figure.additionalNameDetails ? `${figure.name} (${figure.additionalNameDetails})` : figure.name;

    const totalOwned = figure.newInBoxQty + figure.looseCompleteQty + figure.looseIncompleteQty;


    return (
        <div className={classes.root}>
            <FormHeaderSection text={headerText} textColor={'white'} />
            <Container maxWidth='sm' className={classes.container}>
                <Grid container spacing={2} className={classes.gridContainer}>
                    <Grid xs={4} item className={classes.verticalContainer}>
                        image...
                    </Grid>
                    <Grid xs={8} item className={classes.verticalContainer}>
                        <Grid container spacing={2} className={classes.detailsContainer}>
                            <Grid xs={12} md={4} item className={classes.detailComponent}>
                                <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                    <span className={classes.textStyle}>Release Details:</span>
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <span className={classes.textStyle}>Assortment:</span>
                                    {` ${figure.assortment}`}
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <span className={classes.textStyle}>Wave:</span>
                                    {` ${figure.wave}`}
                                </Typography>
                                <Typography variant='body2' gutterBottom >
                                    <span className={classes.textStyle}>Year:</span>
                                    {` ${figure.year}`}
                                </Typography>
                                <Typography variant='body2' gutterBottom >
                                    <span className={classes.textStyle}>Retail Price:</span>
                                    {` $${figure.retailPrice}`}
                                </Typography>
                            </Grid>
                            <Grid xs={12} md={6} item className={classes.detailComponent}>
                                Temp holding spot
                            </Grid>
                            <Grid xs={12} md={2} item className={classes.seriesNumberComp}>
                                <Typography variant='h3' className={classes.seriesNumberText} >
                                    {`#${figure.seriesNumber}`}
                                </Typography>
                            </Grid>
                            <Grid xs={12} md={12} item className={classes.detailComponent}>
                                <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                    <span className={classes.textStyle}>Character Details:</span>
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <span className={classes.textStyle}>Source/First Apperance:</span>
                                    {` ${figure.sourceMaterial}`}
                                </Typography>
                                <Typography variant='body2' gutterBottom >
                                    <span className={classes.textStyle}>Similar Figures:</span>
                                    {similarFigures.length > 0 && similarFigures.map(f => (
                                        <Typography variant='body2' gutterBottom className={classes.similarFigures}>
                                            {`${f.name} `}
                                            {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                            {`from ${f.assortment} assortment `}
                                            {f.version && `${f.version}`}
                                        </Typography>
                                    ))}
                                </Typography>
                            </Grid>
                            {!catalog &&
                                <>
                                    <Grid xs={12} md={10} item className={classes.detailComponent}>
                                        <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                            <span className={classes.textStyle}>Collector Details:</span>
                                        </Typography>
                                        <Typography variant='body2' gutterBottom>
                                            <span className={classes.textStyle}>Buy Price:</span>
                                            {` $${figure.purchasePrice}`}
                                        </Typography>
                                        <Typography variant='body2' gutterBottom>
                                            <span className={classes.textStyle}>Quantity Owned:</span>
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Grid container spacing={2} className={classes.detailsContainer}>
                                                <div className={classes.quantityDetailHeader}>New in Box:</div>
                                                <div className={classes.quantityDetail}><RemoveCircleIcon fontSize='small' /></div>
                                                <div className={classes.quantityDetail}>{figure.newInBoxQty}</div>
                                                <div className={classes.quantityDetail}><AddCircleIcon fontSize='small' /></div>
                                            </Grid>
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Grid container spacing={2} className={classes.detailsContainer}>
                                                <Grid container spacing={2} className={classes.detailsContainer}>
                                                    <div className={classes.quantityDetailHeader}>Open (complete):</div>
                                                    <div className={classes.quantityDetail}><RemoveCircleIcon fontSize='small' /></div>
                                                    <div className={classes.quantityDetail}>{figure.looseCompleteQty}</div>
                                                    <div className={classes.quantityDetail}><AddCircleIcon fontSize='small' /></div>
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                        <Typography variant='body2' gutterBottom className={classes.quantity}>
                                            <Grid container spacing={2} className={classes.detailsContainer}>
                                                <Grid container spacing={2} className={classes.detailsContainer}>
                                                    <div className={classes.quantityDetailHeader}>Open (incomplete):</div>
                                                    <div className={classes.quantityDetail}><RemoveCircleIcon fontSize='small' /></div>
                                                    <div className={classes.quantityDetail}>{figure.looseIncompleteQty}</div>
                                                    <div className={classes.quantityDetail}><AddCircleIcon fontSize='small' /></div>
                                                </Grid>
                                            </Grid>
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
        border: '5px solid red',
        height: '75vh'
    },
    gridContainer: {
        display: 'flex',
        flexFlow: 'row',
        height: '70vh',
        border: '5px solid green',
    },
    verticalContainer: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        height: '69vh',
        border: '5px solid blue',
    },
    detailsContainer: {
        border: '5px solid yellow',
        flexGrow: 1
    },
    detailComponent: {
        border: '5px solid purple',
    },
    seriesNumberComp: {
        border: '5px solid purple',
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
        border: '1px solid yellow',
        flexGrow: 1
    },
    quantityDetailHeader: {
        marginLeft: theme.spacing(3),
        border: '1px solid purple',
        minWidth: 250,
    },
    quantityDetail: {
        marginLeft: theme.spacing(3),
        border: '1px solid purple',
        minWidth: 100,
        textAlign: 'center',
    },
    totalQuanity: {
        border: '5px solid purple',
        textAlign: 'center',
    },
    textStyle: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    similarFigures: {
        marginLeft: theme.spacing(1),
    },

    // idk..
    image: {
        width: 275,
        height: 500,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        // border: '5px solid red',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        padding: theme.spacing(3),
        // paddingRight: theme.spacing(3),
        border: '1px solid black',
    },
}));



{/* <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt='complex' src={figure.looseImageUrl} />
                        </ButtonBase>
                    </Grid>
 
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt='complex' src={figure.newImageUrl} />
                        </ButtonBase>
                    </Grid> */}