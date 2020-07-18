import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
    card: {
        minWidth: 325,
    },
    media: {
        height: 250,
    },
});

export const MediaCard = props => {
    const classes = useStyles();

    return (
        <Link underline='none' component={RouterLink} to={props.route}>
            <Card className={classes.card}>
                <CardActionArea>
                    {props.imagePath && 
                        <CardMedia
                            className={classes.media}
                            image={props.imagePath}
                            title={props.cardText.TITLE}
                        />
                    }
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.cardText.TITLE}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {props.cardText.BODY}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}