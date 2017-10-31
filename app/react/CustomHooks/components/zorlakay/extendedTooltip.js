import React from 'react';
import PropTypes from 'prop-types';

const ExtendedTooltip = (props) => {
  if (props.active) {
    return (
      <div style={{backgroundColor: '#fff', border: '1px solid #ccc'}}>
        <div style={{backgroundColor: '#eee', borderBottom: '1px dashed #ccc', padding: '5px'}}>
          {props.payload[0].payload.name}&nbsp;&nbsp;
        </div>
        <div style={{padding: '5px'}}>
          {'Victims'}:&nbsp;&nbsp;<b style={{color: '#600'}}>{props.payload[0].value}</b><br />
        </div>
      </div>
    );
  }
  return null;
};

ExtendedTooltip.propTypes = {
  payload: PropTypes.array,
  active: PropTypes.bool,
  chartLabel: PropTypes.string
};

export default ExtendedTooltip;

