/* eslint-disable react/prop-types */
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { ActionButton } from 'components/common/buttons/actionButton';
import PropTypes from 'prop-types';
import React from 'react';
import { BS_CATALOG } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { BUTTON } = BS_CATALOG;

export const MyCollectionButton = ({ filterByMyCollection, handleMyCollectionChange, isMobileDevice }) => {
    return (
        <ActionButton
            buttonLabel={isMobileDevice ? null : filterByMyCollection ? 'My Collection' : BUTTON.ALL}
            icon={filterByMyCollection ? <CollectionsBookmarkIcon /> : <ViewComfyIcon />}
            onClick={handleMyCollectionChange}
            color={Color.green()}
        />
    );
};

MyCollectionButton.propTypes = {
    filterByMyCollection: PropTypes.bool,
    handleMyCollectionChange: PropTypes.func.isRequired,
    isMobileDevice: PropTypes.bool.isRequired,
};
