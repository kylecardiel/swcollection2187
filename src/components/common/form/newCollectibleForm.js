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
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Color } from 'shared/styles/color';
import { CommonApi } from 'shared/api/orchestrator';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import {
    ALL_SOURCE_NAMES,
    ALL_ASSORTMENT,
    PRODUCT_LINES,
    PRODUCT_TYPE,
    GROUP_NAMES,
    VERSIONS,
} from 'shared/constants/domainConstantSelectors';
import { UserConsumer } from 'components/auth/authContext';


export const NewCollectibleForm = ({ closeModal }) => {
    const user = useContext(UserConsumer);
    const classes = useStyles();

    const { register, handleSubmit, control } = useForm();

    const [groups, setGroups] = React.useState([]);

    const handleChange = (event) => {
        setGroups(event.target.value);
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const onSubmit = collectible => {
        collectible['groups'] = groups;

        Object.keys(collectible).forEach(
            key => collectible[key] === undefined && delete collectible[key]
        )

        const { collectionType, series } = collectible;

        CommonApi.create(user.id, `${collectionType}/${series}`, collectible)
        closeModal();
    };

    const menuItemNone = <MenuItem value={null}><em>{'none'}</em></MenuItem>;

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

    const generatorInput = (text, inputName) => {
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
                />
            </Grid>
        </>;
    };

    const collectionTypeInput = generateSelector('Collection Type', 'collectionType', PRODUCT_TYPE);
    const seriesTypeInput = generateSelector('Series', 'series', PRODUCT_LINES);
    const assortmentInput = generateSelector('Assortment', 'assortment', ALL_ASSORTMENT);
    const versionTypeInput = generateSelector('Versions', 'version', VERSIONS);
    const sourceMaterialTypeInput = generateSelector('Source Material', 'sourceMaterial', ALL_SOURCE_NAMES);
    const nameInput = generatorInput('Name', 'name');
    const additionalNameDetailsInput = generatorInput('Additional Name Details', 'additionalNameDetails');
    const seriesNumberInput = generatorInput('Series Number', 'seriesNumber');
    const newInBoxQtyInput = generatorInput('NIB Qty', 'newInBoxQty');
    const looseCompleteQtyInput = generatorInput('Loose Complete Qty', 'looseCompleteQty');
    const looseIncompleteQtyInput = generatorInput('Loose incmplete Qty', 'looseIncompleteQty');
    const newInBoxImageURLInput = generatorInput('NIB Image URL', 'newImageUrl');
    const looseImageURLInput = generatorInput('Loose Image URL', 'looseImageUrl');
    const groupSelectInput = groupSelect();
    const purchasePriceInput = generatorInput('Purchase Price', 'purchasePrice');

    return (
        <React.Fragment>
            <FormHeaderSection text={'Feed the Collection'} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} className={classes.submitButton}>
                        {collectionTypeInput}
                        {seriesTypeInput}
                        {assortmentInput}
                        {versionTypeInput}
                        {sourceMaterialTypeInput}
                        {nameInput}
                        {additionalNameDetailsInput}
                        {seriesNumberInput}
                        {newInBoxQtyInput}
                        {looseCompleteQtyInput}
                        {looseIncompleteQtyInput}
                        {newInBoxImageURLInput}
                        {looseImageURLInput}
                        {groupSelectInput}
                        {purchasePriceInput}
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