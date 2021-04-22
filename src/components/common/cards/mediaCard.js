import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const MediaCard = ({ route, imagePath, cardText, tag, tagColor }) => {
    const classes = useStyles({ tagColor });

    return (
        <Link underline='none' component={RouterLink} to={route}>
            <Card className={classes.card}>
                <CardActionArea>
                    {imagePath && 
                        <CardMedia
                            className={classes.media}
                            image={imagePath}
                            title={cardText.TITLE}
                        />
                    }
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {cardText.TITLE}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>

                            <Grid container direction='row' justify='space-between' spacing={1} >
                                <Grid item xs={9} >
                                    {cardText.BODY}
                                </Grid>
                                <Grid item xs={3} className={classes.tag}>
                                    {tag}
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

const useStyles = makeStyles({
    card: {
        minWidth: 325,
    },
    media: {
        height: 250,
    },
    tag: {
        border: '3px solid',
        borderColor: props => props.tagColor,
        borderRadius: '15px',
        textAlign: 'center',
        color: props => props.tagColor,
        fontWeight: 'bold',
    },
});

MediaCard.propTypes = {
    cardText: PropTypes.object,
    imagePath: PropTypes.string,
    route: PropTypes.string,
    tag: PropTypes.string,
    tagColor: PropTypes.string,
};
