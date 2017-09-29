import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapGL, {NavigationControl, Marker, Popup} from 'react-map-gl';

function getWidth() {
  if (window) {
    return Math.min(window.innerWidth - 45, 900);
  }

  return 900;
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: getWidth(),
        height: 400
      },
      popupInfo: null,
      customMarkers: [
        // {latitude: 37.78, longitude: -122.41, label: 'Marker A', value: 8},
        // {latitude: 37.88, longitude: -122.52, label: 'Marker B', value: 100}
        {latitude: -1.28315, longitude: 36.81797, label:'Marker A', value: 8}
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
    this.setState({viewport});
  }

  componentWillMount() {
    window.onresize = () => {
      const viewport = Object.assign({}, this.state.viewport);
      viewport.width = getWidth();
      this.setState({viewport});
    };

    this.setState({
      viewport: {
        width: getWidth(),
        height: 400,
        latitude: -1.28315,
        longitude: 36.81797,
        zoom: 8
      }
    });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    return (
      <div style={{marginBottom: '15px'}}>
        <ReactMapGL
          {...this.state.viewport}
          dragRotate={true}
          onViewportChange={this.onViewportChange.bind(this)}
          mapStyle="http://localhost:8080/styles/klokantech-3d/style.json"
          // mapboxApiAccessToken={this.props.mapboxToken}
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
