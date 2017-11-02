import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getNumberOfVictimsOnTrial} from './helpers';

const HomeStats = ({idConfig, victims, legalProcesses, suspectsOnTrials, suspectsAcquitted, suspectsConvicted}) => {
  return (
    <ul className="stats">
      <li><b>{victims.totalRows}</b> Victims in the database</li>
      <li><b>{getNumberOfVictimsOnTrial(legalProcesses, idConfig)}</b> Victims on ongoing trials</li>
      <li><b>{suspectsOnTrials}</b> Suspects on trials</li>
      <li><b>{suspectsAcquitted}</b> Acquitted suspects</li>
      <li><b>{suspectsConvicted}</b> Convicted suspects</li>
    </ul>
  );
};

HomeStats.propTypes = {
  idConfig: PropTypes.object,
  victims: PropTypes.object,
  legalProcesses: PropTypes.object,
  suspectsOnTrials: PropTypes.number,
  suspectsAcquitted: PropTypes.number,
  suspectsConvicted: PropTypes.number
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(HomeStats);
