import React, { useState, useEffect } from 'react';
import { Routes } from './routes/routes';
import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';

export const App = () => {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);
  
  return (
    <UserProvider value={user}>
      <Routes />
    </UserProvider>
  );

}