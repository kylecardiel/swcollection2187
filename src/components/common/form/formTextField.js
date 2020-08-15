import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export const FormTextField = props => {

    const { backgroundColor } = props;
    const classProps = { backgroundColor: backgroundColor };
    const classes = useStyles(classProps);

    return (
        <TextField
            className={classes.main}
            label={props.label}
            name={props.label.toLowerCase()}
            id={props.name}
            type={props.type}
            inputRef={props.register}
            autoFocus={props.autoFocus}
            variant='outlined'
            required
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

const useStyles = makeStyles(() => ({
    main: {
        backgroundColor: props => props.backgroundColor,
    },
}));
