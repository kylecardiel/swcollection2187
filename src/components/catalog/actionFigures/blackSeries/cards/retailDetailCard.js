import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import React from 'react';
import { EXTERNAL_LINKS } from 'shared/constants/externalLinks';

export const RetailDetailCard = ({ additionalNameDetails, name, exclusiveRetailer }) => {
    const classes = useStyles();

    // TODO: 
    //  - Ebay dynamic link
    //  - If exclusiveRetailer = Online exclusive asign dorkside..

    const retailers = [exclusiveRetailer, 'Amazon', 'Walmart'];
    const exclusiveRetailerLinks = () => {
        return <>
            {Object.keys(EXTERNAL_LINKS).map(key => {
                if(retailers.includes(EXTERNAL_LINKS[key].NAME) && !EXTERNAL_LINKS[key].RESELLER){
                    const dynamicLink = buildLink(EXTERNAL_LINKS[key].SPACE_REPLACER).toLowerCase();
                    return generateDetail(EXTERNAL_LINKS[key].NAME, EXTERNAL_LINKS[key].LINK(dynamicLink));
                }
                return null;
            })

            }
        </>;
    };

    const generateDetail = (label, link) => {
        return <div className={classes.detailRow} key={label}>
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

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={6} className={classes.retailContainer}>
                        <Typography gutterBottom variant='body1' component='span'>
                            {'Retailers'}
                        </Typography>
                        <Divider />
                        {exclusiveRetailerLinks()}
                    </Grid>
                    <Grid item xs={6} className={classes.retailContainer}>
                        <Typography gutterBottom variant='body1' component='span'>
                            {'Resellers'}
                        </Typography>
                        <Divider />
                        {generateDetail(EXTERNAL_LINKS.MERCARI.NAME, EXTERNAL_LINKS.MERCARI.LINK(buildLink(EXTERNAL_LINKS.MERCARI.SPACE_REPLACER).toLowerCase()))}
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
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}));

RetailDetailCard.propTypes = {
    additionalNameDetails: PropTypes.string,
    name:  PropTypes.string.isRequired,
    exclusiveRetailer: PropTypes.string,
};
