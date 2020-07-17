import React, { useContext } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Container,
    makeStyles,
    CardMedia,
} from '@material-ui/core';
import { DisplayNameSection } from 'components/display/displayName';
import { Color } from 'shared/styles/color';
import { UserConsumer } from 'components/auth/authContext';
import { UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

export const ActionFigure = ({ catalog, records }) => {
    const classes = useStyles({ height: catalog ? 75 : 125 });
    const { loggedIn, id } = useContext(UserConsumer);

    const generateBottomText = (label, value) => {
        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} >
            <span className={classes.textStyle}>{`${label}`}</span>
            {value}
        </Typography>
    };

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

    const collectionButton = record => {
        let text, className, onClick;
        if (record.owned) {
            text = 'Remove from Collection';
            className = classes.owned;
            onClick = () => removeFigureToCollection(record);
        } else {
            text = 'Add to Collection';
            className = classes.nameText;
            onClick = () => addFigureToCollection(record);
        }

        return <Card className={classes.buttonCard} onClick={onClick}>
            <div className={className}>{text}</div>
        </Card>;
    };


    const actionFigureCard = records && records.map(record =>
        <Grid item xs={12} md={2} key={record.id}>
            <Card className={classes.card} >
                <DisplayNameSection
                    name={record.name}
                    seriesNumber={record.seriesNumber}
                    assortment={record.assortment}
                    series={record.series}
                />
                <CardMedia
                    style={{ paddingTop: '60%', height: '250px' }}
                    image={record.assortment === '40th Anniv' ? record.newImageUrl : record.looseImageUrl}
                    title={record.name}
                />
            </Card>
            <Card className={classes.bottomCard}>
                <CardContent >
                    {generateBottomText(record.sourceMaterial)}
                    {record.additionalNameDetails
                        && generateBottomText('Add Name', ` ${record.additionalNameDetails}`)}
                    {record.version && record.version !== 'Regular'
                        ? generateBottomText('Version', ` ${record.version}`)
                        : null}
                    {!catalog
                        && record.purchasePrice && generateBottomText('Buy', ` $${record.purchasePrice}`)}
                    {!catalog
                        && record.owned
                        && generateBottomText('Qty', ` ${record.newInBoxQty} | ${record.looseCompleteQty} | ${record.looseIncompleteQty}`)}
                </CardContent>
            </Card>
            {catalog && loggedIn && collectionButton(record)}
        </Grid>
    );

    return (

        <React.Fragment>
            <Grid container spacing={2} className={classes.top}>
                <Container component='main' maxWidth='xl'>
                    <Grid container spacing={2} className={classes.top}>
                        {actionFigureCard}
                    </Grid>
                </Container>
            </Grid>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
    top: {
        marginTop: theme.spacing(1),
    },
    card: {
        maxWidth: 325,
        maxHeight: 325,
        borderRadius: 0,
    },
    bottomCard: {
        maxWidth: 325,
        height: props => props.height,
        backgroundColor: Color.primary('black'),
        borderRadius: 0,
    },
    bottomtext: {
        fontSize: '11px',
        color: Color.primary('white')
    },
    buttonCard: {
        maxWidth: 325,
        height: 20,
        borderRadius: 0,
    },
    textStyle: {
        fontWeight: 'bold',
        color: Color.primary('yellow'),
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
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.primary('white'),
        backgroundColor: Color.primary('green'),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'white',
            color: Color.primary('green'),
        },
    },
    owned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '12px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: Color.primary('black'),
        backgroundColor: Color.primary('grey'),
        paddingTop: theme.spacing(.5),
        paddingBottom: theme.spacing(.5),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor:  Color.primary('red'),
            color: Color.primary('black'),
        },
    },
}));