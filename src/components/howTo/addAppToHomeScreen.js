import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { ActionButton } from 'components/common/buttons/actionButton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { GENERAL, PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { HOW_TO: { ADD_TO_HOME_SCREEN } }  = IMAGE_PATHS;
const { HOW_TO : { ADD_TO_HOME_SCREEN_SCENE } } = PAGES;
const { BUTTON } = GENERAL;

export const AddAppToHomeScreen = ({ setIsModalOpen }) => {
    const classes = useStyles();
    
    const generateScene = (text, path) => {
        return <>
            <Typography variant='body2' component='p' className={classes.stepText}>
                <Box fontWeight={'fontWeightBold'} >
                    {text}
                </Box>
            </Typography>
            <img className={classes.largeImage} alt='complex' src={path} />
        </>    
        ;
    };

    const sceneOne = generateScene(ADD_TO_HOME_SCREEN_SCENE.STEP_1, ADD_TO_HOME_SCREEN.STEP_1);
    const sceneTwo = generateScene(ADD_TO_HOME_SCREEN_SCENE.STEP_2, ADD_TO_HOME_SCREEN.STEP_2);
    const sceneThree = generateScene(ADD_TO_HOME_SCREEN_SCENE.STEP_3, ADD_TO_HOME_SCREEN.STEP_3);
    const sceneFour = generateScene(ADD_TO_HOME_SCREEN_SCENE.STEP_4, ADD_TO_HOME_SCREEN.STEP_4);

    const [currentScene, setCurrentScene] = useState(sceneOne);
    const [currentSceneNumber, setCurrentSceneNumber] = useState(1);

    const changeToNextScene = () => {

        switch(currentSceneNumber){
        case 1:
            setCurrentSceneNumber(2);
            setCurrentScene(sceneTwo);
            break;
        case 2:
            setCurrentSceneNumber(3);
            setCurrentScene(sceneThree);
            break;
        case 3:
            setCurrentSceneNumber(4);
            setCurrentScene(sceneFour);
            break;
        case 4: 
            setIsModalOpen(false);
            break;
        default:
            break;
        }
    };

    const continueButtonLabel = currentSceneNumber !== 4 ? BUTTON.CONTINUE : BUTTON.DONE;

    const continueButton = <ActionButton
        buttonLabel={continueButtonLabel}
        color={Color.blue()}
        onClick={changeToNextScene}
    />;

    const generateCorrectMeatBallPlaceholder = number => {
        return currentSceneNumber === number ? <FiberManualRecordIcon fontSize='small' key={number}/> : <FiberManualRecordOutlinedIcon fontSize='small' key={number}/>;
    };

    const numberOfScenes = [1,2,3,4];

    return (
        <Grid container direction='column' alignItems='center'>
            {currentScene}
            {continueButton}
            <Grid item xs={12} container direction='row' justifyContent='center' className={classes.meatballs}>
                {numberOfScenes.map(s => generateCorrectMeatBallPlaceholder(s))}
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    stepText:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    largeImage: {
        flexShrink: 0,
        maxHeight: 500,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    meatballs: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

AddAppToHomeScreen.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired,
};
