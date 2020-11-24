import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { StorageReferenceProvider } from 'context/storageReferenceContext';
import { FeatureFlagProvider } from 'context/featureFlagsContext';
import React, { useEffect, useState } from 'react';
import { PrivateRoutes } from './routes/privateRoutes';
import { PublicRoutes } from './routes/publicRoutes';
import { formatFormData } from 'components/common/form/formatFormData';
import { HelperDataApi, StorageReferencesApi, FeatureFlagApi } from 'shared/api/orchestrator';
import { connect } from 'react-redux';
import { setHelperData } from 'store/helperData/helperDataSetActions';
import { setScreenSizes } from 'store/screenSize/screenSizeActions';
import PropTypes from 'prop-types';

export const App = ({ setHelperData, setScreenSizes }) => {
    const [user, setUser] = useState({ loggedIn: false });
    const [storageReferences, setStorageReferences] = useState({});
    const [featureFlags, setFeatureFlags] = useState({});

    useEffect(() => {
        onAuthStateChange(setUser);

        const helperDataRef = HelperDataApi.read();
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) setHelperData(formatFormData(snapshotRef));
        });

        const storageReferencesDataRef = StorageReferencesApi.read();
        storageReferencesDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) setStorageReferences({ commingSoonPhotoUrl: snapshotRef.photoComingSoon['-MFRMcLIEPfRlDK8O3Ye'] });
        });

        const featureFlagDataRef = FeatureFlagApi.read();
        featureFlagDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) setFeatureFlags(snapshotRef);
        });

    }, [setHelperData, setFeatureFlags]);

    return (
        <FeatureFlagProvider value={featureFlags}>
            <StorageReferenceProvider value={storageReferences}>
                <UserProvider value={user}>
                    <PrivateRoutes setScreenSizes={setScreenSizes} />
                    <PublicRoutes />
                </UserProvider>
            </StorageReferenceProvider>
        </FeatureFlagProvider>
    );
};

export const mapDispatchToProps = dispatch => ({
    setHelperData: data => dispatch(setHelperData(data)),
    setScreenSizes: size => dispatch(setScreenSizes(size)),
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
    setHelperData: PropTypes.func.isRequired,
    setScreenSizes: PropTypes.func.isRequired,
};