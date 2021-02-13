/* eslint-disable react/prop-types */
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { ActionButton } from 'components/common/buttons/actionButton';
import PropTypes from 'prop-types';
import React from 'react';
import { GENERAL } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { BUTTON } = GENERAL;

export const MyCollectionButton = ({ filterByMyCollection, handleMyCollectionChange, isTablet }) => {
    const label = isTablet ? null : filterByMyCollection ? BUTTON.MY_COLLECTION : BUTTON.ALL;
    const icon = filterByMyCollection ? <CollectionsBookmarkIcon /> : <ViewComfyIcon />;
    return (
        <ActionButton
            buttonLabel={label}
            icon={icon}
            onClick={handleMyCollectionChange}
            color={Color.green()}
        />
    );
};

MyCollectionButton.propTypes = {
    filterByMyCollection: PropTypes.bool,
    handleMyCollectionChange: PropTypes.func.isRequired,
    isTablet: PropTypes.bool.isRequired,
};
