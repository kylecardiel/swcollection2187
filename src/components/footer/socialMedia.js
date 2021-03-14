import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { EXTERNAL_LINKS } from 'shared/constants/externalLinks';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';

const { SOCIAL_MEDIA } = IMAGE_PATHS;

export const SocialMedia = () => {
    const classes = useStyles();
    const buildSocialMediaIcon = (link, image, alt) => {
        return <a href={link}>
            <img src={image} alt={alt} className={classes.icons}/>
        </a>;
    };

    return (
        <div className={classes.container}>
            {buildSocialMediaIcon(EXTERNAL_LINKS.FACEBOOK, SOCIAL_MEDIA.FACEBOOK, 'facebook')}
            {buildSocialMediaIcon(EXTERNAL_LINKS.INSTAGRAM, SOCIAL_MEDIA.INSTAGRAM, 'instagram')}
            {buildSocialMediaIcon(EXTERNAL_LINKS.TWITTER, SOCIAL_MEDIA.TWITTER, 'twitter')}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
    },
    icons: {
        width: 35, 
        height: 35,
        paddingRight: theme.spacing(1),
    },
}));