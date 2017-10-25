import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterHub from './filterHub';
import { getThesauriItemLabel } from './helpers';

const VictimMapFilters = ({victims, onFilter, thesauris, settings}) => {
    const idConfig = settings.collection.get('custom').get('zorlakayIds');
    const LOCAL_GEOGRAPHICAL_AREA = idConfig.get('thesauriLocalGeographicalArea');
    const filters = [
        {
            title: 'City',
            field: 'place_of_the_event',
            getValue: (rawVal, field, obj) => {
                if (!rawVal.length) return 'Unknown';
                return rawVal.map(val => getThesauriItemLabel(thesauris, LOCAL_GEOGRAPHICAL_AREA, val))
            }
        },
        {
            title: 'Year',
            field: 'initial_date',
            getValue: (rawVal, field, obj) => {
                return String(new Date(rawVal * 1000).getFullYear());
            }
        }
    ];
    return (
        <FilterHub data={ victims }
            onFilter={ onFilter }
            filters={ filters } />
    )
};

const mapStateToProps = ({thesauris, settings}) => ({thesauris, settings});

export default connect(mapStateToProps)(VictimMapFilters);