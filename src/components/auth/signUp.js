import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { registerUser } from 'backend/FirebaseAuth';
import { useStyles } from 'components/auth/authMakeStyles';
import { FormError } from 'components/common/form/formError';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { AUTH } from 'shared/constants/stringConstantsSelectors';
import { Validator } from 'shared/util/validator';
import PropTypes from 'prop-types';
import { GoogleButton } from 'components/auth/googleButton';
import Recaptcha from 'react-recaptcha';
import { isProduction } from 'shared/util/environment';

export const SignUp = ({ googleSignInFlag }) => {

    const { register, handleSubmit, watch } = useForm();
    const classes = useStyles();

    const {
        FIELD_LABELS,
        PASSWORD_DONT_MATCH,
        INVALID_EMAIL,
    } = AUTH;

    const passwordInput = watch('password');
    const confrimPasswordInput = watch('confirmPassword');
    const emailInput = watch('email');
    let errorMessage;

    if (confrimPasswordInput && passwordInput !== confrimPasswordInput) {
        errorMessage = PASSWORD_DONT_MATCH;
    } else if (emailInput && !Validator.isEmailValid(emailInput)) {
        errorMessage = INVALID_EMAIL;
    } else {
        errorMessage = null;
    }

    const [isVerified, setIsVerified] = useState(false);

    const onSubmit = registrationInfo => {
        if(isVerified || !isProduction){
            registerUser(registrationInfo);
        } else {
            alert(AUTH.HUMAN);
        }
    };

    const verifyCallback = response => {
        if(response){
            setIsVerified(true);
        }
    };

    const disableSubmitt = errorMessage !== null;

    return (
        <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Container component='main' maxWidth='md' className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {AUTH.SIGN_UP}
                </Typography>
                {googleSignInFlag && 
                    <>
                        <GoogleButton />
                        <Typography component='h3' color='textSecondary' variant='body2'>
                            {AUTH.DIVIDER}
                        </Typography>
                    </>
                }
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label={FIELD_LABELS.EMAIL}
                                name='email'
                                autoComplete='email'
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label={FIELD_LABELS.PASSWORD}
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='confirmPassword'
                                label={FIELD_LABELS.CONFIRM_PASSWORD}
                                type='password'
                                id='confirmPassword'
                                autoComplete='current-password'
                                inputRef={register({ required: true })}
                            />
                        </Grid>
                        {errorMessage &&
                            <Grid item xs={12}>
                                <FormError errorMessage={errorMessage} />
                            </Grid>
                        }
                        {isProduction && 
                        <Grid item xs={12} container direction='row' justify='center' className={classes.recaptchaContainer}>
                            <Recaptcha
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                render='explicit'
                                verifyCallback={verifyCallback}
                            />
                        </Grid>
                        }
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        disabled={disableSubmitt}
                        className={classes.submit}
                    >
                        {AUTH.SIGN_UP}
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link underline='none' component={RouterLink} to={ROUTE_CONSTANTS.LOGIN} >
                                {AUTH.HAVE_ACCOUNT}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Container>
    );
};

SignUp.propTypes = {
    googleSignInFlag: PropTypes.bool,
};
