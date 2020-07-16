import React from 'react';
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

export const ActionFigure = ({ records }) => {
    const classes = useStyles();

    const generateBottomText = (label, value) => {
        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} >
            <span className={classes.textStyle}>{`${label}:`}</span>
            {value}
        </Typography>
    }

    const actionFigureCard = records && records.map(record =>
        <Grid item xs={12} md={2}>
            <Card className={classes.card} key={record.id}>
                <DisplayNameSection
                    name={record.name}
                    seriesNumber={record.seriesNumber}
                    assortment={record.assortment}
                    series={record.series}
                />

                <CardMedia
                    style={{ paddingTop: '60%', height: '250px' }}
                    image={record.assortment === '40th Anniv' ? record.newImageUrl : record.looseImageUrl}
                    title={record.id}
                />
            </Card>
            <Card className={classes.bottomCard} key={record.id}>
                <CardContent >
                    {generateBottomText('Add', ` ${record.additionalNameDetails}`)}
                    {generateBottomText('ASMT', ` ${record.assortment}`)}
                    {generateBottomText('Version', ` ${record.version}`)}
                    {generateBottomText('Buy', ` $${record.purchasePrice}`)}
                    {generateBottomText('Qty', ` ${record.newInBoxQty} | ${record.looseCompleteQty} | ${record.looseIncompleteQty}`)}
                </CardContent>
            </Card>
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
    },
    bottomCard: {
        maxWidth: 325,
        maxHeight: 325,
        backgroundColor: Color.primary('black'),
    },
    bottomtext: {
        fontSize: '11px',
        color: Color.primary('white')
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
}));