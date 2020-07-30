import {
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    TextField,
    MenuItem,
    Select,
    Typography,
    Input,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Color } from 'shared/styles/color';
import { CatalogApi } from 'shared/api/orchestrator';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import {
    ALL_ASSORTMENT,
    PRODUCT_LINES,
    PRODUCT_TYPE,
    GROUP_NAMES,
    VERSIONS,
} from 'shared/constants/domainConstantSelectors';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { storage } from 'backend/Firebase';
import { FB_STORAGE_CONSTANTS } from 'shared/constants/storageRefConstants';

const { CATALOG, ACTION_FIGURES } = FB_STORAGE_CONSTANTS;

export const NewCollectibleForm = ({ catalog, closeModal, formData }) => {
    const classes = useStyles();

    const { register, handleSubmit, control } = useForm();

    const [groups, setGroups] = useState([]);
    const [looseFigureImageFile, setLooseFigureImageFile] = useState(null);
    const [looseBlackFigureImageFile, setBlackLooseFigureImageFile] = useState(null);
    const [newFigureImageFile, setNewFigureImageFile] = useState(null);

    const handleChange = (event) => {
        setGroups(event.target.value);
    };

    const handleLooseImageChange = e => {
        if (e.target.files[0]) {
            setLooseFigureImageFile(e.target.files[0]);
        }
    };

    const handleBlacLoosekImageChange = e => {
        if (e.target.files[0]) {
            setBlackLooseFigureImageFile(e.target.files[0]);
        }
    };

    const handleNewImageChange = e => {
        if (e.target.files[0]) {
            setNewFigureImageFile(e.target.files[0]);
        }
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const upload = async image => {
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref(`${CATALOG}${ACTION_FIGURES.BLACK_SERIES}${image.name}`).put(image);
            uploadTask.on('state_changed',
                snapshot => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                function error(err) {
                    console.log('error', err);
                    reject();
                },
                function complete() {
                    uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
                        resolve(downloadURL);
                    })
                }
            )
        })
    };

    const onSubmit = async collectible => {
    
        if(looseFigureImageFile) collectible.looseImageUrl = await upload(looseFigureImageFile);
        if(looseBlackFigureImageFile) collectible.looseBlackImageUrl = await upload(looseBlackFigureImageFile);
        if(newFigureImageFile) collectible.newImageUrl = await upload(newFigureImageFile);
        collectible.groups = groups;

        Object.keys(collectible).forEach(
            key => collectible[key] === undefined && delete collectible[key]
        );

        CatalogApi.create(FB_DB_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, collectible)
        closeModal();
    };

    const menuItemNone = <MenuItem key={'none'} value={null}><em>{'none'}</em></MenuItem>;

    const generatorInputText = text => {
        return <Grid item xs={12} md={4} className={classes.inputBoxInColumn}>
            <Typography variant='subtitle1' className={classes.text}>
                {text}
            </Typography>
        </Grid>;
    };

    const generateSelector = (text, selectorName, selectorValues) => {
        return <>
            {generatorInputText(text)}
            <Grid item xs={12} md={8} className={classes.inputBoxInColumn}>
                <FormControl variant='outlined' className={classes.form}>
                    <InputLabel ref={inputLabel} id={`${selectorName}-label`}>{selectorName}</InputLabel>
                    <Controller
                        name={selectorName}
                        control={control}
                        defaultValue={''}
                        as={
                            <Select
                                label={selectorName}
                                labelId={selectorName}
                                labelWidth={labelWidth}
                                inputProps={{ name: selectorName }}
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
            <Grid item xs={12} md={8} className={classes.inputBoxInColumn}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="Groups-label">{'Groups'}</InputLabel>
                    <Select
                        labelId="Groups-label"
                        id="groups"
                        multiple
                        value={groups}
                        onChange={handleChange}
                        input={<Input />}
                    >
                        {GROUP_NAMES.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </>;
    };

    const generatorInput = (text, inputName, number) => {
        return <>
            {generatorInputText(text)}
            <Grid item xs={12} md={8} className={classes.inputBoxInColumn}>
                <TextField
                    variant='outlined'
                    className={classes.form}
                    fullWidth
                    id={inputName}
                    name={inputName}
                    label={inputName}
                    inputRef={register()}
                    type={number ? 'number' : 'string'}
                />
            </Grid>
        </>;
    };

    const generatorImageInput = (text, handleChange) => {
        return <>
            {generatorInputText(text)}
            <Grid item xs={12} md={8} className={classes.inputBoxInColumn}>
                <input type='file' onChange={handleChange} />
            </Grid>
        </>;
    };

    const { sourceMaterial } = formData;
    const sourceType = ['Movies', 'TV', 'Video Games', 'Books', 'Comics'];

    const collectionTypeInput = generateSelector('Collection Type', 'collectionType', PRODUCT_TYPE);
    const seriesTypeInput = generateSelector('Series', 'series', PRODUCT_LINES);
    const assortmentInput = generateSelector('Assortment', 'assortment', ALL_ASSORTMENT);
    const versionTypeInput = generateSelector('Versions', 'version', VERSIONS);
    const sourceMaterialInput = generateSelector('Source Material', 'sourceMaterial', sourceMaterial.values);
    const sourceTypeInput = generateSelector('Source Type', 'sourceType', sourceType);
    const nameInput = generatorInput('Name', 'name');
    const additionalNameDetailsInput = generatorInput('Additional Name Details', 'additionalNameDetails');
    const seriesNumberInput = generatorInput('Wave', 'wave', true);
    const waveInput = generatorInput('Series Number', 'seriesNumber', true);
    const yearInput = generatorInput('Year', 'year', true);
    const groupSelectInput = groupSelect();
    const purchasePriceInput = generatorInput('Purchase Price', 'purchasePrice');
    const looseImageInput = generatorImageInput('Loose Image', handleLooseImageChange);
    const looseBlackImageInput = generatorImageInput('Loose Black Image', handleBlacLoosekImageChange);
    const newImageInput = generatorImageInput('NIB Image', handleNewImageChange);

    return (
        <React.Fragment>
            <FormHeaderSection text={'Feed the Collection'} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} className={classes.submitButton}>
                        {nameInput}
                        {additionalNameDetailsInput}
                        {collectionTypeInput}
                        {seriesTypeInput}
                        {assortmentInput}
                        {yearInput}
                        {waveInput}
                        {seriesNumberInput}
                        {versionTypeInput}
                        {sourceTypeInput}
                        {sourceMaterialInput}
                        {looseImageInput}
                        {looseBlackImageInput}
                        {newImageInput}
                        {groupSelectInput}
                        {!catalog && purchasePriceInput}
                        <Grid item xs={12} className={classes.submitButtonrow}>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                className={classes.submit}
                            >
                                {'Submit'}
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
            backgroundColor: theme.palette.common.white
        },
    },
    conatiner: {
        paddingTop: theme.spacing(2),
    },
    check: {
        width: '100%',
        minWidth: 120,
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1),

    },
    form: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 120,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        backgroundColor: Color.primary('blue'),
        color: Color.primary('white'),
        '&:hover': {
            color: Color.primary('blue'),
            backgroundColor: Color.primary('white'),
        },
    },
    deleteButton: {
        margin: theme.spacing(3, 0, 2),
        maxWidth: 200,
        color: Color.primary('eliteRed'),
        backgroundColor: Color.primary('white'),
        '&:hover': {
            backgroundColor: Color.primary('eliteRed'),
            color: Color.primary('white'),
        },
    },
    dateTimeSelector: {
        marginTop: theme.spacing(0),
        width: '100%',
        minWidth: 150,
    },
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dateInput: {
        margin: theme.spacing(0),
    },
    text: {
        textAlign: 'center',
    },
    submitButtonrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        fontWeight: 'bold',
    },
    warningMessage: {
        padding: theme.spacing(0),
        color: Color.primary('eliteRed'),
    }
}));