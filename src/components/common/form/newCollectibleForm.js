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
import { GENERAL, NEW_COLLECTION_FORM } from 'shared/constants/stringConstantsSelectors';
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

export const NewCollectibleForm = ({ closeModal, formData, figure }) => {
    const classes = useStyles();
    const { email } = useContext(UserConsumer);
 
    const setDefaults = () => {
        return figure 
            ? { defaultValues: figure } 
            : {
                additionalNameDetails: '',
                assortment: '',
                collectionType: '',
                exclusiveRetailer: '',
                name: '',
                mulitipack: '',
                packageType: '',
                retailPrice: '',
                series: '',
                seriesNumber: '',
                sourceMaterial: '',
                sourceType: '',
                version: '',
                wave: '',
                year: '',
            };
    };

    const { register, handleSubmit, control, watch } = useForm(setDefaults());

    const additionalNameDetails = watch('additionalNameDetails');
    const assortmentWatcher = watch('assortment');
    const collectionTypeWatcher = watch('collectionType');
    const exclusiveRetailerWatcher = watch('exclusiveRetailer');
    const name = watch('name');
    const mulitipack = watch('mulitipack');
    const retailPrice = watch('retailPrice');
    const packageTypeWatcher = watch('packageType');
    const seriesWatcher = watch('series');
    const seriesNumber = watch('seriesNumber');
    const sourceMaterialWatcher = watch('sourceMaterial');
    const sourceTypeWatcher = watch('sourceType');
    const versionWatcher = watch('version');
    const wave = watch('wave');
    const year = watch('year');

    const defaultGroups = figure ? figure.groups : [];
    const [groupsSelected, setGroupsSelected] = useState(defaultGroups);

    const [looseFigureImageFile, setLooseFigureImageFile] = useState(null);
    const [looseBlackFigureImageFile, setBlackLooseFigureImageFile] = useState(null);
    const [newFigureImageFile, setNewFigureImageFile] = useState(null);

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const handleChange = e => setGroupsSelected(e.target.value);

    const handleLooseImageChange = e => {
        if (e.target.files[0]) setLooseFigureImageFile(e.target.files[0]);
    };

    const handleBlacLoosekImageChange = e => {
        if (e.target.files[0]) setBlackLooseFigureImageFile(e.target.files[0]);
    };

    const handleNewImageChange = e => {
        if (e.target.files[0]) setNewFigureImageFile(e.target.files[0]);
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const upload = async (image, assortment) => {
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref(`${CATALOG}${ACTION_FIGURES.BLACK_SERIES}${assortment}/${image.name}`).put(image);
            uploadTask.on('state_changed',
                snapshot => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentage(progress);
                },
                function error(err) {
                    console.log('error', err);
                    reject();
                },
                function complete() {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        resolve(downloadURL);
                    });
                },
            );
        });
    };

    const onSubmit = async collectible => {
        setSubmitDisabled(true);
        collectible.groups = groupsSelected;
        
        if(figure) {
            collectible.looseImageUrl = figure.looseImageUrl;
            collectible.looseBlackImageUrl = figure.looseBlackImageUrl;
            collectible.newImageUrl = figure.newImageUrl;
            Object.keys(collectible).forEach(key => collectible[key] === undefined && delete collectible[key]);
            RecordUtils.updateLastModifiedAuditFields(collectible, email);
            CatalogApi.update(FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, collectible, figure.id);

        } else {
            if(looseFigureImageFile) collectible.looseImageUrl = await upload(looseFigureImageFile, collectible.assortment);
            if(looseBlackFigureImageFile) collectible.looseBlackImageUrl = await upload(looseBlackFigureImageFile, collectible.assortment);
            if(newFigureImageFile) collectible.newImageUrl = await upload(newFigureImageFile, collectible.assortment);
    
            collectible.groups = groupsSelected;
            Object.keys(collectible).forEach(key => collectible[key] === undefined && delete collectible[key]);
            RecordUtils.addAuditFields(collectible, email);
            CatalogApi.create(FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, collectible);
        }
        setSubmitDisabled(false);
        closeModal();
    };

    const menuItemNone = <MenuItem key={GENERAL.MENU_ITEMS.NONE} value={null}><em>{GENERAL.MENU_ITEMS.NONE}</em></MenuItem>;

    const { 
        assortment, 
        collectionType,
        exclusiveRetailer,
        groups,
        packageType,
        series,
        sourceMaterial, 
        sourceType,
        version,
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

    const groupSelect = () => {
        return <>
            {generatorInputText('Groups')}
            <Grid item xs={12} md={10} className={classes.inputBoxInColumn}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="Groups-label">{'Groups'}</InputLabel>
                    <Select
                        labelId="Groups-label"
                        id="groups"
                        multiple
                        value={groupsSelected}
                        onChange={handleChange}
                        input={<Input />}
                    >
                        {groups.values.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </>;
    };

    const generatorInput = (label, value, number) => {
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
                    value={value}
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

    const formattedSourceMaterial = convertArrayObjectToArrayOfObjectProperty(sourceMaterial, 'name');
    const formattedAssortment = convertArrayObjectToArrayOfObjectProperty(assortment, 'name');

    const { LABELS } = NEW_COLLECTION_FORM;
    const assortmentInput = generateSelector(LABELS.ASSORTMENT, formattedAssortment, assortmentWatcher);
    const collectionTypeInput = generateSelector(LABELS.COLLECTION_TYPE, collectionType.values, collectionTypeWatcher);
    const exclusiveRetailerInput = generateSelector(LABELS.EXCLUSIVE_RETAILER, exclusiveRetailer.values, exclusiveRetailerWatcher);
    const packageTypeInput = generateSelector(LABELS.PACKAGE_TYPE, packageType.values, packageTypeWatcher);
    const seriesTypeInput = generateSelector(LABELS.SERIES, series.values, seriesWatcher);
    const sourceMaterialInput = generateSelector(LABELS.SOURCE_MATERIAL, formattedSourceMaterial, sourceMaterialWatcher);
    const sourceTypeInput = generateSelector(LABELS.SOURCE_TYPE, sourceType.values, sourceTypeWatcher);
    const versionTypeInput = generateSelector(LABELS.VERSIONS, version.values, versionWatcher);
    
    const additionalNameDetailsInput = generatorInput(LABELS.ADD_NAME_DETAILS, additionalNameDetails);
    const mulitipackInput = generatorInput(LABELS.MULTIPACK, mulitipack);
    const nameInput = generatorInput(LABELS.NAME, name);
    const retailPriceInput = generatorInput(LABELS.RETAIL_PRICE, retailPrice);
    const seriesNumberInput = generatorInput(LABELS.WAVE, wave);
    const waveInput = generatorInput(LABELS.SERIES_NUMBER, seriesNumber);
    const yearInput = generatorInput(LABELS.YEAR, year, true);

    const groupSelectInput = groupSelect();

    let looseImageInput, looseBlackImageInput, newImageInput;

    if(!figure) {
        looseImageInput = generatorImageInput(LABELS.LOOSE_IMAGE.KEY, handleLooseImageChange);
        looseBlackImageInput = generatorImageInput(LABELS.LOOSE_BLACK_IMAGE.KEY, handleBlacLoosekImageChange);
        newImageInput = generatorImageInput(LABELS.NIB_IMAGE.KEY, handleNewImageChange);
    }

    return (
        <React.Fragment>
            <FormHeaderSection text={NEW_COLLECTION_FORM.HEADER} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                { submitDisabled && 
                    <div className={classes.progressBar}>
                        <ProgressBar percentage={percentage}/> 
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} className={classes.submitButton}>
                        {nameInput}
                        {collectionTypeInput}
                        {waveInput}
                        
                        {additionalNameDetailsInput}
                        {seriesTypeInput}
                        {seriesNumberInput}
    
                        {sourceTypeInput}
                        {assortmentInput}
                        {versionTypeInput}

                        {sourceMaterialInput}
                        {yearInput}
                        {retailPriceInput}
                        
                        {mulitipackInput}
                        {exclusiveRetailerInput}
                        {packageTypeInput}

                        {groupSelectInput}

                        {looseImageInput}
                        {looseBlackImageInput}
                        {newImageInput}
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

NewCollectibleForm.propTypes = {
    closeModal: PropTypes.func.isRequired, 
    formData: PropTypes.object.isRequired,
    figure:  PropTypes.object,
};
