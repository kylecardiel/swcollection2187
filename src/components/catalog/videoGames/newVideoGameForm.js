import {
    Button,
    FormControl,
    Input, InputLabel,
    makeStyles,
    MenuItem,
    Select, TextField,
    Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { GENERAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';
import React, { useContext, useEffect, useRef, useState } from 'react';
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

const { CATALOG, ACTION_FIGURES } = FB_STORAGE_CONSTANTS;

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

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const onSubmit = collectible => {
        setSubmitDisabled(true);
        collectible.videoGameConsole = videoGameConsolesSelected;
        Object.keys(collectible).forEach(key => collectible[key] === undefined && delete collectible[key]);
        RecordUtils.addAuditFields(collectible, email);
        console.log(collectible);
        setSubmitDisabled(false);
        closeModal();
    };

    const menuItemNone = <MenuItem key={GENERAL.MENU_ITEMS.NONE} value={null}><em>{GENERAL.MENU_ITEMS.NONE}</em></MenuItem>;

    const { 
        collectionType,
        videoGameConsole,
        videoGameFormat,
        videoGameSeries,
        videoGameType,
    } = formData;


    const generatorInputText = text => {
        return <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
            <Typography variant='subtitle1' className={classes.text}>
                {text}
            </Typography>
        </Grid>;
    };

    const generateSelector = (label, selectorValues, value) => {
        const { KEY, VALUE } = label;
        const defaultValue = value ? value : '';
        return <>
            {generatorInputText(KEY)}
            <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
                <FormControl variant='outlined' className={classes.form}>
                    <InputLabel ref={inputLabel} id={`${VALUE}-label`}>{VALUE}</InputLabel>
                    <Controller
                        name={VALUE}
                        control={control}
                        defaultValue={defaultValue}
                        as={
                            <Select
                                label={VALUE}
                                labelId={VALUE}
                                labelWidth={labelWidth}
                                inputProps={{ name: VALUE }}
                            >
                                {menuItemNone}
                                {selectorValues.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                            </Select>
                        }
                    />
                </FormControl>
            </Grid>
        </>;
    };

    const consoleSelect = () => {
        return <>
            {generatorInputText(LABELS.CONSOLE.KEY)}
            <Grid item xs={12} md={10} className={classes.inputBoxInColumn}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="videoGameConsole-label">{'videoGameConsole'}</InputLabel>
                    <Select
                        labelId="videoGameConsole-label"
                        id="videoGameConsole"
                        multiple
                        value={videoGameConsolesSelected}
                        onChange={handleChange}
                        input={<Input />}
                    >
                        {videoGameConsole.values.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </>;
    };

    const generatorInput = (label, number) => {
        const text = label.KEY;
        const inputName = label.VALUE;
        return <>
            {generatorInputText(text)}
            <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
                <TextField
                    variant='outlined'
                    className={classes.form}
                    fullWidth
                    id={inputName}
                    name={inputName}
                    label={inputName}
                    // value={value}
                    inputRef={register()}
                    type={number ? 'number' : 'string'}
                />
            </Grid>
        </>;
    };

    const generatorImageInput = (text, handleChange) => {
        return <>
            {generatorInputText(text)}
            <Grid item xs={12} md={10} className={classes.inputBoxInColumn}>
                <input type='file' onChange={handleChange} />
            </Grid>
        </>;
    };

    const { LABELS } = NEW_VIDEO_GAME_FORM;
    const collectionTypeInput = generateSelector(LABELS.COLLECTION_TYPE, collectionType.values);
    const videoGameFormatInput = generateSelector(LABELS.VIDEO_GAME_FORMAT, videoGameFormat.values);
    const videoGameSeriesInput = generateSelector(LABELS.VIDEO_GAME_SERIES, videoGameSeries.values);
    const videoGameTypeInput = generateSelector(LABELS.VIDEO_GAME_TYPE, videoGameType.values);
    
    const nameInput = generatorInput(LABELS.NAME);
    const yearInput = generatorInput(LABELS.YEAR, true);
    // const developerInput = generatorInput(LABELS.DEVELOPER);

    const videoGameConsoleSelectInput = consoleSelect();

    const imageInput = generatorImageInput(LABELS.IMAGE.KEY, handleImageChange);

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
                        {nameInput}
                        {yearInput}
                        {/* {developerInput} */}
                    </Grid>
                    <Grid item xs={12} container direction='row' justify='space-between' className={classes.row}>
                        {videoGameConsoleSelectInput}
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
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    conatiner: {
        paddingTop: theme.spacing(2),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 120,
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
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
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
