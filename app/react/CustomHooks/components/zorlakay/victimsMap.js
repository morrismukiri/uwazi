import React, { Component } from 'react';
import Map from '../reactMapGl';

export default class VictimsMap extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    getMarkers () {
        return this.props.victims.map((v) => ({
            longitude: v.metadata.longitude,
            latitude: v.metadata.latitiude,
            label: v.title
        }))
    }

    render () {
        const { victims } = this.props;
        const markers = this.getMarkers();
        return (
            <div className='map'>
                <Map mapboxToken={this.props.mapboxToken}
                    markers={markers}
                    { ...this.props } />
            </div>
        );
    }
}