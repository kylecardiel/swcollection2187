import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';

export const VideoGameCard = ({ videoGame }) => {
    const {  
        developer,
        imageFile,
        name,
        price,
        videoGameConsole,
        videoGameSeries,
        videoGameType,
        year,
    } = videoGame;

    const classes = useStyles();

    const buildSystemIcons = () => {
        return videoGameConsole.map(c => {
            if(c.includes('Nintendo')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.NINTENDO} alt='NES' className={classes.icon}></img>;
            if(c.includes('PlayStation')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.PLAYSTATION} alt='PS' className={classes.icon}></img>;
            if(c.includes('Sega')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.SEGA} alt='S' className={classes.icon}></img>;
            if(c.includes('Xbox')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.XBOX} alt='XB' className={classes.icon}></img>;
            return null;
        });
    };

    const singleBottomRowText = (first, second) => {
        return <Grid container direction='row' justify='space-between'>
            <Typography variant="body2" color="textSecondary" component="p">
                {first}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {second}
            </Typography>
        </Grid>;
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title={name}
                subheader={videoGameSeries}
                className={classes.header}
            />
            <CardMedia
                className={classes.media}
                image={isProduction ? imageFile : IMAGE_PATHS.FILL_MURRAY}
                title={name}
            />
            <CardContent>
                {singleBottomRowText(videoGameType, year)}
                {singleBottomRowText(price, developer)}
            </CardContent>
            <CardActions >
                <Grid container direction='row' justify='space-between'>
                    {buildSystemIcons()}
                </Grid>
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '75%', // '56.25%', // 16:9
    },
    header: {
        backgroundColor: Color.black(),
        color: Color.yellow(),
    },
    icon: {
        width: 25, 
        height: 25,
    },
}));

VideoGameCard.propTypes = {
    videoGame: PropTypes.object.isRequired,
};
