import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { FormDataTableRow } from 'components/admin/formDataRow';
import { UploadImage } from 'components/admin/uploadImage';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { TableHeaders } from 'components/common/table/tableHeaders';
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
import { TableBody } from '@material-ui/core';

const { HOME } = ROUTE_CONSTANTS;

export const Admin = () => {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [dataType, setDatatype] = useState();
    const handleChangeDataType = e => setDatatype(e.target.value);

    const [helperData, setHelperData] = useState({});

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        const helperDataRef = HelperDataApi.read(FB_DB_CONSTANTS.HELPER_DATA);
        helperDataRef.on('value', snapshot => {
            if (snapshot.val()) {
                let retreivedSourceMaterial = snapshot.val().sourceMaterial;
                let sourceMaterialData = {};
                for (let id in retreivedSourceMaterial) {
                    sourceMaterialData.id = id;
                    sourceMaterialData.values = retreivedSourceMaterial[id];
                };
                // TODO: Add to Redux to store then when another compenent needs it checks first and then pulls if needed.
                setHelperData({
                    sourceMaterial: sourceMaterialData,
                });
            }
        });
    }, []);

    const { register, handleSubmit, reset } = useForm();

    const modalSize = { height: '90%', width: '65%' };

    const onSubmit = attribute => {
        let existingData = helperData[dataType];
        if (!isEmpty(existingData)) {
            console.log('existingData')
            console.log(existingData)
            existingData.values.push(attribute.attributevalue);
            let newObject = {};
            newObject[existingData.id] = existingData.values.sort(SortingUtils.alphaNumericSorting);
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
                <MenuItem key={'none'} value={null}><em>{'none'}</em></MenuItem>
                <MenuItem key={'sourceMaterial'} value={'sourceMaterial'}><em>{'Source Material'}</em></MenuItem>
                <MenuItem key={'collectibleType'} value={'collectibleType'}><em>{'Collectible Type'}</em></MenuItem>
                {/* {attributeList.map(attribute => <MenuItem value={attribute.toLocaleLowerCase()}>{attribute}</MenuItem>)} */}
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

    const columnDef = headerValue => [{ headerName: headerValue, span: 2, }];
    
    const generateTable = (colDefs, data, dataType) => {
        return <Paper>
            <Table>
                <TableHeaders columnDefinitions={colDefs} />
                <TableBody>
                    <FormDataTableRow data={data} dataType={dataType} />
                </TableBody>
            </Table>
        </Paper>;
    };

    let sourceMaterialColDef, sourceMaterialTable;

    const buildTables = () => {
        if(Object.keys(helperData).length !== 0){
            sourceMaterialColDef = columnDef('Source Material');
            sourceMaterialTable = generateTable(sourceMaterialColDef, helperData.sourceMaterial, 'sourceMaterial');
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
                        <Grid item xs={12} className={classes.formDataContainer}>
                            <UploadImage />
                        </Grid>

                        <Grid item xs={12} className={classes.formDataContainer}>
                            <Grid item xs={12}>{'These tables populate the form inputs:'}</Grid>
                            <Container component='main' maxWidth='lg'>
                                <Grid container spacing={2} className={classes.gridContainer}>
                                    <form
                                        className={classes.form}
                                        noValidate
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <Grid container spacing={1}>

                                            <Grid item xs={12} md={4} >{typeSelector}</Grid>
                                            <Grid item xs={12} md={4} >{valueTextInput}</Grid>
                                            <Grid item xs={12} md={2} className={classes.gridAddButton}>{addButton}</Grid>
                                        </Grid>
                                    </form>
                                    <Grid item xs={12} md={3}>
                                        {sourceMaterialTable}
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <div>Table 2...</div>
                                    </Grid>
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
        border: '5px solid red',
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
}));