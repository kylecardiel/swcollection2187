/* eslint-disable react/prop-types */
import Grid from '@material-ui/core/Grid';
import { CatalogFilter } from 'components/catalog/common/filters/catalogFilter';
import { FormFilter } from 'components/common/form/formFilter';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { GENERAL_FILTER_MODAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';

export const VideoGameFilter = ({ 
    closeModal, 
    fitlerCriteria, 
    filteribleYears,
    handleClearFilters, 
    handleFilterChange, 
    helperData, 
    isMobileDevice, 
}) => {

    const inputLabel = useRef(null);
    const [labelWidth] = useState(0);

    const buildFilter = (key, menuList, filterName) => {
        return <Grid item md={4} xs={12} >
            <FormFilter
                key={key}
                menuList={menuList}
                onChange={handleFilterChange(filterName)}
                label={key}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={fitlerCriteria[filterName]}
            />
        </Grid>;
    };

    const { CONSOLE, NAME, VIDEO_GAME_FORMAT, VIDEO_GAME_SERIES, VIDEO_GAME_TYPE, YEAR } = NEW_VIDEO_GAME_FORM.LABELS;
    const { videoGameConsole, videoGameFormat, videoGameSeries, videoGameType } = helperData;

    return (
        <CatalogFilter
            closeModal={closeModal}
            fitlerComponentSet={
                <>
                    {buildFilter(CONSOLE.KEY, videoGameConsole.values, 'videoGameConsole')}
                    {buildFilter(VIDEO_GAME_FORMAT.KEY, videoGameFormat.values, 'videoGameFormat')}
                    {buildFilter(VIDEO_GAME_SERIES.KEY, videoGameSeries.values, 'videoGameSeries')}
                    {buildFilter(VIDEO_GAME_TYPE.KEY, videoGameType.values, 'videoGameType')}
                    {buildFilter(YEAR.KEY, filteribleYears, 'year')}
                </>
            }
            handleClearFilters={handleClearFilters}
            isMobileDevice={isMobileDevice}
            sortComponent={buildFilter(GENERAL_FILTER_MODAL.LABELS.SORTING, [NAME.KEY, YEAR.KEY], 'sorting')
            }
        />     
    );
};

VideoGameFilter.propTypes = {
    closeModal: PropTypes.bool.isRequired, 
    fitlerCriteria: PropTypes.object.isRequired, 
    filteribleYears: PropTypes.array.isRequired,
    handleClearFilters: PropTypes.func.isRequired, 
    handleFilterChange: PropTypes.func.isRequired, 
    helperData: PropTypes.object.isRequired, 
    isMobileDevice: PropTypes.bool.isRequired, 
};
