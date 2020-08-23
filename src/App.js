import { onAuthStateChange } from 'backend/FirebaseAuth';
import { UserProvider } from 'components/auth/authContext';
import { ScreenSizeProvider } from 'context/screenSizeContext';
import { HelperDataProvider } from 'context/helperDataContext';
import { StorageReferenceProvider } from 'context/storageReferenceContext';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SREEN_SIZE } from 'shared/constants/screenSize';
import { PrivateRoutes } from './routes/privateRoutes';
import { PublicRoutes } from './routes/publicRoutes';
import { formatFormData } from 'components/common/form/formatFormData';
import { HelperDataApi, StorageReferencesApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';

export const App = () => {
    const [user, setUser] = useState({ loggedIn: false });
    const [helperData, setHelperData] = useState({});
    const [storageReferences, setStorageReferences] = useState({});
    const [screenSize] = useState({
        isLargeDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.XL }),
        isMediumDesktopOrLaptop: useMediaQuery({ minDeviceWidth: SREEN_SIZE.LG }),
        isTablet: useMediaQuery({ maxWidth: SREEN_SIZE.LG }),
        isMobileDevice: useMediaQuery({ maxDeviceWidth: SREEN_SIZE.SM }),
        isPortrait: useMediaQuery({ orientation: 'portrait' }),
    });

    useEffect(() => {
        onAuthStateChange(setUser);

        const helperDataRef = HelperDataApi.read(FB_DB_CONSTANTS.HELPER_DATA);
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) setHelperData(formatFormData(snapshotRef));
        });

        const storageReferencesDataRef = StorageReferencesApi.read(FB_DB_CONSTANTS.STORAGE_REFERENCES);
        storageReferencesDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) setStorageReferences({ commingSoonPhotoUrl: snapshotRef.photoComingSoon['-MFRMcLIEPfRlDK8O3Ye'] })
        });
    }, []);


    return (
        <ScreenSizeProvider value={screenSize}>
            <StorageReferenceProvider value={storageReferences}>
                <HelperDataProvider value={helperData}>
                    <UserProvider value={user}>
                        <PrivateRoutes />
                        <PublicRoutes />
                    </UserProvider>
                </HelperDataProvider>
            </StorageReferenceProvider>
        </ScreenSizeProvider>
    );
};