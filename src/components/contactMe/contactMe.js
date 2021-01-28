import { GENERAL, PAGES } from 'shared/constants/stringConstantsSelectors';
import React, { useState } from 'react';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { Button } from '@material-ui/core';
import { Color } from 'shared/styles/color';
import { ContactMeApi } from 'shared/api/contactMeApi';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NotReadyYet } from 'components/common/notReadyYet';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

const { HOME } = ROUTE_CONSTANTS;

export const ContactMe = ({ signUpPage }) => {
    const classes = useStyles();
    
    const [successBanner, setSuccessBanner] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        RecordUtils.addTimeStamps(data);
        ContactMeApi.create(data);
        setSuccessBanner(true);
        reset();
    };

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const { LABELS, SUCCESS, TITLE } = PAGES.CONTACT_ME;

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
                                        label={LABELS.Email}
                                        inputRef={register({ required: true })}
                                        type={'email'}
                                    />
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
}));

ContactMe.propTypes = {
    signUpPage: PropTypes.bool.isRequired,
};
