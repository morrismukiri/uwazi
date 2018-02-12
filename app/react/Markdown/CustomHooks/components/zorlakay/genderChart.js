import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VictimPieChart from './victimPieChart';

const GenderChart = ({data, idConfig}) => {
  const sexThesauri = idConfig.get('thesauriSex');
  return (
    <VictimPieChart data={data} field={'sex'}
    thesauriId={sexThesauri}/>
  );
};

GenderChart.propTypes = {
  data: PropTypes.object,
  idConfig: PropTypes.object
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(GenderChart);

