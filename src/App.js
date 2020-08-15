import React, { useState, useEffect } from 'react';
import { PublicRoutes } from './routes/publicRoutes';
import { PrivateRoutes } from './routes/privateRoutes';
import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { setScreenSizes } from 'store/screenSize/screenSizeActions';
import { connect } from 'react-redux';

export const App = ({ setScreenSizes }) => {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    onAuthStateChange(setUser);
  }, []);

  
  return (
    <UserProvider value={user}>
      <PrivateRoutes />
      <PublicRoutes setScreenSizes={setScreenSizes}/>
    </UserProvider>
  );
};

export const mapDispatchToProps = dispatch => ({
  setScreenSizes: size => dispatch(setScreenSizes(size)),
});

export default connect(null, mapDispatchToProps)(App);