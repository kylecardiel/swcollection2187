import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ActionButton } from 'components/common/buttons/actionButton';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { BS_CARD_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { UserConsumer } from 'components/auth/authContext';

export const VideoGameCard = ({ item }) => {
    
    const {  
        imageFile,
        name,
        owned,
        ownedId,
        videoGameConsole,
        videoGameType,
        year,
    } = item;

    const classes = useStyles();
    const { id } = useContext(UserConsumer);
    const [ownedVG, setOwnedVG] = useState(owned);

    const addToCollection = () => {
        let newCollectile = {
            catalogId: item.id,
            owned: true,
            purchasePrice: 0,
        };

        setOwnedVG(!ownedVG);
        UserApi.create(id, FB_DB_CONSTANTS.VIDEO_GAMES, newCollectile);
    };

    const removeFromCollection = () => {
        setOwnedVG(!ownedVG);
        UserApi.delete(id, FB_DB_CONSTANTS.VIDEO_GAMES, ownedId);
    };

    const onclickCard = () => {
        return ownedVG
            ? () => removeFromCollection()
            : () => addToCollection();
    };


    const buildSystemIcons = () => {
        let android, apple, nintendo, playstation, sega, windows, xbox = false;

        videoGameConsole.map(c => {
            if(c.includes('Android')) android = true;
            if(c.includes('macOS') || c.includes('iOS') || c.includes('Macintosh') || c.includes('Classic Mac OS') || c.includes('Apple II')) apple = true;
            if(c.includes('Nintendo') || c.includes('GameCube') || c.includes('Wii') || c.includes('Switch') || c.includes('Game Boy')) nintendo = true;
            if(c.includes('PlayStation')) playstation = true;
            if(c.includes('Sega')) sega = true;
            if(c.includes('Windows')) windows = true;
            if(c.includes('Xbox')) xbox = true;
            return null;
        });

        return <>
            {android && <img key={'android'} src={IMAGE_PATHS.VIDEO_GAMES.ANDROID} alt='android' className={classes.icon}></img>}
            {apple && <img key={'apple'} src={IMAGE_PATHS.VIDEO_GAMES.APPLE} alt='apple' className={classes.icon}></img>}
            {nintendo && <img key={'NES'} src={IMAGE_PATHS.VIDEO_GAMES.NINTENDO} alt='NES' className={classes.iconLonger}></img>}
            {playstation && <img key={'PS'} src={IMAGE_PATHS.VIDEO_GAMES.PLAYSTATION} alt='PS' className={classes.icon}></img>}
            {sega && <img key={'S'} src={IMAGE_PATHS.VIDEO_GAMES.SEGA} alt='S' className={classes.icon}></img>}
            {windows && <img key={'W'} src={IMAGE_PATHS.VIDEO_GAMES.WINDOWS} alt='W' className={classes.icon}></img>}
            {xbox && <img key={'X'} src={IMAGE_PATHS.VIDEO_GAMES.XBOX} alt='X' className={classes.icon}></img>}
        </>;
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
                className={classes.header}
                titleTypographyProps={{ variant: 'subtitle1' }}
            />
            <CardMedia
                className={classes.media}
                image={isProduction ? imageFile : IMAGE_PATHS.FILL_MURRAY}
                title={name}
            />
            <CardContent>
                {singleBottomRowText(videoGameType, year)}
                <Grid container direction='row' justify='space-between' className={classes.systemIconRow}>
                    {buildSystemIcons()}
                </Grid>
                <Grid container direction='row' justify='center' className={classes.collectorButton}>
                    <ActionButton
                        buttonLabel={ownedVG ? BS_CARD_BUTTONS.REMOVE : BS_CARD_BUTTONS.ADD}
                        onClick={onclickCard()}
                        color={ownedVG ? Color.red() : Color.green()}
                    />
                </Grid>
            </CardContent>
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
        width: 25, 
        height: 25,
    },
    iconLonger: {
        width: 55, 
        height: 25,
    },
    collectorButton: {
        paddingTop: theme.spacing(1),
    },
    systemIconRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

VideoGameCard.propTypes = {
    item: PropTypes.object.isRequired,
};
