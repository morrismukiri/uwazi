import React from 'react';
import PropTypes from 'prop-types';
import {MultiSelect} from 'app/Forms';

const MapFilter = ({title, field, onFilter, values, options}) => (
  <ul className='search__filter'>
    <li>{title}</li>
    <li className="wide">
      <MultiSelect
        optionLabel='label'
        optionValue='value'
        prefix={ field }
        onChange={(changedValues) => onFilter(changedValues, field)}
        value={ values }
        options={ options }/>
    </li>
  </ul>
);

MapFilter.propTypes = {
  title: PropTypes.string,
  field: PropTypes.string,
  onFilter: PropTypes.func,
  values: PropTypes.array,
  options: PropTypes.object
};

export default MapFilter;
