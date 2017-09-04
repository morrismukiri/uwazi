import React from 'react';
import {getNumberOfVictimsOnTrial} from './helpers';

export default function ({victims, suspectsOnTrials, suspectsAcquitted, suspectsConvicted}) {
  return (
    <ul className="stats">
      <li><b>{victims.totalRows}</b> Victims in the database</li>
      <li><b>{getNumberOfVictimsOnTrial(victims)}</b> Victims on ongoing trials</li>
      <li><b>{suspectsOnTrials}</b> Suspects on trials</li>
      <li><b>{suspectsAcquitted}</b> Acquitted suspects</li>
      <li><b>{suspectsConvicted}</b> Convicted suspects</li>
    </ul>
  );
}