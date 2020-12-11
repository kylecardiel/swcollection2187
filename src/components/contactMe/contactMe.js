import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { GENERAL, PAGES } from 'shared/constants/stringConstantsSelectors';
import PropTypes from 'prop-types';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import {
    Button,
} from '@material-ui/core';
import { Color } from 'shared/styles/color';

const { HOME } = ROUTE_CONSTANTS;

export const ContactMe = ({ signUpPage }) => {
    const classes = useStyles();
    
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
  

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.CONTACT_ME.TITLE} />
            <Container component='main' maxWidth='md' className={classes.form}>
                <div className={classes.root}>
                    
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
                                    label={'First Name'}
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
                                    label={'Last Name'}
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
                                    label={'Email'}
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
                                    label={'Message'}
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
}));

ContactMe.propTypes = {
    signUpPage: PropTypes.bool.isRequired,
};
