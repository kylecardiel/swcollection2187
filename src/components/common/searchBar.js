import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { BS_CATALOG } from 'shared/constants/stringConstantsSelectors';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from 'shared/styles/color';

export const SearchBar = ({ filterByInputText, handleInputTextChange }) => {
    const classes = useStyles();
    
    return ( 
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    defaultValue={filterByInputText}
                    placeholder={BS_CATALOG.SEARCH}
                    classes={{ root: classes.inputRoot }}
                    onChange={handleInputTextChange}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        
        </> 
    );
};

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: Color.white(),
        '&:hover': {
            borderColor: Color.black(),
        },
        marginTop: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        border: '1px solid',
        borderColor: Color.grey(),
        cursor: 'pointer',
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        height: 30,
        width: '75%',
        [theme.breakpoints.up('md')]: {
            paddingLeft: '8%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '15%',
        },
    },
}));

SearchBar.propTypes = {
    filterByInputText: PropTypes.string,
    handleInputTextChange: PropTypes.func.isRequired,
};