import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import AddBoxIcon from '@material-ui/icons/AddBox';

const { HOME } = ROUTE_CONSTANTS;

export const FuturePlans = () => {
    const classes = useStyles();

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const generateHowToRow = (text, icon) => {
        return <>
            <Divider/>
            <Grid 
                item xs={12} 
                container 
                direction='row' 
                justify='space-between' 
                className={classes.row} 
            >
                <Typography variant='body2' component='span' className={classes.text}>
                    <Box fontWeight='fontWeightBold'>
                        {text}
                    </Box>
                </Typography>
                {icon}
            </Grid>
        </>;
    };

    const completedPlan = <CheckCircleIcon fontSize='large' style={{ color: Color.green() }}/> ;
    const inProgesssPlan =  <RotateRightIcon fontSize='large' style={{ color: Color.blue() }}/>;
    const nextPlan = <AddBoxIcon fontSize='large' style={{ color: Color.lightGrey() }}/>;

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.FUTURE_PLANS.TITLE} />
            <Container component='main' maxWidth='md' className={classes.container}>
                <Grid container direction='column'>
                    <Grid item xs={12} container direction='column' alignItems='center'>
                        <Typography component='h2' className={classes.text}>
                            <Box fontWeight='fontWeightBold'>
                                {PAGES.FUTURE_PLANS.LIST.TITLE}
                            </Box>
                        </Typography>
                        <Typography variant='body2' component='p' className={classes.aboutText}>
                            {PAGES.FUTURE_PLANS.LIST.ABOUT}
                        </Typography>
                    </Grid>
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.BLACK_SERIES, completedPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.VIDEO_GAMES, completedPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.VINTAGE_COLLECTION, inProgesssPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.MOVIES, nextPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.POWER_OF_THE_FORCE, nextPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.STAR_WARS_LEGO, nextPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.MICRO_MACHINES_ACTION_FLEET, nextPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.VINTAGE_FIGURES, nextPlan)}
                    {generateHowToRow(PAGES.FUTURE_PLANS.LIST.BLACK_SERIES_LIGHT_SABERS, nextPlan)}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
    },
    row:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    text: {
        paddingTop: theme.spacing(.5),
    },
    aboutText: {
        textAlign: 'center',
    },
}));
