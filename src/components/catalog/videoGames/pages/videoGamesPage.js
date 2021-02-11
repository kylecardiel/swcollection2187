import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import VideoGameCatalogConnect from 'components/hoc/videoGame/videoGameCatalogConnect';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

const { HOME } = ROUTE_CONSTANTS;

export const VideoGamesPage = () => {
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.VIDEO_GAME_CATALOG.TITLE} />
            <VideoGameCatalogConnect />
        </React.Fragment>
    );
};