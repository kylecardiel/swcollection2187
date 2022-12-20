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
import { isProduction } from 'shared/util/environment';
import { setHelperData } from 'store/helperData/helperDataSetActions';
import { setScreenSizes } from 'store/screenSize/screenSizeActions';
import helperDataFile from 'shared/fixtures/helperData.json';
import featureFlagsDataFile from 'shared/fixtures/featureFlagData.json';
import storageReferencesDataFile from 'shared/fixtures/storageReferenceData.json';
import { onValue } from 'firebase/database';

const { helperData } = helperDataFile;
const { featureFlagsData } = featureFlagsDataFile;
const { storageReferencesData } = storageReferencesDataFile;

export const App = ({ setHelperData, setScreenSizes }) => {
    const [user, setUser] = useState({ loggedIn: false });
    const [storageReferences, setStorageReferences] = useState({});
    const [featureFlags, setFeatureFlags] = useState({});

    useEffect(() => {
        onAuthStateChange(setUser);

        if (isProduction){
            const helperDataRef = HelperDataApi.read();
            onValue(helperDataRef, snapshot => {
                const snapshotRef = snapshot.val();
                if (snapshotRef) {
                    setHelperData(formatFormData(snapshotRef));
                }
            });

            const storageReferencesDataRef = StorageReferencesApi.read();
            onValue(storageReferencesDataRef, snapshot => {
                const snapshotRef = snapshot.val();
                if (snapshotRef) setStorageReferences({ commingSoonPhotoUrl: snapshotRef.photoComingSoon['-MFRMcLIEPfRlDK8O3Ye'] });
            });

            const featureFlagDataRef = FeatureFlagApi.read();
            onValue(featureFlagDataRef, snapshot => {
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