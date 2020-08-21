import { createContext } from 'react';

export const defaultHelperData = {};

const HelperDataContext = createContext(defaultHelperData);
export const HelperDataProvider = HelperDataContext.Provider;
export const HelperDataConsumer = HelperDataContext;