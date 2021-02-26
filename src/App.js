import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { formatFormData } from 'components/common/form/formatFormData';
import { FeatureFlagProvider } from 'context/featureFlagsContext';
import { StorageReferenceProvider } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Routes } from 'routes/routes';
import { FeatureFlagApi } from 'shared/api/featureFlagApi';
import { HelperDataApi } from 'shared/api/helperDataApi';
import { StorageReferencesApi } from 'shared/api/storageReferencesApi';
import { featureFlagsData } from 'shared/fixtures/featureFlagData';
import { helperData } from 'shared/fixtures/helperData';
import { storageReferencesData } from 'shared/fixtures/storageReferenceData';
import { isProduction } from 'shared/util/environment';
import { setHelperData } from 'store/helperData/helperDataSetActions';
import { setScreenSizes } from 'store/screenSize/screenSizeActions';

export const App = ({ setHelperData, setScreenSizes }) => {
    const [user, setUser] = useState({ loggedIn: false });
    const [storageReferences, setStorageReferences] = useState({});
    const [featureFlags, setFeatureFlags] = useState({});

    useEffect(() => {
        onAuthStateChange(setUser);

        if (isProduction){
            const helperDataRef = HelperDataApi.read();
            helperDataRef.on('value', snapshot => {
                const snapshotRef = snapshot.val();
                if (snapshotRef) {
                    setHelperData(formatFormData(snapshotRef));
                }
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

        } else {
            setHelperData(formatFormData(helperData));
            setFeatureFlags(featureFlagsData);
            setStorageReferences({ commingSoonPhotoUrl: storageReferencesData.photoComingSoon['-MFRMcLIEPfRlDK8O3Ye'] });
        }

    }, [setHelperData, setFeatureFlags]);

    return (
        <FeatureFlagProvider value={featureFlags}>
            <StorageReferenceProvider value={storageReferences}>
                <UserProvider value={user}>
                    <Routes setScreenSizes={setScreenSizes} />
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