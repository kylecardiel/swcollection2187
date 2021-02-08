import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabelText } from 'components/common/form/newFormSelectors/inputLabelText';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { GENERAL } from 'shared/constants/stringConstantsSelectors';

export const InputSelector = ({ control, label, menuItems, value }) => {
    const classes = useStyles();

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const menuItemNone = <MenuItem key={GENERAL.MENU_ITEMS.NONE} value={null}><em>{GENERAL.MENU_ITEMS.NONE}</em></MenuItem>;

    const { KEY, VALUE } = label;
    const defaultValue = value ? value : '';

    return (
        <>
            <InputLabelText text={KEY} />
            <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
                <FormControl variant='outlined' className={classes.form}>
                    <InputLabel ref={inputLabel} id={`${VALUE}-label`}>{VALUE}</InputLabel>
                    <Controller
                        name={VALUE}
                        control={control}
                        defaultValue={defaultValue}
                        as={
                            <Select
                                label={VALUE}
                                labelId={VALUE}
                                labelWidth={labelWidth}
                                inputProps={{ name: VALUE }}
                            >
                                {menuItemNone}
                                {menuItems.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                            </Select>
                        }
                    />
                </FormControl>
            </Grid>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 120,
    },
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

InputSelector.propTypes = {
    control: PropTypes.func.isRequired, 
    label: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    value: PropTypes.string,
};
