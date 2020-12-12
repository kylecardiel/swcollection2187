import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Color } from 'shared/styles/color';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

export const HowToCards = ({ route, imagePath, cardText }) => {
    const classes = useStyles();

    return (
        <Link underline='none' component={RouterLink} to={route} className={classes.root}>
            <Card>
                <CardContent className={classes.headerText}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {cardText.TITLE}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        {cardText.BODY}
                    </Typography>
                </CardContent>
                <CardActionArea>
                    {imagePath && 
                        <CardMedia
                            className={classes.media}
                            image={imagePath}
                            title={cardText.TITLE}
                        />
                    }
                </CardActionArea>
            </Card>
        </Link>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    headerText: {
        background: Color.black(),
        color: Color.yellow(),
        fontWeight: 'bold',
    },
    media: {
        height: 250,
    },
}));

HowToCards.propTypes = {
    route: PropTypes.string,
    imagePath: PropTypes.string,
    cardText: PropTypes.object,
};
