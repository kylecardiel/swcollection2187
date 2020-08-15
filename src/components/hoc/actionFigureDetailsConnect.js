import React from 'react';
import { ActionFigureDetails } from 'components/display/actionFigureDetail';

export const ActionFigureDetailsConnect = props => {
    const { catalog, catalogList, figure } = props.location.state;
    return ( 
        <ActionFigureDetails figure={figure} catalog={catalog} catalogList={catalogList}/> 
    );
};
