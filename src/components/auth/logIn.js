import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from 'components/auth/authMakeStyles';
import { AUTH } from 'shared/constants/stringConstantsSelectors';
import { useForm } from 'react-hook-form';
import { FormError } from 'components/common/form/formError';
import { login } from 'backend/FirebaseAuth';
import { Validator } from 'shared/util/validator';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { Link as RouterLink } from 'react-router-dom';

export const LogIn = props => {
    const { register, handleSubmit, watch } = useForm();
    const classes = useStyles();

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
        login(loginInfo.email, loginInfo.password);
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
}