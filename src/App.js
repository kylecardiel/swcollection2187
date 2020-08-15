import React, { useState, useEffect } from 'react';
import { PublicRoutes } from './routes/publicRoutes';
import { PrivateRoutes } from './routes/privateRoutes';
import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { ScreenSizeProvider } from 'context/screenSizeContext';
import { useMediaQuery } from 'react-responsive';
import { SREEN_SIZE } from 'shared/constants/screenSize';

export const App = ({ setScreenSizes }) => {
  const [user, setUser] = useState({ loggedIn: false });
  const [screenSize] = useState({
    isLargeDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.XL }),
    isMediumDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.LG }),
    isTablet: useMediaQuery({ maxWidth: SREEN_SIZE.LG }),
    isMobileDevice: useMediaQuery({ maxDeviceWidth: SREEN_SIZE.SM }),
    isPortrait: useMediaQuery({ orientation: 'portrait' }),
  });

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);


  return (
    <ScreenSizeProvider value={screenSize}>
      <UserProvider value={user}>
        <PrivateRoutes />
        <PublicRoutes setScreenSizes={setScreenSizes} />
      </UserProvider>
    </ScreenSizeProvider>
  );
};