import BlackSeriesCatalogConnect from 'components/hoc/actionFigures/blackSeries/blackSeriesCatalogConnect';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME } = ROUTE_CONSTANTS;

export const BlackSeries = () => {
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
        {
            route: HOME,
            title: PAGES.ACTION_FIGURES.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.BLACK_SERIES_CATALOG.TITLE} />
            <BlackSeriesCatalogConnect />
        </React.Fragment>
    );
};