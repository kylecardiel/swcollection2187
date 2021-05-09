import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { UserConsumer } from 'components/auth/authContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { ActionButton } from 'components/common/buttons/actionButton';

export const VintageCollectionCard = ({ item }) => {
    
    const {  
        additionalNameDetails,
        name,
        newImageUrl,
        seriesNumber,
        year,
    } = item;

    const { id } = useContext(UserConsumer);
    const classes = useStyles();


    const centeredRowText = text => {
        return <Grid container direction='row' justify='center'>
            <Typography variant='body2' color={'textSecondary'} component='p'>
                {text}
            </Typography>
        </Grid>;
    };

    const singleBottomRowText = (first, second) => {
        return <Grid container direction='row' justify='space-between'>
            <Typography variant='body2' color={'textSecondary'} component='p'>
                {first}
            </Typography>
            <Typography variant='body2' color={'textSecondary'} component='p'>
                {second}
            </Typography>
        </Grid>;
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {seriesNumber}
                    </Avatar>
                }
                title={name}
                className={classes.header}
                titleTypographyProps={{ variant: 'subtitle1' }}
            />
            <CardMedia
                className={classes.media}
                image={isProduction ? newImageUrl : IMAGE_PATHS.FILL_MURRAY}
                // image={newImageUrl}
                title={name}
            />
            <CardContent>
                {centeredRowText(additionalNameDetails)}
                {singleBottomRowText('Year', year)}
                <Grid container direction='row' justify='center' className={classes.collectorButton}>
                    <ActionButton
                        buttonLabel={'Add'}
                        onClick={() => console.log('cliecked')}
                        color={Color.green()}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
    },
    media: {
        height: 150,
        paddingTop: '75%', // '56.25%', // 16:9
    },
    header: {
        color: props => props.ownedVG ? Color.yellow() : Color.white(),
        backgroundColor: Color.black(),
        height: 15,
    },
    avatar: {
        backgroundColor: red[500],
        height: 35,
        width: 35,
    },
    collectorButton: {
        paddingTop: theme.spacing(1),
    },
}));

VintageCollectionCard.propTypes = {
    item: PropTypes.object.isRequired,
};
