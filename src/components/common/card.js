import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

export const MediaCard = ({ route, imagePath, cardText}) => {
    const classes = useStyles();

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
                            {cardText.BODY}
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
});