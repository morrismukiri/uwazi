import React, { Component } from 'react';
import Map from '../reactMapGl';
import StatusFilter from './statusFilter';
import YearFilter from './yearFilter';
import CityFilter from './cityFilter';
import { Set } from 'immutable';

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

    onFilter (filteredVictims) {
        filteredVictims = filteredVictims.length? 
            filteredVictims : this.state.filteredVictims;
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
                    <StatusFilter data={victims}
                    onFilter={this.onFilter} />
                    <CityFilter data={victims}
                    onFilter={this.onFilter} />
                    <YearFilter data={victims}
                    onFilter={this.onFilter} />
                </ul>
            </div>
        );
    }
}