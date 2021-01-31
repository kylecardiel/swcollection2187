import { appReducer } from 'store/appReducer';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { isProduction } from 'shared/util/environment';
import { initialState } from 'store/initialState';
import thunk from 'redux-thunk';

let logger = createLogger();

let middleware = [];
if (isProduction) {
    middleware = [...middleware, thunk];
} else {
    middleware = [...middleware, thunk, logger];
}

export const store = createStore(appReducer, initialState, applyMiddleware(...middleware));