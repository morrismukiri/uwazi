import React, {Component} from 'react';
import Map from '../reactMapGl';
import Filters from './victimMapFilters';

export default class VictimsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredVictims: null
    };
    this.onFilter = this.onFilter.bind(this);
  }

  getMarkers(victims) {
    return victims ? victims.map((v) => ({
      longitude: v.metadata.longitude,
      latitude: v.metadata.latitiude,
      label: v.title
    })) : [];
  }

  onFilter(filteredVictims) {
    this.setState({
      filteredVictims: filteredVictims
    });
  }

  render() {
    //console.log(this.props);
    const victims = [];
    const filteredVictims = this.state.filteredVictims || victims;
    const markers = this.getMarkers(filteredVictims);
    return (
      <div className='map'>
        <Map mapboxToken={this.props.mapboxToken}
          markers={markers}
          { ...this.props } />
        <Filters victims={victims}
          onFilter={ this.onFilter }/>
      </div>
    );
  }
}
