import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { AddAppToHomeScreen } from 'components/howTo/addAppToHomeScreen';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { modalStyles } from 'shared/styles/modalStyles';
import PropTypes from 'prop-types';

const { HOME } = ROUTE_CONSTANTS;

export const HowTo = ({ screenSize }) => {
    const classes = useStyles();

    const [howToComponent, setHowToComponent] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = component => {
        setHowToComponent(component);
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => setIsModalOpen(!isModalOpen);

    const modalSize = () => {
        if(screenSize.isLargeDesktopOrLaptop){
            return { height: '65%', width: '20%' };
        } else if (screenSize.isMediumDesktopOrLaptop) {
            return { height: '75%', width: '25%' };
        } else {
            return { height: '80%', width: '95%' };
        }
    };

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const generateHowToRow = (text, modalComponent) => {
        return <>
            <Divider/>
            <Grid 
                item xs={12} 
                container 
                direction='row' 
                justify='space-between' 
                className={classes.row} 
                onClick={() => openModal(modalComponent)}
            >
                <Typography variant='body2' component='p' className={classes.text}>
                    <Box fontWeight='fontWeightBold'>
                        {text}
                    </Box>
                </Typography>
                <InfoOutlinedIcon/>
            </Grid>
        </>;
    };

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.HOW_TO.TITLE} />
            <Container component='main' maxWidth='md' className={classes.container}>
                <Grid container direction='column'>
                    <Grid item xs={12} container direction='row' justify='center'>
                        <h3>{PAGES.HOW_TO.TITLE}</h3>
                    </Grid>
                    {generateHowToRow(PAGES.HOW_TO.ADD_TO_HOME_SCREEN_SCENE.TITLE, <AddAppToHomeScreen setIsModalOpen={setIsModalOpen}/>)}
                </Grid>
            </Container>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize())}
            >
                {howToComponent}
            </Modal>
        </React.Fragment>
    );
};

HowTo.propTypes = {
    screenSize: PropTypes.object.isRequired,
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
        cursor: 'pointer',
    },
    text: {
        paddingTop: theme.spacing(.5),
    },
}));
