import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
// import { VintageCollectionCatalog } from 'components/catalog/actionFigures/vintageCollection/pages/vintageCollectionCatalog';
import VintageCollectionCatalogConnect from 'components/hoc/actionFigures/vintageCollection/vintageCollectionCatalogConnect';

const { HOME } = ROUTE_CONSTANTS;

export const VintageCollection = () => {
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.BLACK_SERIES_CATALOG.TITLE} />
            <VintageCollectionCatalogConnect />
        </React.Fragment>
    );
};