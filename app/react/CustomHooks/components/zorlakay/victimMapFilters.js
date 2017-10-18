import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterHub from './filterHub';
import { STATUS_AS_VICTIM, LOCAL_GEOGRAPHICAL_AREA } from './constants';
import { getThesauriItemLabel } from './helpers';

const VictimMapFilters = ({victims, onFilter, thesauris}) => {
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

const mapStateToProps = ({thesauris}) => ({thesauris});

export default connect(mapStateToProps)(VictimMapFilters);