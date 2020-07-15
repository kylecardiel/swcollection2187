import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store } from "store/storeFactory";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from 'backend/Firebase';

const rrfConfig = { userProfile: 'users' }

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
