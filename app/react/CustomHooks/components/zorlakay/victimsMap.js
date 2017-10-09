import React, { Component } from 'react';
import Map from '../reactMapGl';
import CivilFilter from './civilFilter';

export default class VictimsMap extends Component {
    constructor (props) {
        super(props);
        this.state = {
            filteredVictims: null
        };
        this.onFilter = this.onFilter.bind(this);
    }

    getMarkers (victims) {
        return victims? victims.map((v) => ({
            longitude: v.metadata.longitude,
            latitude: v.metadata.latitiude,
            label: v.title
        })) : [];
    }

    onFilter (filteredVictims, values) {
        console.log('filtered', filteredVictims)
        this.setState({
            filteredVictims: filteredVictims
        });
    }

    render () {
        const victims = this.props.victims;
        const filteredVictims = this.state.filteredVictims || victims;
        const markers = this.getMarkers(filteredVictims);
        return (
            <div className='map'>
                <Map mapboxToken={this.props.mapboxToken}
                    markers={markers}
                    { ...this.props } />
                <ul className="filters">
                    <CivilFilter data={victims}
                    onFilter={this.onFilter} />
                </ul>
            </div>
        );
    }
}