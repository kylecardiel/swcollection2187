import React, { useEffect, useRef, useState } from 'react';
import { ActionButton } from 'components/common/buttons/actionButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { ADMIN } from 'shared/constants/stringConstantsSelectors';
import Button from '@material-ui/core/Button';
import { Color } from 'shared/styles/color';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { FormDataTable } from 'components/admin/formDataTable';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import Grid from '@material-ui/core/Grid';
import { HelperDataApi } from 'shared/api/orchestrator';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import PropTypes from 'prop-types';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { SortingUtils } from 'shared/util/sortingUtil';
import TextField from '@material-ui/core/TextField';
import { UploadImage } from 'components/admin/uploadImage';
import { useForm } from 'react-hook-form';

import { FormSelectorInput } from 'components/admin/formSelectorInputs';

const { HOME } = ROUTE_CONSTANTS;

export const Admin = ({ helperData }) => {
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

    const [newAssortment, setNewAssortment] = useState({ values: [] });
    const [newSourceMaterial, setNewSourceMaterial] = useState({ values: [] });
    const [uploadAssortment, setUploadAssortment] = useState();
    const handleChangeUploadAssortment = e => setUploadAssortment(e.target.value);

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        setNewAssortment({
            values: helperData.assortment.values.map(({ name }) => name),
        });
        setNewSourceMaterial({
            values: helperData.sourceMaterial.values.map(({ name }) => name),
        });
    }, [helperData]);

    const { register, handleSubmit, reset } = useForm();
    const modalSize = { height: '85%', width: '85%' };

    const onSubmit = attribute => {
        let existingData = helperData[dataType];
        if (!isEmpty(existingData)) {
            existingData.values.push(attribute.attributevalue);
            let newObject = {};

            newObject[existingData.id] = dataType !== ADMIN.LABELS.ASSORTMENT 
                ? existingData.values.sort(SortingUtils.alphaNumericSorting) 
                : existingData.values;

            HelperDataApi.create(newObject, dataType);
        } else {
            HelperDataApi.createNewCategory([attribute.attributevalue], dataType);
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
        { key: 'Characters', value: 'characters' },
        { key: 'Collection Type', value: 'collectionType' },
        { key: 'Exclusive Retailer', value: 'exclusiveRetailer' },
        { key: 'Groups', value: 'groups' },
        { key: 'Series', value: 'series' },
        { key: 'Source Type', value: 'sourceType' },
        { key: 'Version', value: 'version' },
    ];

    let assortmentTable, charactersTable, collectionTypeTable, exclusiveTable, groupsTable, seriesTable, sourceMaterialTable, sourceTypeTable, versionTable;
    const buildTables = () => {
        if (Object.keys(helperData).length !== 0) {
            assortmentTable = <FormDataTable header={'Assortment'} data={newAssortment} dataType={'assortment'} disable />;
            collectionTypeTable = <FormDataTable header={'Collection Type'} data={helperData.collectionType} dataType={'collectionType'} />;
            charactersTable = <FormDataTable header={'Characters'} data={helperData.characters} dataType={'characters'} />;
            exclusiveTable = <FormDataTable header={'Exclusive Retailer'} data={helperData.exclusiveRetailer} dataType={'exclusiveRetailer'} />;
            groupsTable = <FormDataTable header={'Groups'} data={helperData.groups} dataType={'groups'} />;
            seriesTable = <FormDataTable header={'Series'} data={helperData.series} dataType={'series'} />;
            sourceMaterialTable = <FormDataTable header={'Source Material'} data={newSourceMaterial} dataType={'sourceMaterial'} disable />;
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
                                buttonLabel={ADMIN.BUTTON.NEW_ENTRY}
                                icon={<AddBoxIcon />}
                                onClick={openModal}
                                color={Color.green()}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.formDataContainer}>
                            <UploadImage assortment={uploadAssortment} />
                        </Grid>
                        <Grid item xs={6} className={classes.formDataContainer}>
                            {helperData.assortment && displayFormDataInput &&
                                <FormSelectorInput
                                    label={ADMIN.LABELS.ASSORTMENT}
                                    labelWidth={labelWidth}
                                    handleOnChange={handleChangeUploadAssortment}
                                    menuItems={newAssortment.values}
                                    inputLabel={inputLabel}
                                />
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <Grid item xs={12}>{ADMIN.TABLE_DETAILS}</Grid>
                            <Container component='main' maxWidth='lg'>
                                <Grid container spacing={2} className={classes.gridContainer}>
                                    {displayFormDataInput &&
                                        <form
                                            className={classes.form}
                                            noValidate
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={4} >
                                                    <FormSelectorInput
                                                        label={ADMIN.LABELS.DATA_TYPE}
                                                        labelWidth={labelWidth}
                                                        handleOnChange={handleChangeDataType}
                                                        menuItems={dataTypes}
                                                        inputLabel={inputLabel}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <TextField className={classes.formTextInput}
                                                        variant='outlined'
                                                        fullWidth
                                                        id={'AttributeValue'}
                                                        name={'AttributeValue'.toLowerCase()}
                                                        label={ADMIN.INPUT_VALUE}
                                                        inputRef={register({ required: true })}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={2} className={classes.gridAddButton}>
                                                    <Button
                                                        type='submit'
                                                        fullWidth
                                                        variant='contained'
                                                        color='primary'
                                                        className={classes.submitButton}
                                                    >
                                                        <AddBoxIcon />
                                                        {ADMIN.BUTTON.ADD}
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} md={2} className={classes.gridAddButton}>
                                                    <Button
                                                        onClick={() => setDisplayFormDataTable(!displayFormDataTable)}
                                                        fullWidth
                                                        variant='contained'
                                                        color='primary'
                                                        className={classes.displayButton}
                                                    >
                                                        {displayFormDataTable 
                                                            ? ADMIN.BUTTON.HIDE_TABLES 
                                                            : ADMIN.BUTTON.DISPLAY_TABLES
                                                        }
                                                    </Button>
                                                </Grid>
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

export const mapStateToProps = state => ({
    helperData: getHelperDataSet(state),
});

export default connect(mapStateToProps)(Admin);

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
        backgroundColor: Color.green(),
        '&:hover': {
            backgroundColor: 'white',
            color: Color.green(),
        },
    },
    displayButton: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(8),
        borderRadius: '5',
        backgroundColor: Color.blue(),
        '&:hover': {
            backgroundColor: 'white',
            color: Color.blue(),
        },
    },
    paperTable: {
        marginTop: theme.spacing(2),
    },
}));

Admin.propTypes = {
    helperData: PropTypes.object,
};