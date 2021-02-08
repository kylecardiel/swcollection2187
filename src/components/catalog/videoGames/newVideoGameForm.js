import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { InputImage } from 'components/common/form/newFormSelectors/inputImage';
import { InputSelector } from 'components/common/form/newFormSelectors/inputSelector';
import { InputText } from 'components/common/form/newFormSelectors/inputText';
import { MultiSelector } from 'components/common/form/newFormSelectors/multiSelector';
import { ProgressBar } from 'components/common/progressBar';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CatalogApi } from 'shared/api/catalogApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';
import { GENERAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { uploadImageToStorage } from 'shared/util/upload';

const { CATALOG, VIDEO_GAMES } = FB_STORAGE_CONSTANTS;

export const NewVideoGameForm = ({ setIsModalOpen, formData }) => {
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
        if(imageFile) collectible.imageFile = await uploadImageToStorage(buildUploadedImagePath(imageFile.name), imageFile, setPercentage);
        
        Object.keys(collectible).forEach(key => collectible[key] === undefined && delete collectible[key]);
        RecordUtils.addAuditFields(collectible, email);
        CatalogApi.create(FB_DB_CONSTANTS.VIDEO_GAMES, collectible);
        
        setSubmitDisabled(false);
        setIsModalOpen(false);
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
        label={LABELS.VIDEO_GAME_SERIES}
        menuItems={videoGameSeries.values}
    />;

    const videoGameTypeInput = <InputSelector
        control={control}
        label={LABELS.VIDEO_GAME_TYPE}
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

    const videoGamePriceInput = <InputText
        label={LABELS.PRICE}
        register={register}
    />;

    const videoGameDeveloperInput = <InputText
        label={LABELS.DEVELOPER}
        register={register}
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
                        {videoGamePriceInput}
                        {videoGameDeveloperInput}
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
    setIsModalOpen: PropTypes.func.isRequired, 
    formData: PropTypes.object.isRequired,
};
