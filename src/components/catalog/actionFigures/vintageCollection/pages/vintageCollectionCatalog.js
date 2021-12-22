import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RecordUtils } from 'shared/util/recordUtils';
import { CatalogData } from 'shared/fixtures/catalogData';
import { makeStyles } from '@material-ui/core/styles';
import { VintageCollectionCard } from 'components/catalog/actionFigures/vintageCollection/cards/vintageCollectionCard';

export const VintageCollectionCatalog = () => {
    const classes = useStyles();
    const [catalogData, setCatalogData] = useState(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.ActionFigures.TheVintageCollection, 'id'));

    console.log(catalogData)
    
    return (
        <React.Fragment>
            <Container component='main' maxWidth='xl' className={classes.container}>
                <VintageCollectionCard item={catalogData ? catalogData[0] : null}/>
            </Container>
        </React.Fragment >
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(10),
    },
}));

VintageCollectionCatalog.propTypes = {
    // catalogList: PropTypes.array.isRequired,
    // helperData: PropTypes.object.isRequired,
    // setCatalogData: PropTypes.func.isRequired,
    // screenSize: PropTypes.object.isRequired,
    // setUserData: PropTypes.func.isRequired,
    // userList: PropTypes.array.isRequired,
    // setUserDisplaySettings: PropTypes.func.isRequired,
    // clearUserDisplaySettings: PropTypes.func.isRequired,
    // filterState: PropTypes.object.isRequired,
};
