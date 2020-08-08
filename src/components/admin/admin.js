import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { UploadImage } from 'components/admin/uploadImage';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { HelperDataApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { SortingUtils } from 'shared/util/sortingUtil';
import { FormDataTable } from 'components/admin/formDataTable';
import { formatFormData } from 'components/common/form/formatFormData';

const { HOME } = ROUTE_CONSTANTS;

export const Admin = () => {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayFormDataInput, setDisplayFormDataInput] = useState(true);
    const [displayFormDataTable, setDisplayFormDataTable] = useState(true);

    const openModal = () => {
        setIsModalOpen(!isModalOpen);
        setDisplayFormDataInput(!displayFormDataInput);
    };

    const closeModal = () => {
        setIsModalOpen(!isModalOpen);
        setDisplayFormDataInput(!displayFormDataInput);
    };

    const [dataType, setDatatype] = useState();
    const handleChangeDataType = e => setDatatype(e.target.value);

    const [uploadAssortment, setUploadAssortment] = useState();
    const handleChangeUploadAssortment = e => setUploadAssortment(e.target.value);

    const [helperData, setHelperData] = useState({});

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        const helperDataRef = HelperDataApi.read(FB_DB_CONSTANTS.HELPER_DATA);
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) {
                setHelperData(formatFormData(snapshotRef));
            }
        });
    }, []);

    const { register, handleSubmit, reset } = useForm();

    const modalSize = { height: '85%', width: '85%' };

    const onSubmit = attribute => {
        let existingData = helperData[dataType];
        if (!isEmpty(existingData)) {
            existingData.values.push(attribute.attributevalue);
            let newObject = {};

            newObject[existingData.id] = dataType !== 'assortment' ? existingData.values.sort(SortingUtils.alphaNumericSorting) : existingData.values;
            HelperDataApi.create(newObject, dataType);
        } else {
            HelperDataApi.createNewCategory([attribute.attributevalue], dataType)
        }
        reset();
    };

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const dataTypes = [
        { key: 'none', value: null },
        { key: 'Assortment', value: 'assortment' },
        { key: 'Characters', value: 'characters' },
        { key: 'Collection Type', value: 'collectionType' },
        { key: 'Exclusive Retailer', value: 'exclusiveRetailer' },
        { key: 'Groups', value: 'groups' },
        { key: 'Series', value: 'series' },
        { key: 'Source Material', value: 'sourceMaterial' },
        { key: 'Source Type', value: 'sourceType' },
        { key: 'Version', value: 'version' },
    ];

    const typeSelector =
        <FormControl variant='outlined' className={classes.form}>
            <InputLabel ref={inputLabel} id={`${'dataType'}-label`}>{'dataType'}</InputLabel>
            <Select
                labelId={'dataType-id'}
                id={'dataType'}
                onChange={handleChangeDataType}
                labelWidth={labelWidth}
                defaultValue={''}
                label={'dataType'}
            >
                {dataTypes.map(element => <MenuItem key={element.key} value={element.value}>{element.key}</MenuItem>)}
            </Select>
        </FormControl>;

    const valueTextInput =
        <TextField className={classes.formTextInput}
            variant='outlined'
            fullWidth
            id={'AttributeValue'}
            name={'AttributeValue'.toLowerCase()}
            label={'Value'}
            inputRef={register({ required: true })}
        />;

    const addButton =
        <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submitButton}
        >
            <AddBoxIcon />
            {'Add'}
        </Button>;

    const displayButton =
        <Button
            onClick={() => setDisplayFormDataTable(!displayFormDataTable)}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.displayButton}
        >
            {displayFormDataTable ? 'Hide Tables' : 'Display Tables'}
        </Button>;

    let assortmentTable, charactersTable, collectionTypeTable, exclusiveTable, groupsTable, seriesTable, sourceMaterialTable, sourceTypeTable, versionTable;
    const buildTables = () => {
        if (Object.keys(helperData).length !== 0) {
            assortmentTable = <FormDataTable header={'Assortment'} data={helperData.assortment} dataType={'assortment'} />;
            collectionTypeTable = <FormDataTable header={'Collection Type'} data={helperData.collectionType} dataType={'collectionType'} />;
            charactersTable = <FormDataTable header={'Characters'} data={helperData.characters} dataType={'characters'} />;
            exclusiveTable = <FormDataTable header={'Exclusive Retailer'} data={helperData.exclusiveRetailer} dataType={'exclusiveRetailer'} />;
            groupsTable = <FormDataTable header={'Groups'} data={helperData.groups} dataType={'groups'} />;
            seriesTable = <FormDataTable header={'Series'} data={helperData.series} dataType={'series'} />;
            sourceMaterialTable = <FormDataTable header={'Source Material'} data={helperData.sourceMaterial} dataType={'sourceMaterial'} />;
            sourceTypeTable = <FormDataTable header={'Source Type'} data={helperData.sourceType} dataType={'sourceType'} />;
            versionTable = <FormDataTable header={'Version'} data={helperData.version} dataType={'version'} />;
        }
    };

    buildTables();

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ADMIN.TITLE} />
            <Container component='main' maxWidth='lg'>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyles(modalSize)}
                >
                    <NewCollectibleForm
                        closeModal={closeModal}
                        catalog
                        formData={helperData}
                    />
                </Modal>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <ActionButton
                                buttonLabel={'New Entry'}
                                icon={<AddBoxIcon />}
                                onClick={openModal}
                                color={Color.primary('green')}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.formDataContainer}>
                            <UploadImage assortment={uploadAssortment} />
                        </Grid>
                        <Grid item xs={6} className={classes.formDataContainer}>
                            {helperData.assortment && displayFormDataInput && 
                                <FormControl variant='outlined' className={classes.form}>
                                    <InputLabel ref={inputLabel} id={`${'assortment'}-label`}>{'assortment'}</InputLabel>
                                    <Select
                                        labelId={'assortment-id'}
                                        id={'assortment'}
                                        onChange={handleChangeUploadAssortment}
                                        labelWidth={labelWidth}
                                        defaultValue={''}
                                        label={'assortment'}
                                    >
                                        {helperData.assortment.values.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <Grid item xs={12}>{'These tables populate the form inputs:'}</Grid>
                            <Container component='main' maxWidth='lg'>
                                <Grid container spacing={2} className={classes.gridContainer}>
                                    {displayFormDataInput &&
                                        <form
                                            className={classes.form}
                                            noValidate
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={4} >{typeSelector}</Grid>
                                                <Grid item xs={12} md={4} >{valueTextInput}</Grid>
                                                <Grid item xs={12} md={2} className={classes.gridAddButton}>{addButton}</Grid>
                                                <Grid item xs={12} md={2} className={classes.gridAddButton}>{displayButton}</Grid>
                                            </Grid>
                                        </form>
                                    }
                                    {displayFormDataTable &&
                                        <>
                                            <Grid item xs={12} md={3}>
                                                {sourceMaterialTable}
                                                {sourceTypeTable}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {collectionTypeTable}
                                                {seriesTable}
                                                {assortmentTable}
                                                {versionTable}
                                                {exclusiveTable}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {groupsTable}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {charactersTable}
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    formDataContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1),
        border: '5px solid black',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
    formTextInput: {
        width: '100%',
        marginTop: theme.spacing(1),
        minWidth: 120,
        backgroundColor: 'white',
    },
    gridContainer: {
        paddingBottom: theme.spacing(2),
    },
    gridAddButton: {
        marginTop: theme.spacing(-1),
    },
    submitButton: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(8),
        borderRadius: '5',
        backgroundColor: Color.primary('green'),
        '&:hover': {
            backgroundColor: 'white',
            color: Color.primary('green'),
        },
    },
    displayButton: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(8),
        borderRadius: '5',
        backgroundColor: Color.primary('blue'),
        '&:hover': {
            backgroundColor: 'white',
            color: Color.primary('blue'),
        },
    },
    paperTable: {
        marginTop: theme.spacing(2),
    },
}));