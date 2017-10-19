import React from 'react';
import Testimonial from './testimonial';

export default ({ data }) => (
    <div className='videos'>
        {data.map(testimonial => (
            <Testimonial key={ testimonial.title } { ...testimonial } />
        ))}
    </div>
);