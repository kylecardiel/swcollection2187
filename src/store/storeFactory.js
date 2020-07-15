import { createStore, applyMiddleware } from 'redux';
import { appReducer } from 'store/appReducer';
import thunk from 'redux-thunk';
import { initialState } from 'store/initialState';
import { createLogger } from 'redux-logger';

let logger = createLogger();

let middleware = [];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, thunk, logger];
} else {
    middleware = [...middleware, thunk];
}

export const store = createStore(appReducer, initialState, applyMiddleware(...middleware));