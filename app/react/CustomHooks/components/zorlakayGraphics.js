import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchTemplateEntities} from './zorlakay/zorlakayAPI';
import BarChart from './zorlakay/victimBarChart';

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
      <BarChart data={data}/>
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
