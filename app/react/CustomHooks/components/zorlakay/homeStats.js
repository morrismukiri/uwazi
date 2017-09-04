import React from 'react';

export default function ({totalVictims, victimsOnTrials, suspectsOnTrials, suspectsAcquitted, suspectsConvicted}) {
  return (
    <ul className="stats">
      <li><b>{totalVictims}</b> Victims in the database</li>
      <li><b>{victimsOnTrials}</b> Victims on ongoing trials</li>
      <li><b>{suspectsOnTrials}</b> Suspects on trials</li>
      <li><b>{suspectsAcquitted}</b> Acquitted suspects</li>
      <li><b>{suspectsConvicted}</b> Convicted suspects</li>
    </ul>
  );
}