import React from 'react';
import PropTypes from 'prop-types';
import VictimOverview from './victimOverview';
import Slider from './slider';

const VictimSlider = ({victims}) => {
  // find a victim with a picture
  const initialIndex = victims.findIndex(v => v.metadata.picture);
  return (
    <Slider visibleCount={ 5 } initialIndex={ initialIndex } title="Who is lost?">
      {victims.map(victim => (
          <VictimOverview key={ victim.sharedId } victim={ victim } />
      ))}
    </Slider>
  );
}

VictimSlider.propTypes = {
  victims: PropTypes.array
};

export default VictimSlider;
