import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { GENERAL } from 'shared/constants/stringConstantsSelectors';
import TextField from '@material-ui/core/TextField';
import { Color } from 'shared/styles/color';
import { InputSelector } from 'components/common/form/newFormSelectors/inputSelector';

export const NewSourceForm = ({ closeModal }) => {
    const classes = useStyles();

    const setDefaults = () => {
        return {
            name: '',
            color: '',
            type: '',
        };
    };

    const { register, handleSubmit, control, watch } = useForm(setDefaults());

    const onSubmit = () => {

    };

    return (
        <React.Fragment>
            <FormHeaderSection text={'New Source'} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} container direction='row' justifyContent='space-between'>
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            fullWidth
                            id={'name'}
                            name={'name'}
                            label={'name'}
                            inputRef={register()}
                            type={'string'}
                        />
                        <TextField
                            variant='outlined'
                            className={classes.textField}
                            fullWidth
                            id={'color'}
                            name={'color'}
                            label={'color'}
                            inputRef={register()}
                            type={'string'}
                        />
                        <InputSelector
                            control={control}
                            label={'type'}
                            menuItems={['Movie', 'TV', 'Video Games']}
                            value={'something'}
                        />;
                    </Grid>
                    <Grid item xs={12} direction='row' justifyContent='center' className={classes.submitButtonrow}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            className={classes.submit}
                        >
                            {GENERAL.BUTTON.SUBMIT}
                        </Button>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    conatiner: {
        paddingTop: theme.spacing(2),
        overflow: 'hidden',
    },
    textField: {
        margin: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        // maxWidth: 200,
        backgroundColor: Color.blue(),
        color: Color.white(),
        '&:hover': {
            color: Color.blue(),
            backgroundColor: Color.white(),
        },
    },
}));

NewSourceForm.propTypes = {
    closeModal: PropTypes.bool,
};