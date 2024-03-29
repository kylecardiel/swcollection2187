import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { FormDataTable } from 'components/admin/formDataTable';
import { FormSelectorInput } from 'components/admin/formSelectorInputs';
import { UploadImage } from 'components/admin/uploadImage';
import { NewVideoGameForm } from 'components/catalog/videoGames/forms/newVideoGameForm';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { HelperDataApi } from 'shared/api/helperDataApi';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { ADMIN, PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { SortingUtils } from 'shared/util/sortingUtil';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { SourceMaterialTable } from 'components/admin/sourceMaterialTable';
import { NewSourceForm } from 'components/admin/newSourceForm';

const { HOME, READ_CONTACT_ME } = ROUTE_CONSTANTS;

export const Admin = ({ helperData }) => {
    const classes = useStyles();

    const [newEntryComponent, setNewEntryComponent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayFormDataInput, setDisplayFormDataInput] = useState(true);
    const [displayFormDataTable, setDisplayFormDataTable] = useState(false);

    const openModal = component => {
        setNewEntryComponent(component);
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
    const [newSeries, setNewSeries] = useState({ values: [] });
    const [newSourceMaterial, setNewSourceMaterial] = useState({ values: [] });

    const [uploadAssortment, setUploadAssortment] = useState();
    const [uploadSeries, setUploadSeries] = useState();
    const handleChangeUploadAssortment = e => setUploadAssortment(e.target.value);
    const handleChangeUploadSeries = e => setUploadSeries(e.target.value);

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        setNewAssortment({
            values: helperData.assortment.values.map(({ name }) => name),
        });
        setNewSeries({
            values: helperData.series.values,
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
        { key: 'PackageType', value: 'packageType' },
        { key: 'Series', value: 'series' },
        { key: 'Source Type', value: 'sourceType' },
        { key: 'Version', value: 'version' },

        { key: 'Video Game Console', value: 'videoGameConsole' },
        // { key: 'Video Game Developer', value: 'videoGameDeveloper' },
        { key: 'Video Game Type', value: 'videoGameType' },
        { key: 'Video Game Series', value: 'videoGameSeries' },
        { key: 'Video Game Format', value: 'videoGameFormat' },
    ];

    let assortmentTable, charactersTable, collectionTypeTable, exclusiveTable, groupsTable, seriesTable, sourceMaterialTable, sourceTypeTable, versionTable;
    let videoGameConsoleTable, videoGameTypeTable, videoGameSeriesTable, videoGameFormatTable;
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

            videoGameConsoleTable = <FormDataTable header={'VG: Console'} data={helperData.videoGameConsole} dataType={'videoGameConsole'} />;
            videoGameTypeTable = <FormDataTable header={'VG: Type'} data={helperData.videoGameType} dataType={'videoGameType'} />;
            videoGameSeriesTable = <FormDataTable header={'VG: Series'} data={helperData.videoGameSeries} dataType={'videoGameSeries'} />;
            videoGameFormatTable = <FormDataTable header={'VG: Format'} data={helperData.videoGameFormat} dataType={'videoGameFormat'} />;
        }
    };
    buildTables();

    const newBlackSeriesModal = <NewCollectibleForm
        closeModal={closeModal}
        catalog
        formData={helperData}
    />;

    const newVideoGameModal = <NewVideoGameForm
        setIsModalOpen={setIsModalOpen}
        formData={helperData}
    />;

    const newSourceModal = <NewSourceForm
        c={closeModal}
    />;

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ADMIN.TITLE} />
            <Container component='main' maxWidth='xl'>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyles(modalSize)}
                >
                    {newEntryComponent}
                </Modal>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12} className={classes.formDataContainer}>
                            <Link underline='none' component={RouterLink} to={READ_CONTACT_ME}>
                                {PAGES.READ_CONTACT_ME.TITLE}
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <ActionButton
                                buttonLabel={ADMIN.BUTTON.NEW_BLACK_SERIES}
                                icon={<AddBoxIcon />}
                                onClick={() => openModal(newBlackSeriesModal)}
                                color={Color.green()}
                            />
                            <ActionButton
                                buttonLabel={ADMIN.BUTTON.NEW_VIDEO_GAME}
                                icon={<AddBoxIcon />}
                                onClick={() => openModal(newVideoGameModal)}
                                color={Color.green()}
                            />
                            <ActionButton
                                buttonLabel={ADMIN.BUTTON.NEW_SOURCE}
                                icon={<AddBoxIcon />}
                                onClick={() => openModal(newSourceModal)}
                                color={Color.blue()}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.formDataContainer}>
                            <UploadImage assortment={uploadAssortment} series={uploadSeries}/>
                        </Grid>
                        <Grid item xs={3} className={classes.formDataContainer}>
                            {helperData.assortment && displayFormDataInput &&
                                <FormSelectorInput
                                    label={ADMIN.LABELS.SERIES}
                                    labelWidth={labelWidth}
                                    handleOnChange={handleChangeUploadSeries}
                                    menuItems={newSeries.values}
                                    inputLabel={inputLabel}
                                />
                            }
                        </Grid>
                        <Grid item xs={3} className={classes.formDataContainer}>
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
                            <Container component='main' maxWidth='xl'>
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
                                            <Grid item xs={12} md={3} lg={2}>
                                                {sourceMaterialTable}
                                            </Grid>
                                            <Grid item xs={12} md={3} lg={2}>
                                                {assortmentTable}
                                            </Grid>
                                            <Grid item xs={12} md={3} lg={2}>
                                                {collectionTypeTable}
                                                {seriesTable}
                                                {versionTable}
                                                {sourceTypeTable}
                                                {exclusiveTable}
                                            </Grid>
                                            <Grid item xs={12} md={3} lg={2}>
                                                {groupsTable}
                                            </Grid>
                                            <Grid item xs={12} md={3} lg={2}>
                                                {charactersTable}
                                            </Grid>
                                            <Grid item xs={12} md={3} lg={2}>
                                                {videoGameConsoleTable}
                                                {videoGameTypeTable}
                                                {videoGameSeriesTable}
                                                {videoGameFormatTable}
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <SourceMaterialTable sourceMaterials={helperData.sourceMaterial}/>
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