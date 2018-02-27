import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FilterHub from './filterHub';
import {getThesauriItemLabel} from './helpers';

const VictimMapFilters = ({victims, onFilter, thesauris, settings}) => {
  const idConfig = settings.collection.get('custom').get('zorlakayIds');
  const LOCAL_GEOGRAPHICAL_AREA = idConfig.get('thesauriLocalGeographicalArea');
  const filters = [
    {
      title: 'City',
      field: 'city',
      getValue: (rawVal) => {
        if (!rawVal || !rawVal.length) {
          return 'Unknown';
        }
        return rawVal.map(val => getThesauriItemLabel(thesauris, LOCAL_GEOGRAPHICAL_AREA, val));
      }
    },
    {
      title: 'Year',
      field: 'initial_date',
      getValue: (rawVal) => {
        return String(new Date(rawVal * 1000).getFullYear());
      }
    }
  ];
  return (
    <FilterHub data={ victims }
      onFilter={ onFilter }
      filters={ filters } />
  );
};

VictimMapFilters.propTypes = {
  victims: PropTypes.array,
  onFilter: PropTypes.func,
  thesauris: PropTypes.object,
  settings: PropTypes.object
};

const mapStateToProps = ({thesauris, settings}) => ({thesauris, settings});

export default connect(mapStateToProps)(VictimMapFilters);
