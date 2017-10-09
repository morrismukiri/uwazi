import React from 'react';
import MapFilter from './mapFilter';

export default ({data, onFilter}) => {
    const getValue = (rawVal, field, obj) => {
        return rawVal;
    };

    return (
        <MapFilter 
            title="Marital Status"
            onFilter={onFilter}
            data={data}
            field='civil_status'
            getValue={getValue} />
    );
};