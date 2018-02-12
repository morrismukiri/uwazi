import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Map from '../reactMapGl';
import Filters from './victimMapFilters';
import {fetchTemplateEntities} from './zorlakayAPI';

export class VictimsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredVictims: null,
      victims: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      }
    };
    this.onFilter = this.onFilter.bind(this);
  }

  getMarkers(victims) {
    if (!victims) {
      return [];
    }
    const clusters = {};

    victims.forEach((v) => {
      if (!clusters[v.metadata.longitude + '' + v.metadata.latitiude]) {
        clusters[v.metadata.longitude + '' + v.metadata.latitiude] = {
          latitude: v.metadata.latitiude,
          longitude: v.metadata.longitude,
          size: 1
        };
        return;
      }

      clusters[v.metadata.longitude + '' + v.metadata.latitiude].size += 1;
    });

    return Object.keys(clusters).map((k) => clusters[k]);
  }

  onFilter(filteredVictims) {
    this.setState({
      filteredVictims: filteredVictims
    });
  }

  getData() {
    const {idConfig} = this.props;
    fetchTemplateEntities(idConfig.get('templateVictim'), {limit: 300})
    .then((victims) => {
      this.setState({victims});
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const victims = this.state.victims.rows;
    const filteredVictims = this.state.filteredVictims || victims;
    const markers = this.getMarkers(filteredVictims);
    return (
      <div className='zorlakay-map'>
        <Map mapboxToken={this.props.mapboxToken}
          markers={markers}
          {...this.props} />
        <Filters victims={victims}
          onFilter={this.onFilter}/>
      </div>
    );
  }
}

VictimsMap.propTypes = {
  idConfig: PropTypes.object,
  thesauris: PropTypes.object,
  mapboxToken: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number
};

const mapStateToProps = ({settings, thesauris}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds'),
  thesauris
});

export default connect(mapStateToProps)(VictimsMap);
