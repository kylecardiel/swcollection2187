import React, { useState, useEffect } from 'react';
import { PublicRoutes } from './routes/publicRoutes';
import { PrivateRoutes } from './routes/privateRoutes';
import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';

export const App = () => {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);
  
  return (
    <UserProvider value={user}>
      <PrivateRoutes />
      <PublicRoutes />
    </UserProvider>
  );

}