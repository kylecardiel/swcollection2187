// import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { RecordUtils } from 'shared/util/recordUtils';
import { CatalogData } from 'shared/fixtures/catalogData';
// import { makeStyles } from '@material-ui/core/styles';
import { VintageCollectionCard } from 'components/catalog/actionFigures/vintageCollection/cards/viewportCard/vintageCollectionCard';
import { isProduction } from 'shared/util/environment';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { CatalogApi } from 'shared/api/catalogApi';
// import { UserApi } from 'shared/api/userApi';
import { UserConsumer } from 'components/auth/authContext';
// import { usersData } from 'shared/fixtures/userData';
import { Viewport } from 'components/common/viewport/viewport';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const VintageCollectionCatalog = (props) => {
    const { id, loggedIn } = useContext(UserConsumer);
    const { helperData, catalogList, setCatalogData, setUserData, screenSize, filterState } = props;
    // const classes = useStyles();
    
    const [initialState] = useState(props);
    useEffect(() => {
        
        if(isProduction) {
            const catalogRef = CatalogApi.read(`${ACTION_FIGURES.THE_VINTAGE_COLLECTION}`);
            catalogRef.once('value').then((snapshot => {
                if (snapshot.val()) {
                    setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshot.val(), 'id'));
                }
            }));
        } else {
            setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.ActionFigures.TheVintageCollection, 'id'));
            // setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(usersData.ActionFigures.TheVintageCollection, 'ownedId'));
        }

    }, [initialState, setCatalogData, setUserData, id, loggedIn, helperData, catalogList.length]);

    const defaultFigureSizeSmall = filterState.figureSizeSmall === undefined ? screenSize.isMobileDevice : filterState.figureSizeSmall;
    const [figureSizeSmall] = useState(defaultFigureSizeSmall);

    const defaultNewBoxImage = filterState.figureSizeSmall === undefined ? screenSize.isMobileDevice : filterState.figureSizeSmall;
    const [newBoxImage] = useState(defaultNewBoxImage);

    const GAP_SIZE = figureSizeSmall ? 5 : 20;
    const CARD_HEIGHT = figureSizeSmall ? 200 : 400;
    const CARD_WIDTH = figureSizeSmall ? 75 : 200;

    return (
        <>
            {/* <Container component='main' maxWidth='xl' className={classes.container}>
                Search and Filter Components to come 
            </Container> */}
            <Viewport
                CardComponent={VintageCollectionCard} 
                displayList={catalogList} 
                CARD_HEIGHT={CARD_HEIGHT} 
                CARD_WIDTH={CARD_WIDTH} 
                GAP_SIZE={GAP_SIZE}
                isDisabled
                other={{
                    assortments: helperData.assortment,
                    catalogList: catalogList,
                    newBoxImage: newBoxImage,
                    smallFigureView: figureSizeSmall,
                    sourceMaterials: helperData.sourceMaterial,
                    view: true,
                }}
            />
        </>
    );
};

// const useStyles = makeStyles(theme => ({
//     container: {
//         margin: theme.spacing(10),
//     },
// }));

VintageCollectionCatalog.propTypes = {
    catalogList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setCatalogData: PropTypes.func.isRequired,
    screenSize: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
    setUserDisplaySettings: PropTypes.func.isRequired,
    clearUserDisplaySettings: PropTypes.func.isRequired,
    filterState: PropTypes.object.isRequired,
};
