import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { SREEN_SIZE } from 'shared/constants/screenSize';

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