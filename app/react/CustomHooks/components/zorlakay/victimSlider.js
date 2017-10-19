import React, { Component } from 'react';
import VictimOverview from './victimOverview';
import Slider from './slider';

export default ({ victims }) => (
  <Slider visibleCount={ 5 } initialIndex={ 59 } title="Who is lost?">
    {victims.map(victim => (
        <VictimOverview key={ victim.sharedId } victim={ victim } />
    ))}
  </Slider>
)