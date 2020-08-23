import { createContext } from 'react';

export const defaultUser = { 
    loggedIn: false, 
    email: '',
    id: '',
};

const UserContext = createContext(defaultUser);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext;