import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {getNumberOfVictimsOnTrial} from './helpers';

const HomeStats = () => {
  const victims = 10;
  const victimsOnTrial = 20;
  const suspectsOnTrials = 30;
  const suspectsAcquitted = 40;
  const suspectsConvicted = 50;
  return (
    <div className="zorlakay-stats">
      <ul>
        <li><b>{victims}</b> Victims in the database</li>
        <li><b>{victimsOnTrial}</b> Victims on ongoing trials</li>
        <li><b>{suspectsOnTrials}</b> Suspects on trials</li>
        <li><b>{suspectsAcquitted}</b> Acquitted suspects</li>
        <li><b>{suspectsConvicted}</b> Convicted suspects</li>
      </ul>
      <p className="stats-description">Numbers and lists are not exhaustive, they represent the current <a href="#">Verified data</a>.</p>
    </div>
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
