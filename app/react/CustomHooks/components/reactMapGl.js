import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Math.min(window.innerWidth - 45, 900),
      height: 400,
      popupInfo: null,
      customMarkers: [
        {latitude: 37.78, longitude: -122.41, label: 'Marker A', value: 8},
        {latitude: 37.88, longitude: -122.52, label: 'Marker B', value: 100}
      ]
    };
  }

  renderPopup() {
    const {popupInfo} = this.state;

    return this.state.popupInfo &&
      <Popup tipSize={6}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        <div>
          This is an Uwazi popup for {popupInfo.label}.<br />
          There were {popupInfo.value} casualties in this area.
        </div>
      </Popup>
    ;
  }

  onViewportChange(viewport) {
    const {latitude, longitude, zoom} = viewport;
    this.setState({latitude, longitude, zoom});
  }

  componentWillMount() {
    window.onresize = () => this.setState({
      width: Math.min(window.innerWidth - 45, 900),
      height: 400
    });

    this.setState({width: Math.min(window.innerWidth - 45, 900), height: 400, latitude: 37.7577, longitude: -122.4376, zoom: 8});
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    const {width, height, latitude, longitude, zoom} = this.state;

    return (
      <div style={{marginBottom: '15px'}}>
        <ReactMapGL
          width={width}
          height={height}
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          onViewportChange={this.onViewportChange.bind(this)}
          mapStyle="mapbox://styles/mapbox/light-v9"
        >
          <div style={{position: 'absolute', right: 5, top: 5}}>
            <NavigationControl onViewportChange={this.onViewportChange.bind(this)} />
          </div>
          {this.state.customMarkers.map((marker, index) =>
            <Marker {...marker} key={index} offsetLeft={-16.71} offsetTop={-24}>
              <i style={{fontSize: '26px', color: '#00f', opacity: 0.6, cursor: 'pointer'}}
                 className="fa fa-map-marker fa-fw"
                 onClick={() => this.setState({popupInfo: marker})}></i>
            </Marker>
          )}
          {this.renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}

export default connect()(Map);
