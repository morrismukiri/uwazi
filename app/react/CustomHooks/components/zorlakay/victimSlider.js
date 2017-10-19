import React, { Component } from 'react';
import VictimSliderAdapter from './victimSliderAdapter';
import Slider from './slider';

export default ({ victims }) => (
  <Slider data={ victims } visibleCount={ 5 } initialIndex={ 59 } title="Who is lost?">
    <VictimSliderAdapter />
  </Slider>
)