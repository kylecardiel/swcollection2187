import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/common/form/newFormSelectors/inputText';
import Grid from '@material-ui/core/Grid';

export const NewSourceForm = ({ closeModal }) => {
    const classes = useStyles();

    const { register, handleSubmit, control, watch } = useForm();

    const nameInput = <InputText
        label={'Name'}
        register={register}
    />;

    const colorInput = <InputText
        label={'Color'}
        register={register}
    />;

    const typeInput = <InputText
        label={'Type'}
        register={register}
    />;

    return (
        <React.Fragment>
            <FormHeaderSection text={'New Source'} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                <Grid item xs={12} container direction='column' justifyContent='center'>
                    {nameInput}
                    {colorInput}
                    {typeInput}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    conatiner: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(35),
    },
}));

NewSourceForm.propTypes = {
    closeModal: PropTypes.bool,
};