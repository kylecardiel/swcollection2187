import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from 'components/auth/authMakeStyles';
import { AUTH } from 'shared/constants/stringConstantsSelectors';
import { useForm } from 'react-hook-form';
import { FormError } from 'components/common/form/formError';
import firebase from 'backend/Firebase';
import { Validator } from 'shared/util/validator';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

export const ForgotPassword = props => {
  const { register, handleSubmit, watch } = useForm();
  const classes = useStyles();

  const {
    FIELD_LABELS,
    INVALID_EMAIL,
    RESET_PASSWORD_LINK,
    RESET_PASSWORD,
    BACK_TO_LOGIN,
  } = AUTH;

  const emailInput = watch('email');
  let errorMessage;

  if (emailInput && !Validator.isEmailValid(emailInput)) {
    errorMessage = INVALID_EMAIL;
  } else {
    errorMessage = null;
  }

  const onSubmit = () => {
    firebase.auth().sendPasswordResetEmail(emailInput).then(function () {
      alert('Email sent to reset password');
    }).catch(error => {
      if (error.message !== null) {
        alert(error.message);
      }
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {RESET_PASSWORD}
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
            {RESET_PASSWORD_LINK}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link underline='none' component={RouterLink} to={ROUTE_CONSTANTS.LOGIN} >
                {BACK_TO_LOGIN}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}