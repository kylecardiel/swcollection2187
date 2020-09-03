import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { ScreenSizeProvider } from 'context/screenSizeContext';
import { StorageReferenceProvider } from 'context/storageReferenceContext';
import { FeatureFlagProvider } from 'context/featureFlagsContext';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SREEN_SIZE } from 'shared/constants/screenSize';
import { PrivateRoutes } from './routes/privateRoutes';
import { PublicRoutes } from './routes/publicRoutes';
import { formatFormData } from 'components/common/form/formatFormData';
import { HelperDataApi, StorageReferencesApi, FeatureFlagApi, UserApi } from 'shared/api/orchestrator';
import { connect } from 'react-redux';
import { setHelperData } from 'store/helperData/helperDataSetActions';

export const App = ({ setHelperData }) => {
    const [user, setUser] = useState({ loggedIn: false });
    const [storageReferences, setStorageReferences] = useState({});
    const [featureFlags, setFeatureFlags] = useState({});
    const [screenSize] = useState({
        isLargeDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.XL }),
        isMediumDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.LG }),
        isTablet: useMediaQuery({ maxWidth: SREEN_SIZE.LG }),
        isMobileDevice: useMediaQuery({ maxDeviceWidth: SREEN_SIZE.SM }),
        isPortrait: useMediaQuery({ orientation: 'portrait' }),
    });

    useEffect(() => {
        onAuthStateChange(setUser);

        const helperDataRef = HelperDataApi.read();
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            console.log(snapshotRef)
            if (snapshotRef) setHelperData(formatFormData(snapshotRef));
        });

        const storageReferencesDataRef = StorageReferencesApi.read();
        storageReferencesDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            console.log(snapshotRef)
            if (snapshotRef) setStorageReferences({ commingSoonPhotoUrl: snapshotRef.photoComingSoon['-MFRMcLIEPfRlDK8O3Ye'] })
        });

        const featureFlagDataRef = UserApi.read();
        console.log(featureFlagDataRef)
        featureFlagDataRef.on('value', snapshot => {
            console.log(snapshot)
            const snapshotRef = snapshot.val();
            console.log('hitting??')
            console.log(snapshotRef)
            if (snapshotRef) setFeatureFlags(snapshotRef)
        });

    }, [setHelperData, setFeatureFlags]);

    console.log(featureFlags)
    console.log(storageReferences)

    return (
        <FeatureFlagProvider value={featureFlags}>
            <ScreenSizeProvider value={screenSize}>
                <StorageReferenceProvider value={storageReferences}>
                    <UserProvider value={user}>
                        <PrivateRoutes />
                        <PublicRoutes />
                    </UserProvider>
                </StorageReferenceProvider>
            </ScreenSizeProvider>
        </FeatureFlagProvider>
    );
};

export const mapDispatchToProps = dispatch => ({
    setHelperData: data => dispatch(setHelperData(data)),
});

export default connect(null, mapDispatchToProps)(App);