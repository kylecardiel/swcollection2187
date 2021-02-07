import { makeStyles } from '@material-ui/core/styles';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

const { HOME } = ROUTE_CONSTANTS;

export const VideoGameCatalog = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div>TBD</div>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
}));
