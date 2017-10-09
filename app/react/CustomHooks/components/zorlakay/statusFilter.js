import React from 'react';
import { connect } from 'react-redux';
import MapFilter from './mapFilter';
import { STATUS_AS_VICTIM } from './constants';
import { getThesauriItemLabel } from './helpers';

const StatusFilter = ({data, onFilter, thesauris}) => {
    const getValue = (rawVal, field, obj) => {
        return getThesauriItemLabel(thesauris, STATUS_AS_VICTIM, rawVal);
    };

    return (
        <MapFilter 
            title="Status as Victim"
            onFilter={onFilter}
            data={data}
            field='status_of_the_victim_at_the_end_of_act'
            getValue={getValue} />
    );
};

const mapStateToProps = ({thesauris}) => ({thesauris});

export default connect(mapStateToProps)(StatusFilter);
