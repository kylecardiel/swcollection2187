import {
    Card,
    CardContent,
    CardMedia, Container, Grid,
    makeStyles, Typography
} from '@material-ui/core';
import { UserConsumer } from 'components/auth/authContext';
import { DisplayNameSection } from 'components/display/displayName';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROLES } from 'shared/constants/roleConstants';
import { Color } from 'shared/styles/color';

export const ActionFigure = ({ records, newBoxImage, catalogList, showAssortmentHeaders, view }) => {
    const classes = useStyles();
    const { loggedIn, id, email } = useContext(UserConsumer);

    const authEmail = email === ROLES.EMAIL;

    const generateBottomText = (label, value) => {
        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} >
            <span className={classes.textStyle}>{`${label} `}</span>
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
        <Grid item xs={12} md={2} key={record.id}>
            <Link
                to={{
                    pathname: `${url}/${record.id}`,
                    state: { 
                        figure: record,
                        catalogList: catalogList,
                    }
                }}
                style={{ textDecoration: 'none' }}
            >
                <Card className={classes.card} >
                    <DisplayNameSection
                        name={record.name}
                        seriesNumber={record.seriesNumber}
                        assortment={record.assortment}
                        series={record.series}
                    />
                    <CardMedia
                        style={{ paddingTop: '60%', height: 250 }}
                        image={
                            newBoxImage
                                ? (record.newImageUrl || IMAGE_PATHS.FILL_MURRAY)
                                : (record.looseImageUrl || IMAGE_PATHS.FILL_MURRAY)
                        }
                        title={record.name}
                        src={record.name}
                    />
                </Card>
                <Card className={classes.bottomCard}>
                    <CardContent >
                        {record.additionalNameDetails && generateBottomText('', `( ${record.additionalNameDetails} )`)}
                        {generateBottomText(record.sourceMaterial)}
                        {!showAssortmentHeaders && generateBottomText('', `${record.assortment}`)}
                        {record.version && generateBottomText('Version: ', ` ${record.version}`)}
                        {record.multipack && generateBottomText('', ` [${record.multipack}]`)}
                        {record.exclusiveRetailer && generateBottomText('', ` ${record.exclusiveRetailer}`)}
                        {record.owned
                            && record.purchasePrice && generateBottomText('Buy', ` $${record.purchasePrice}`)}
                        {record.owned
                            && generateBottomText('Total Owned: ', ` ${record.newInBoxQty + record.looseCompleteQty + record.looseIncompleteQty}`)}
                        
                        {authEmail && generateBottomText(record.id)}
                    </CardContent>
                </Card>
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
        marginTop: theme.spacing(1),
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