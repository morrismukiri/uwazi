import React, { Component } from 'react';
import TestimonialSliderAdapter from './testimonialSliderAdapter';
import Slider from './slider';

export default (props) => {
    const testimonials = [
        {
            video: 'https://player.vimeo.com/video/68836138',
            name: 'İhsan Arslan (Şırnak-Cizre, 1993)',
            description: "1993 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme."
        },
        {
            video: 'https://player.vimeo.com/video/68836138',
            name: 'İhsan Arslan (Şırnak-Cizre, 1994)',
            description: "1994 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme."
        },
        {
            video: 'https://player.vimeo.com/video/68836138',
            name: 'İhsan Arslan (Şırnak-Cizre, 1995)',
            description: "1995 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme."
        },
        {
            video: 'https://player.vimeo.com/video/68836138',
            name: 'İhsan Arslan (Şırnak-Cizre, 1996)',
            description: "1996 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme."
        },
        {
            video: 'https://player.vimeo.com/video/68836138',
            name: 'İhsan Arslan (Şırnak-Cizre, 1997)',
            description: "1997 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme."
        }
    ];
    return (
    <Slider data={ testimonials } visibleCount={ 5 } initialIndex={ 0 } title="Testimonials">
        <TestimonialSliderAdapter />
    </Slider>
    );
}