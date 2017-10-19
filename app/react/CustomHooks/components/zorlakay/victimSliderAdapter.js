import React, { Component } from 'react';
import VictimOverview from './victimOverview';

export default ({ data }) => (
    <div className='videos'>
        {data.map(victim => (
            <VictimOverview key={ victim.sharedId } victim={ victim } />
        ))}
    </div>
);