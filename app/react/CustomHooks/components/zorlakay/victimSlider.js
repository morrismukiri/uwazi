import React, { Component } from 'react';
import VictimOverview from './victimOverview';

export default class VictimSlider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // initialize slider with a victim that has an image
      currentVictim: 59
    };
  }

  slide (dir) {
    let { currentVictim } = this.state;
    const { victims } = this.props;
    currentVictim = this.normalizeIndex(currentVictim + dir, victims.length);
    this.setState({ currentVictim });
  }

  normalizeIndex (index, length) {
    return index >= 0? index % length : length + index;
  }

  getVisibleIndices (centerIndex, visibleCount, totalLength) {
    const minIndex = - Math.floor(visibleCount/ 2);
    const rawIndices = [];
    for (let i = 0; i < visibleCount; ++i) {
      rawIndices.push(centerIndex + minIndex + i);
    }
    return rawIndices.map(i => this.normalizeIndex(i, totalLength));
  }

  renderVictims (victims, currentVictim) {
    if (!victims.length) return [];
    const visibleCount = 5;
    const visibleIndices = this.getVisibleIndices(currentVictim, visibleCount, victims.length);
    const visibleVictims = visibleIndices.map(i => victims[i]);
    return visibleVictims.map(victim => (
      <VictimOverview key={victim.sharedId} victim={victim} />
    ));
  }

  render () {
    const { victims } = this.props;
    const { currentVictim } = this.state;
    
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
        <div className='videos'>
        { this.renderVictims(victims, currentVictim) }
        </div>
      </div>
    );
  }

}