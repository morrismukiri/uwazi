import React from 'react';
import { connect } from 'react-redux';
import MapFilter from './mapFilter';

const YearFilter = ({data, onFilter}) => {
    const getValue = (rawVal, field, obj) => {
        return String(new Date(rawVal).getFullYear());
    };

    return (
        <MapFilter 
            title="Year"
            onFilter={onFilter}
            data={data}
            field='initial_date'
            getValue={getValue} />
    );
};

export default connect()(YearFilter);
