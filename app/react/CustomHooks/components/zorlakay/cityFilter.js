import React from 'react';
import { connect } from 'react-redux';
import MapFilter from './mapFilter';
import { LOCAL_GEOGRAPHICAL_AREA } from './constants';
import { getThesauriItemLabel } from './helpers';

const CityFilter = ({data, onFilter, thesauris}) => {
    const getValue = (rawVal, field, obj) => {
        return rawVal.length? getThesauriItemLabel(thesauris, LOCAL_GEOGRAPHICAL_AREA, rawVal[0]) : 
            'Unknown';
    };

    return (
        <MapFilter 
            title="City"
            onFilter={onFilter}
            data={data}
            field='place_of_the_event'
            getValue={getValue} />
    );
};

const mapStateToProps = ({thesauris}) => ({thesauris});

export default connect(mapStateToProps)(CityFilter);
