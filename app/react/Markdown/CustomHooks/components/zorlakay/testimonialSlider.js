import React from 'react';
import PropTypes from 'prop-types';
import Testimonial from './testimonial';
import Slider from './slider';

const TestimonialSlider = (props) => {
  return (
  <Slider visibleCount={ 5 } initialIndex={ 0 } title="Testimonials">
      {props.testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
      ))}
  </Slider>
  );
};

TestimonialSlider.propTypes = {
  testimonials: PropTypes.array
};

export default TestimonialSlider;

