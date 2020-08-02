import { createContext } from 'react';

export const defaultScreen = { 
    isLargeDesktopOrLaptop: true,
    isMediumDesktopOrLaptop: true,
    isTablet: false,
    isMobileDevice: false,
    isPortrait: false,
 };
const ScreenContext = createContext(defaultScreen);
export const ScreenProvider = ScreenContext.Provider;
export const ScreenConsumer = ScreenContext;