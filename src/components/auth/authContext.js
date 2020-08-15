import { createContext } from 'react';

export const defaultUser = { 
    loggedIn: false, 
    email: '',
    id: '',
    displayName: '',
};

const UserContext = createContext(defaultUser);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext;