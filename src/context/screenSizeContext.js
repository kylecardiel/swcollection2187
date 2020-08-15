import { createContext } from 'react';

export const defaultScreenSize = {
    isLargeDesktopOrLaptop: false,
    isMediumDesktopOrLaptop: false,
    isTablet: false,
    isMobileDevice: false,
    isPortrait: false,
};

const ScreenSizeContext = createContext(defaultScreenSize);
export const ScreenSizeProvider = ScreenSizeContext.Provider;
export const ScreenSizeConsumer = ScreenSizeContext;