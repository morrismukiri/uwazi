import React, { Component } from 'react';
import VictimOverview from './victimOverview';

export default class VictimSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentVictim: 0
    };
  }

  slide (dir) {
    let { currentVictim } = this.state;
    const { victims } = this.props;
    // the slider cycles
    currentVictim = currentVictim >= 0?
      (currentVictim + dir) %  victims.length : victims.length - 1;
    this.setState({ currentVictim });
  }

  render () {
    const { victims } = this.props;
    const { currentVictim } = this.state;
    const victim = victims.length? victims[currentVictim] : null;
    return (
      <div>
        <h2>
        <span>Who is lost?</span>
          <div>
            <i className="slider-btn fa fa-angle-left" 
              onClick={() => this.slide(-1)}></i>
            <i className="slider-btn fa fa-angle-right" 
              onClick={() => this.slide(1)}></i>
          </div>
        </h2>
        {victim?
          (<VictimOverview victim={victim} />) : '' }
      </div>
    );
  }

}