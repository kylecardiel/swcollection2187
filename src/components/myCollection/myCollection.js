import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import BlackSeriesCatalogConnect from 'components/hoc/blackSeriesCatalogConnect';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

const { HOME } = ROUTE_CONSTANTS;

export const MyCollection = props => {

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.MY_COLLECTION.TITLE} />
            <BlackSeriesCatalogConnect />
        </React.Fragment>
    )
}