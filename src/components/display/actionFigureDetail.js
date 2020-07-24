import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const ActionFigureDetails = ({ catalog, figure, similarFigures }) => {
    const classes = useStyles();
    const headerText = figure.additionalNameDetails ? `${figure.name} (${figure.additionalNameDetails})` : figure.name;

    return (
        <div className={classes.root}>
            <FormHeaderSection text={headerText} textColor={'white'} />
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt='complex' src={figure.looseImageUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.textContainer}>
                        <Grid item xs container direction='column' spacing={2}>
                            <Grid item xs className={classes.figureInfo}>
                                <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                    <span className={classes.textStyle}>Release Details:</span>
                                </Typography>
                                <div className={classes.bottomtext}>
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
                                        {` $19.99`}
                                    </Typography>
                                </div>
                                <Typography gutterBottom variant="subtitle1" className={classes.sectionHeader}>
                                    <span className={classes.textStyle}>Character Details:</span>
                                </Typography>
                                <div className={classes.bottomtext}>
                                    <Typography variant='body2' gutterBottom>
                                        <span className={classes.textStyle}>First Apperance:</span>
                                        {` ${figure.sourceMaterial}`}
                                    </Typography>
                                    <Typography variant='body2' gutterBottom>
                                        <span className={classes.textStyle}>Similar Figures:</span>
                                        {` ${similarFigures.length}`}
                                    </Typography>
                                    {similarFigures.length > 0 && similarFigures.map(f => (
                                        <Typography variant='body2' gutterBottom className={classes.similarFigures}>
                                            {`${f.name} `}
                                            {f.additionalNameDetails && `(${f.additionalNameDetails}) `}
                                            {`from ${f.assortment} assortment `}
                                            {f.version && `${f.version}`}
                                        </Typography>
                                    ))}
                                </div>
                                {!catalog &&
                                    <React.Fragment>
                                        <Typography gutterBottom variant="subtitle1">
                                            <span className={classes.textStyle}>Collector Details:</span>
                                        </Typography>
                                        <div>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell align="right">Purchase Price</TableCell>
                                                            <TableCell align="right">Condition</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {figure.newInBoxQty > 0 &&
                                                            <TableRow key={'new'}>
                                                                <TableCell component="th" scope="row">
                                                                    {figure.newInBoxQty}
                                                                </TableCell>
                                                                <TableCell align="right">{`$${figure.purchasePrice}`}</TableCell>
                                                                <TableCell align="right">New in Box</TableCell>
                                                            </TableRow>
                                                        }
                                                        {figure.looseCompleteQty > 0 &&
                                                            <TableRow key={'looseComplete'}>
                                                                <TableCell component="th" scope="row">
                                                                    {figure.looseCompleteQty}
                                                                </TableCell>
                                                                <TableCell align="right">{`$${figure.purchasePrice}`}</TableCell>
                                                                <TableCell align="right">Loose Complete</TableCell>
                                                            </TableRow>
                                                        }
                                                        {figure.looseIncompleteQty > 0 &&
                                                            <TableRow key={'looseIncomplete'}>
                                                                <TableCell component="th" scope="row">
                                                                    {figure.looseIncompleteQty}
                                                                </TableCell>
                                                                <TableCell align="right">{`$${figure.purchasePrice}`}</TableCell>
                                                                <TableCell align="right">Loose Incomplete</TableCell>
                                                            </TableRow>
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </React.Fragment>
                                }
                            </Grid>
                            <Grid item className={classes.itemTwo}>
                                <Typography variant='body2' style={{ cursor: 'pointer' }}>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.itemThree}>
                            <Typography variant='subtitle1' className={classes.number}>
                                {`#${figure.seriesNumber}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt='complex' src={figure.newImageUrl} />
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    paper: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        margin: 'auto',
        maxWidth: '95%',
        borderRadius: 0,
    },
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
    textContainer: {
        // border: '5px solid blue',
    },
    figureInfo: {
        // border: '5px solid purple',
    },
    itemTwo: {
        // border: '5px solid orange',
    },
    itemThree: {
        // border: '5px solid green',
    },
    number: {
        // border: '5px solid green',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '18px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'black',
        backgroundColor: 'red',
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
        minWidth: 30,
        minHeight: 20,
    },
    textStyle: {
        fontWeight: 'bold',
        // color: Color.primary('yellow'),
        display: 'inline-block',
    },
    bottomtext: {
        border: '1px solid grey',
        paddingLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    sectionHeader: {
        marginTop: theme.spacing(1),
    },
    similarFigures: {
        marginLeft: theme.spacing(1),
    }
}));