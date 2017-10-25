import React from 'react';
import { connect } from 'react-redux';
import {getNumberOfVictimsOnTrial} from './helpers';

function HomeStats ({settings, victims, suspectsOnTrials, suspectsAcquitted, suspectsConvicted}) {
  const zorlakayIds = settings.collection.get('custom').get('zorlakayIds');
  return (
    <ul className="stats">
      <li><b>{victims.totalRows}</b> Victims in the database</li>
      <li><b>{getNumberOfVictimsOnTrial(victims, zorlakayIds)}</b> Victims on ongoing trials</li>
      <li><b>{suspectsOnTrials}</b> Suspects on trials</li>
      <li><b>{suspectsAcquitted}</b> Acquitted suspects</li>
      <li><b>{suspectsConvicted}</b> Convicted suspects</li>
    </ul>
  );
}

const mapStateToProps = ({ settings }) => ({ settings})

export default connect(mapStateToProps)(HomeStats);