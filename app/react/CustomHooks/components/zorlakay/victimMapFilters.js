import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterHub from './filterHub';
import { STATUS_AS_VICTIM, LOCAL_GEOGRAPHICAL_AREA } from './constants';
import { getThesauriItemLabel } from './helpers';

const VictimMapFilters = ({victims, onFilter, thesauris}) => {
    const filters = [
        {
            title: 'Status as Victim',
            field: 'status_of_the_victim_at_the_end_of_act',
            getValue: (rawVal, field, obj) => {
                return getThesauriItemLabel(thesauris, STATUS_AS_VICTIM, rawVal);
            }
        },
        {
            title: 'City',
            field: 'place_of_the_event',
            getValue: (rawVal, field, obj) => {
                return rawVal.length? getThesauriItemLabel(thesauris, LOCAL_GEOGRAPHICAL_AREA, rawVal[0]) : 
                    'Unknown';
            }
        },
        {
            title: 'Year',
            field: 'initial_date',
            getValue: (rawVal, field, obj) => {
                return String(new Date(rawVal).getFullYear());
            }
        },
        {
            title: 'Civil Status',
            field: 'civil_status',
            getValue: (rawVal, field, obj) => {
                return rawVal;
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