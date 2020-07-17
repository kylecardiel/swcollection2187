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

export const ActionFigure = ({ catalog, records }) => {
    const classes = useStyles({height: catalog ? 75 : 125});

    const generateBottomText = (label, value) => {
        return <Typography variant='body2' color='textSecondary' component='p' className={classes.bottomtext} >
            <span className={classes.textStyle}>{`${label}`}</span>
            {value}
        </Typography>
    }

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
                    title={record.id}
                />
            </Card>
            <Card className={classes.bottomCard}>
                <CardContent >
                    {generateBottomText(record.sourceMaterial)}
                    {record.additionalNameDetails 
                        && generateBottomText('Add Name', ` ${record.additionalNameDetails}`)}
                    {record.version !== 'Regular' 
                        ? generateBottomText('Version', ` ${record.version}`) 
                        : null}
                    {!catalog 
                        && record.purchasePrice && generateBottomText('Buy', ` $${record.purchasePrice}`)}
                    {!catalog 
                        && (record.newInBoxQty || record.looseCompleteQty || record.looseIncompleteQty) 
                        && generateBottomText('Qty', ` ${record.newInBoxQty} | ${record.looseCompleteQty} | ${record.looseIncompleteQty}`)}
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