import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { NotReadyYet } from 'components/common/notReadyYet';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ContactMeApi } from 'shared/api/contactMeApi';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { GENERAL, PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';

const { HOME } = ROUTE_CONSTANTS;

export const ContactMe = ({ signUpPage }) => {
    const classes = useStyles();
    
    const [successBanner, setSuccessBanner] = useState(false);

    const { control, register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        RecordUtils.addTimeStamps(data);
        ContactMeApi.create(data);
        setSuccessBanner(true);
        reset();
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const { LABELS, SUCCESS, TITLE } = PAGES.CONTACT_ME;
    const menuItemNone = <MenuItem key={GENERAL.MENU_ITEMS.NONE} value={null}><em>{GENERAL.MENU_ITEMS.NONE}</em></MenuItem>;

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={TITLE} />
            {!signUpPage
                ? <NotReadyYet />
                : <Container component='main' maxWidth='md' className={classes.form}>
                    <div className={classes.root}>
                        { successBanner && 
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.banner}>
                                <h3>{SUCCESS}</h3>
                            </Grid>
                        </Grid>
                        }
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} className={classes.inputBoxInColumn}>
                                    <h3>{PAGES.CONTACT_ME.TITLE}</h3>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.inputBoxInColumn}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={'firstName'}
                                        name={'firstName'}
                                        label={LABELS.FIRST_NAME}
                                        inputRef={register()}
                                        type={'string'}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.inputBoxInColumn}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={'lastName'}
                                        name={'lastName'}
                                        label={LABELS.LAST_NAME}
                                        inputRef={register()}
                                        type={'string'}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.inputBoxInColumn}>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={'email'}
                                        name={'email'}
                                        label={LABELS.EMAIL}
                                        inputRef={register({ required: true })}
                                        type={'email'}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.inputBoxInColumn}>
                                    <FormControl variant='outlined' className={classes.dropdown}>
                                        <InputLabel ref={inputLabel} id={`${'Category'}-label`}>{'Category'}</InputLabel>
                                        <Controller
                                            name={'Category'}
                                            control={control}
                                            as={
                                                <Select
                                                    label={LABELS.CATEGORY}
                                                    labelId={'Category'}
                                                    labelWidth={labelWidth}
                                                    inputProps={{ name: 'Category' }}
                                                >
                                                    {menuItemNone}
                                                    {PAGES.CONTACT_ME.CATEGORYS.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                                                </Select>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} className={classes.inputBoxInColumn}>
                                    <TextField
                                        id='outlined-textarea'
                                        placeholder='Message...'
                                        multiline
                                        variant='outlined'
                                        name={'message'}
                                        label={LABELS.MESSAGE}
                                        inputRef={register({ required: true })}
                                        inputProps={{ className: classes.textarea }}
                                        rows={10}
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.submitButtonrow}>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        className={classes.submit}
                                    >
                                        {GENERAL.BUTTON.SUBMIT}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            }
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    form: {
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
    },
    inputBoxInColumn: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    textarea: {
        resize: 'both',
        width: '100%',
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
    banner:{
        marginTop: theme.spacing(1),
        borderRadius: '10px',
        border: '2px solid',
        borderColor: Color.darkGreen(),
        backgroundColor: Color.lightGreen(),
        color: Color.darkGreen(),
    },
    dropdown: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 120,
    },
}));

ContactMe.propTypes = {
    signUpPage: PropTypes.bool.isRequired,
};
