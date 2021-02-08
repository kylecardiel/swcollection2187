import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';

export const VideoGameCard = ({ videoGame }) => {
    const classes = useStyles();

    const buildSystemIcons = () => {
        return videoGame.videoGameConsole.map(c => {
            if(c.includes('Nintendo')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.NINTENDO} alt='PS' className={classes.icon}></img>;
            if(c.includes('PlayStation')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.PLAYSTATION} alt='PS' className={classes.icon}></img>;
            if(c.includes('Sega')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.SEGA} alt='PS' className={classes.icon}></img>;
            if(c.includes('Xbox')) return <img key={c} src={IMAGE_PATHS.VIDEO_GAMES.XBOX} alt='PS' className={classes.icon}></img>;
            return null;
        });
    };


    return (
        <Card className={classes.root}>
            <CardHeader
                title={videoGame.videoGameName}
                subheader={videoGame.videoGameSeries}
                className={classes.header}
            />
            <CardMedia
                className={classes.media}
                image={IMAGE_PATHS.FILL_MURRAY}
                title={videoGame.videoGameName}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {videoGame.videoGameType}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {videoGame.year}
                </Typography>
            </CardContent>
            <CardActions >
                {buildSystemIcons()}
            </CardActions>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
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
        width: 40, 
        height: 40,
    },
}));

VideoGameCard.propTypes = {
    videoGame: PropTypes.object.isRequired,
};
