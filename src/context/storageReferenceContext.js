import { createContext } from 'react';

export const storagerefDefault = {};

const StorageReferenceContext = createContext(storagerefDefault);
export const StorageReferenceProvider = StorageReferenceContext.Provider;
export const StorageReferenceConsumer = StorageReferenceContext;