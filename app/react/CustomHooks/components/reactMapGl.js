import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';

function getWidth() {
  return 900 - 265;
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: getWidth(),
        height: 530
      },
      popupInfo: null,
      customMarkers: [
        {latitude: -1.28315, longitude: 36.81797, label: 'Marker A', value: 8}
      ]
    };
  }

  renderPopup() {
    const {popupInfo} = this.state;

    return this.state.popupInfo &&
      <Popup tipSize={6}
        anchor="bottom"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        <div>
          {popupInfo.size}
        </div>
      </Popup>
    ;
  }

  onViewportChange(viewport) {
    this.setState({viewport});
  }

  componentWillMount() {
    window.onresize = () => {
      const viewport = Object.assign({}, this.state.viewport);
      viewport.width = getWidth();
      this.setState({viewport});
    };
    const defaultViewport = {
      width: getWidth(),
      height: 530,
      latitude: 35,
      longitude: 39,
      zoom: 8,
      //maxBounds: [
        //[22, 30], // Southwest coordinates
        //[48, 46]  // Northeast coordinates
      //]
    };

    const {latitude, longitude, zoom} = this.props;
    const viewport = Object.assign({}, defaultViewport, {latitude, longitude, zoom});
    this.setState({viewport});
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  markerClassName(marker) {
    if (marker.size > 20) {
      return 'marker-high';
    }

    if (marker.size > 10) {
      return 'marker-medium';
    }

    return 'marker-low';
  }

  render() {
    const viewport = Object.assign({}, this.state.viewport);
    const markers = this.props.markers || this.state.customMarkers;
    return (
      <div>
        <ReactMapGL
          {...viewport}
          dragRotate={true}
          onViewportChange={this.onViewportChange.bind(this)}
          mapStyle="mapbox://styles/mapbox/bright-v9"
          mapboxApiAccessToken={this.props.mapboxToken}
        >
          <div style={{position: 'absolute', left: 5, top: 5}}>
            <NavigationControl onViewportChange={this.onViewportChange.bind(this)} />
          </div>
          {markers.map((marker, index) =>
            <Marker {...marker} key={index} offsetLeft={0} offsetTop={0}>
              <i className={'map-marker ' + this.markerClassName(marker) + ' marker-' + marker.size}
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
