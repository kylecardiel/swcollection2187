import { AUTH } from 'shared/constants/stringConstantsSelectors';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { FormError } from 'components/common/form/formError';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from 'backend/FirebaseAuth';
import React, { useState } from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { useStyles } from 'components/auth/authMakeStyles';
import { Validator } from 'shared/util/validator';
import Recaptcha from 'react-recaptcha';

export const LogIn = () => {
    const { register, handleSubmit, watch } = useForm();
    const classes = useStyles();

    const [isVerified, setIsVerified] = useState(false);

    const {
        FIELD_LABELS,
        INVALID_EMAIL,
        DONT_HAVE_AN_ACCOUNT,
    } = AUTH;

    const emailInput = watch('email');
    let errorMessage;

    if (emailInput && !Validator.isEmailValid(emailInput)) {
        errorMessage = INVALID_EMAIL;
    } else {
        errorMessage = null;
    }

    const onSubmit = loginInfo => {
        if(isVerified){
            login(loginInfo.email, loginInfo.password);
        } else {
            alert(AUTH.HUMAN);
        }
    };

    const verifyCallback = response => {
        if(response){
            setIsVerified(true);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {AUTH.LOGIN}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label={FIELD_LABELS.EMAIL}
                        name='email'
                        autoComplete='email'
                        inputRef={register({ required: true })}
                        autoFocus
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label={FIELD_LABELS.PASSWORD}
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        inputRef={register({ required: true })}
                    />
                    {errorMessage &&
                        <Grid item xs={12}>
                            <FormError errorMessage={errorMessage} />
                        </Grid>
                    }
                    <Grid item xs={12} container direction='row' justify='center' className={classes.recaptchaContainer}>
                        <Recaptcha
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            render='explicit'
                            verifyCallback={verifyCallback}
                        />
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {AUTH.LOG_IN}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link underline='none' component={RouterLink} to={ROUTE_CONSTANTS.FORGOT_PASSWORD} >
                                {AUTH.FORGOT_PW}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link underline='none' component={RouterLink} to={ROUTE_CONSTANTS.SIGNUP} >
                                {DONT_HAVE_AN_ACCOUNT}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};