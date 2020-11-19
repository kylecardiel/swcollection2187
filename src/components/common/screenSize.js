import PropTypes from 'prop-types';
import React from 'react';
import { SREEN_SIZE } from 'shared/constants/screenSize';
import { useMediaQuery } from 'react-responsive';

export const ScreenSize = ({ setScreenSizes }) => {
    
    const isLargeDesktopOrLaptop = useMediaQuery({ minDeviceWidth: SREEN_SIZE.XL });
    const isMediumDesktopOrLaptop = useMediaQuery({ minDeviceWidth: SREEN_SIZE.LG });

    let screenSize = {
        isLargeDesktopOrLaptop: isLargeDesktopOrLaptop,
        isMediumDesktopOrLaptop: isMediumDesktopOrLaptop && !isLargeDesktopOrLaptop,
        isTablet: useMediaQuery({ maxWidth: SREEN_SIZE.LG }),
        isMobileDevice: useMediaQuery({ maxDeviceWidth: SREEN_SIZE.SM }),
        isPortrait: useMediaQuery({ orientation: 'portrait' }),
    };

    setScreenSizes(screenSize);
    
    return ( 
        <>{null}</> 
    );
};

ScreenSize.propTypes = {
    setScreenSizes: PropTypes.func.isRequired,
};