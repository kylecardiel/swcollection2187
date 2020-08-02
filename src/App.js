import React, { useState, useEffect } from 'react';
import { PublicRoutes } from './routes/publicRoutes';
import { PrivateRoutes } from './routes/privateRoutes';
import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
// import { ScreenSize } from 'components/common/screenSize';

export const App = () => {
  const [user, setUser] = useState({ loggedIn: false });
  // const [screenSizes, setScreenSizes] = useState({});

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  // console.log(screenSizes);
  
  return (
    <UserProvider value={user}>
      <PrivateRoutes />
      <PublicRoutes />
    </UserProvider>
  );

}