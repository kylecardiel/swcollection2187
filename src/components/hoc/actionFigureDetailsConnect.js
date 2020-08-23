import React from 'react';
import { ActionFigureDetails } from 'components/display/actionFigureDetail';

export const ActionFigureDetailsConnect = props => {
    const { catalogList, figure, sourceMaterials, assortments, commingSoonPhotoUrl } = props.location.state;
    return ( 
        <ActionFigureDetails 
            figure={figure} 
            catalogList={catalogList} 
            sourceMaterials={sourceMaterials} 
            assortments={assortments}
            commingSoonPhotoUrl={commingSoonPhotoUrl}
        /> 
    );
};
