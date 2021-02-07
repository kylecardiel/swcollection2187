import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { GENERAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';
import React, { useContext, useEffect, useState } from 'react';
import { CatalogApi } from 'shared/api/catalogApi';
import { Color } from 'shared/styles/color';
import Container from '@material-ui/core/Container';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Grid from '@material-ui/core/Grid';
import { ProgressBar } from 'components/common/progressBar';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { storage } from 'backend/Firebase';
import { UserConsumer } from 'components/auth/authContext';
import { MultiSelector } from 'components/common/form/newFormSelectors/multiSelector';
import { InputText } from 'components/common/form/newFormSelectors/inputText';
import { InputImage } from 'components/common/form/newFormSelectors/inputImage';
import { InputSelector } from 'components/common/form/newFormSelectors/inputSelector';
import { makeStyles } from '@material-ui/core/styles';
import { uploadImageToStorage } from 'shared/util/upload';

const { CATALOG, VIDEO_GAMES } = FB_STORAGE_CONSTANTS;

export const NewVideoGameForm = ({ closeModal, formData }) => {
    const classes = useStyles();
    const { email } = useContext(UserConsumer);
 
    const { register, handleSubmit, control } = useForm();

    const [videoGameConsolesSelected, setVideoGameConsolesSelected] = useState([]);
    const [imageFile, setImageFile] = useState();
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const handleChange = e => setVideoGameConsolesSelected(e.target.value);

    const handleImageChange = e => {
        if (e.target.files[0]) setImageFile(e.target.files[0]);
    };

    const buildUploadedImagePath = name => {
        return `${CATALOG}${VIDEO_GAMES}/${name}`;
    };

    const onSubmit = async collectible => {
        setSubmitDisabled(true);
        collectible.videoGameConsole = videoGameConsolesSelected;
        // if(imageFile) collectible.imageFile = await uploadImageToStorage(buildUploadedImagePath(imageFile.name), imageFile, setPercentage);
        Object.keys(collectible).forEach(key => collectible[key] === undefined && delete collectible[key]);
        RecordUtils.addAuditFields(collectible, email);
        console.log(collectible);
        setSubmitDisabled(false);
        closeModal();
    };

    const { 
        collectionType,
        videoGameConsole,
        videoGameFormat,
        videoGameSeries,
        videoGameType,
    } = formData;


    const { LABELS } = NEW_VIDEO_GAME_FORM;
    
    const collectionTypeInput = <InputSelector
        control={control}
        label={LABELS.COLLECTION_TYPE}
        menuItems={collectionType.values}
    />;

    const videoGameFormatInput = <InputSelector
        control={control}
        label={LABELS.VIDEO_GAME_FORMAT}
        menuItems={videoGameFormat.values}
    />;

    const videoGameSeriesInput = <InputSelector
        control={control}
        label={LABELS.COLLECTION_TYPE}
        menuItems={videoGameSeries.values}
    />;

    const videoGameTypeInput = <InputSelector
        control={control}
        label={LABELS.COLLECTION_TYPE}
        menuItems={videoGameType.values}
    />;


    const videoGameNameInput = <InputText
        label={LABELS.NAME}
        register={register}
    />;
    
    const videoGameYearInput = <InputText
        label={LABELS.YEAR}
        register={register}
        isNumber
    />;
    
    const videoGameConoleInput = <MultiSelector
        currentValue={videoGameConsolesSelected}
        handleChange={handleChange}
        label={LABELS.CONSOLE}
        menuItems={videoGameConsole.values}
    />;
    
    const imageInput = <InputImage 
        handleChange={handleImageChange}
        text={LABELS.IMAGE.KEY} 
    />;

    return (
        <React.Fragment>
            <FormHeaderSection text={NEW_VIDEO_GAME_FORM.HEADER} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                { submitDisabled && 
                    <div className={classes.progressBar}>
                        <ProgressBar percentage={percentage}/> 
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} container direction='row' justify='space-between' className={classes.row}>
                        {collectionTypeInput}
                        {videoGameFormatInput}
                        {videoGameSeriesInput}
                        {videoGameTypeInput}
                        {videoGameNameInput}
                        {videoGameYearInput}
                    </Grid>
                    <Grid item xs={12} container direction='row' justify='space-between' className={classes.row}>
                        {videoGameConoleInput}
                    </Grid>
                    <Grid item xs={12} container direction='row' justify='space-between' className={classes.row}>
                        {imageInput}
                    </Grid>
                    <Grid item xs={12} className={classes.submitButtonrow}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            className={classes.submit}
                            disabled={submitDisabled}
                        >
                            {GENERAL.BUTTON.SUBMIT}
                        </Button>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    conatiner: {
        paddingTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        backgroundColor: Color.blue(),
        color: Color.white(),
        '&:hover': {
            color: Color.blue(),
            backgroundColor: Color.white(),
        },
    },
    submitButtonrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    progressBar: {
        margin: theme.spacing(2),
    },
}));

NewVideoGameForm.propTypes = {
    closeModal: PropTypes.func.isRequired, 
    formData: PropTypes.object.isRequired,
    figure:  PropTypes.object,
};
