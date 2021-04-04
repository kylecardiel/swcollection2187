import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { EXTERNAL_LINKS } from 'shared/constants/externalLinks';
// import { BS_DETAILS_LABEL } from 'shared/constants/stringConstantsSelectors';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const { 
    AMAZON,
    // BEST_BUY,
    // DISNEY,
    // DORKSIDE,
    EBAY,
    // GAMESTOP,
    MERCARI,
    TARGET,
    // WALGREENS,
    WALMART 
} = EXTERNAL_LINKS;

export const RetailDetailCard = ({ additionalNameDetails, name, exclusiveRetailer }) => {
    const classes = useStyles();

    const generateDetail = (label, link) => {
        return <div className={classes.detailRow} >
            <a href={link} target='_blank' rel='noopener noreferrer'>
                <Typography variant='body2' color={'textSecondary'} component='span'>
                    <Box  >
                        {label}
                    </Box>
                </Typography>
            </a>
            <ShoppingCartIcon />
        </div>;
    };

    const buildLink = space => {
        return `${name.replace(' ', space)}${space}${additionalNameDetails.replace(' ', space)}`;
    };

    const SPACE_REPLACER = '%20';
    const SPACE_REPLACER_II = '+';
    
    const plusLink = buildLink(SPACE_REPLACER_II);
    const percentLink = buildLink(SPACE_REPLACER);

    return (
        <Card className={classes.card}>
            <CardContent>
                {/* <Typography gutterBottom variant='h5' component='h2'>
                    {BS_DETAILS_LABEL.RETAILERS}
                </Typography> */}
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={6} className={classes.retailContainer}>
                        <Typography gutterBottom variant='body1' component='span'>
                            {'Retailers'}
                        </Typography>
                        <Divider />
                        {generateDetail(AMAZON.NAME, AMAZON.LINK(plusLink.toLowerCase()))}
                        {/* {generateDetail(BEST_BUY.NAME, BEST_BUY.LINK)} */}
                        {/* {generateDetail(DISNEY.NAME, DISNEY.LINK)} */}
                        {/* {generateDetail(DORKSIDE.NAME, DORKSIDE.LINK)} */}
                        {/* {generateDetail(GAMESTOP.NAME, GAMESTOP.LINK)} */}
                        {generateDetail(TARGET.NAME, TARGET.LINK(plusLink.toLowerCase()))}
                        {/* {generateDetail(WALGREENS.NAME, WALGREENS.LINK)} */}
                        {generateDetail(WALMART.NAME, WALMART.LINK(percentLink.toLowerCase()))}
                    </Grid>
                    <Grid item xs={6} className={classes.retailContainer}>
                        <Typography gutterBottom variant='body1' component='span'>
                            {'Resellers'}
                        </Typography>
                        <Divider />
                        {generateDetail(EBAY.NAME, EBAY.LINK)}
                        {generateDetail(MERCARI.NAME, MERCARI.LINK(percentLink.toLowerCase()))}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
    },
    retailContainer: {
        padding: theme.spacing(3),
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

RetailDetailCard.propTypes = {
    additionalNameDetails: PropTypes.string,
    name:  PropTypes.string.isRequired,
    exclusiveRetailer: PropTypes.string,
};
