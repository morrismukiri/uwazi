import React, {Component} from 'react';

const requiredComponents = ['Map', 'TileLayer', 'Marker', 'Popup'];
let Leaflet;

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.7577,
      lng: -122.4376,
      zoom: 10,
      customMarkers: [
        {latitude: 37.78, longitude: -122.41, label: 'Marker A', value: 8},
        {latitude: 37.88, longitude: -122.52, label: 'Marker B', value: 100}
      ]
    };
  }

  componentDidMount() {
    Leaflet = {};

    requiredComponents.forEach(component => {
      Leaflet[component] = require('react-leaflet')[component];
    });

    this.forceUpdate();
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    // Regular free open street map:
    const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

    // Optional mapbox url with leaflet access token (may get revoked)
    // const attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    //                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //                     'Imagery © <a href="http://mapbox.com">Mapbox</a>';
    // const url = 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' +
    //             'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    return Leaflet && Leaflet.Map ?
      <div style={{marginBottom: 15}}>
        <Leaflet.Map center={position} zoom={this.state.zoom}>
          <Leaflet.TileLayer attribution={attribution} url={url} />
          {this.state.customMarkers.map((marker, index) => {
            return (
              <Leaflet.Marker position={[marker.latitude, marker.longitude]} key={index}>
                <Leaflet.Popup>
                  <span>
                    An Uwazi popup for {marker.label}. <br /> There were {marker.value} casualties.
                  </span>
                </Leaflet.Popup>
              </Leaflet.Marker>
            );
          })}
        </Leaflet.Map>
      </div>
    : null;
  }
}
