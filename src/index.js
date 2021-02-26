import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from 'store/storeFactory';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'backend/Firebase';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

const rrfConfig = { userProfile: 'users' };

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
};

Modal.setAppElement('body');

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();
