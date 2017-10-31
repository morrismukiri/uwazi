import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VictimPieChart from './victimPieChart';

const StatusChart = ({data, idConfig}) => {
  const statusThesauri = idConfig.get('thesauriStatusAsVictim');
  return (
    <VictimPieChart data={data} field={'status_of_the_victim_at_the_end_of_act'}
    thesauriId={statusThesauri}/>
  );
};

StatusChart.propTypes = {
  data: PropTypes.object,
  idConfig: PropTypes.object
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(StatusChart);

