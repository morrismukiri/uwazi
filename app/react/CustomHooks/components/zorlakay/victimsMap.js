import React, { Component } from 'react';
import Map from '../reactMapGl';
import CityFilter from './cityFilter';

export default class VictimsMap extends Component {
    constructor (props) {
        super(props);
        this.state = {
            victims: null
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

    onFilter (filteredVictims) {
        console.log('filtered', filteredVictims)
        this.setState({
            victims: filteredVictims
        });
    }

    render () {
        const victims = this.state.victims || this.props.victims;
        const markers = this.getMarkers(victims);
        return (
            <div className='map'>
                <Map mapboxToken={this.props.mapboxToken}
                    markers={markers}
                    { ...this.props } />
                <ul className="filters">
                    <CityFilter data={victims} onFilter={this.onFilter}/>
                </ul>
            </div>
        );
    }
}