import { useMediaQuery } from 'react-responsive';
import { SREEN_SIZE } from 'shared/constants/screenSize';

export const ScreenSize = props => {

    const { setScreenSizes } = props;
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: SREEN_SIZE.LG });
    const isTablet = useMediaQuery({ maxWidth: SREEN_SIZE.LG });
    const isMobileDevice = useMediaQuery({ maxDeviceWidth: SREEN_SIZE.SM });
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    
    setScreenSizes({
        isDesktopOrLaptop: isDesktopOrLaptop,
        isTablet: isTablet,
        isMobileDevice: isMobileDevice,
        isPortrait: isPortrait,
    });

    return (
        null
    );
};