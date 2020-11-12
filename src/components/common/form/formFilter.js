import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'shared/styles/color';

export const FormFilter = ({ menuList, onChange, label, inputLabel, labelWidth, value }) => {

    const classes = useStyles();
    const menuItemsList = list => {
        return list.map(item =>
            <MenuItem key={item} value={item}>{item}</MenuItem>
        )
    };

    return (
        <div className={classes.container}>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel ref={inputLabel} id={`${label}-id`}>{label}</InputLabel>
                <Select
                    labelId={`${label}-id`}
                    id={label}
                    onChange={onChange}
                    labelWidth={labelWidth}
                    defaultValue={''}
                    label={label}
                    value={value}
                >
                    <MenuItem key={'none'} value={null}><em>{'none'}</em></MenuItem>
                    {menuItemsList(menuList)}
                </Select>
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
        backgroundColor: Color.white(),
    },
}));