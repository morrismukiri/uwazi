import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchTemplateEntities} from './zorlakay/zorlakayAPI';
import CitiesChart from './zorlakay/victimBarChart';
import StatusChart from './zorlakay/victimPieChart';

class ZorlakayGraphics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      victims: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      }
    };
  }

  getData() {
    const {idConfig} = this.props;
    Promise.all([
      fetchTemplateEntities(idConfig.get('templateVictim'), {limit: 300})
    ])
    .then(([victims]) => {
      this.setState({victims});
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const data = this.state.victims;
    return (
      <div>
        <h2>Place of the event</h2>
        <CitiesChart data={data}/>
        <h2>Status of the victim</h2>
        <StatusChart data={data} />
      </div>
    );
  }
}

ZorlakayGraphics.propTypes = {
  idConfig: PropTypes.object
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(ZorlakayGraphics);
