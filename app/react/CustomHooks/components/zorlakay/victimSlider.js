import React, { Component } from 'react';
import VictimOverview from './victimOverview';
import Slider from './slider';

export default ({ victims }) => {
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