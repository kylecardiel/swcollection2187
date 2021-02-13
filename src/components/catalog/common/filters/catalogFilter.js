/* eslint-disable react/prop-types */
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import { ActionButton } from 'components/common/buttons/actionButton';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import PropTypes from 'prop-types';
import React from 'react';
import { GENERAL_FILTER_MODAL } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

export const CatalogFilter = ({ closeModal, fitlerComponentSet, handleClearFilters, isMobileDevice, sortComponent }) => {
    const classes = useStyles({ isMobileDevice });
    return (
        <div className={classes.fitlerRoot}>
            <FormHeaderSection text={GENERAL_FILTER_MODAL.HEADER} textColor={'white'} />
            <Grid container spacing={1} className={classes.fitlerContainer}>
                {fitlerComponentSet && 
                    <>
                        <Grid item xs={12}>
                            <div className={classes.modelHeaderContainer}>
                                {GENERAL_FILTER_MODAL.LABELS.FILTER}
                            </div>
                        </Grid>
                        {fitlerComponentSet}
                    </>
                }
                {sortComponent && 
                    <>
                        <Grid item xs={12}>
                            <div className={classes.modelHeaderContainer}>
                                {GENERAL_FILTER_MODAL.LABELS.SORT}
                            </div>
                        </Grid>
                        {sortComponent}
                    </>
                }
                <Grid item xs={12} container direction='row' justify='space-around' spacing={3} className={classes.container}>
                    <ActionButton
                        buttonLabel={GENERAL_FILTER_MODAL.BUTTONS.CLOSE}
                        icon={<SaveIcon />}
                        onClick={closeModal}
                        color={Color.blue()}
                    />
                    <div className={classes.buttons}>
                        <ActionButton
                            buttonLabel={GENERAL_FILTER_MODAL.BUTTONS.CLEAR}
                            icon={<ClearIcon />}
                            onClick={handleClearFilters}
                            color={Color.red()}
                        />
                    </div>
                </Grid>
            </Grid>
        </div> 
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    fitlerContainer: {
        padding: theme.spacing(2),
    },
    modelHeaderContainer: {
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
    },
    container: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    buttons: {
        marginTop: props => props.isMobileDevice ? theme.spacing(2) : null,
    },
}));

CatalogFilter.propTypes = {
    closeModal: PropTypes.func.isRequired,
    fitlerComponentSet: PropTypes.node.isRequired,
    handleClearFilters: PropTypes.func.isRequired,
    sortComponent: PropTypes.node,
};
