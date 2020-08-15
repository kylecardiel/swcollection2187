import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { forEach } from 'lodash';
import React from 'react';
import { Color } from 'shared/styles/color';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        minWidth: 120,
        backgroundColor: props => props.backgroundColor,
    },
}));

export const FormSelector = props => {

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const classProps = { backgroundColor: props.disabled ? Color.lightGrey() : Color.white() };
    const classes = useStyles(classProps);

    let menuItems = [];
    const menuItemsList = () => {
        forEach(props.menuItems, menuItem => {
            menuItems.push(
                <MenuItem key={menuItem.value} value={menuItem.value}>
                    {menuItem.label}
                </MenuItem>
            );
        });
        return menuItems;
    };

    return (
        <FormControl variant="outlined" className={classes.form}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {props.inputLabel}
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                labelWidth={labelWidth}
                // onChange={props.handleChange}
                disabled={props.disabled}
                inputProps={props.inputProps}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                 {menuItemsList()}
            </Select>
        </FormControl>
    );
}
