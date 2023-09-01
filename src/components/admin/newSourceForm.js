import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { GENERAL, NEW_SOURCE_FORM_LABELS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { InputSelector } from 'components/common/form/newFormSelectors/inputSelector';
import { InputText } from 'components/common/form/newFormSelectors/inputText';
import { HelperDataApi } from 'shared/api/helperDataApi';
import { onValue } from 'firebase/database';
import { ChromePicker } from 'react-color';

const { LABELS } = NEW_SOURCE_FORM_LABELS;

export const NewSourceForm = ({ closeModal, item }) => {
    const classes = useStyles();
    const setDefaults = () => {
        return item 
            ? { defaultValues: item } 
            : {
                name: '',
                color: '',
                type: '',
                year: '',
            };
    };

    const { register, handleSubmit, control, watch } = useForm(setDefaults());
    const [sourceMaterial, setSourceMaterial] = useState();
    const [color, setColor] = useState(item.color);
    const typeWatcher = watch('type');

    useEffect(() => {
        const catalogRef = HelperDataApi.read();
        onValue(catalogRef, snapshot => {
            const snapshotValue = snapshot.val();
            const key = Object.keys(snapshotValue.sourceMaterial)[0];
            setSourceMaterial({ key, value: snapshotValue.sourceMaterial[key] });
        });
    }, []);

    const onSubmit = async source => {
        let formData = {};
        source.color = color.hex;
        if(item) {
            const newSetSourceMaterials = sourceMaterial.value.filter(el => el.name !== item.name);
            newSetSourceMaterials.push(source);
            formData[sourceMaterial.key] = newSetSourceMaterials;
            HelperDataApi.update(formData, 'sourceMaterial');
        } else {
            sourceMaterial.value.push(source);
            formData[sourceMaterial.key] = sourceMaterial.value;
            HelperDataApi.update(formData, 'sourceMaterial');
        }
        closeModal();
    };

    return (
        <React.Fragment>
            <FormHeaderSection text={'New Source'} textColor={'white'} />
            <Container component='main' maxWidth='xl' className={classes.conatiner}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} container direction='row' justifyContent='space-between'>
                        <Grid xs={12} container>
                            <InputText label={LABELS.NAME} register={register} />
                            <InputText label={LABELS.YEAR} register={register} />
                            <InputSelector
                                control={control}
                                label={LABELS.TYPE}
                                menuItems={['Books', 'Comics', 'Movie', 'TV', 'Video Games']}
                                value={typeWatcher}
                            />
                        </Grid>
                        <Grid xs={12} container direction='row' justifyContent='center'>
                            <ChromePicker 
                                color={color}
                                onChangeComplete={(c) => setColor(c)}
                            />
                        </Grid>
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

NewSourceForm.propTypes = {
    closeModal: PropTypes.func,
    item: PropTypes.object,
};