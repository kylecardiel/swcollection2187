import { createContext } from 'react';

export const featureFlagDefault = {};

const FeatureFlagContext = createContext(featureFlagDefault);
export const FeatureFlagProvider = FeatureFlagContext.Provider;
export const FeatureFlagConsumer = FeatureFlagContext;