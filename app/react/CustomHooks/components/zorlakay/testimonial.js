import React from 'react';
import PropTypes from 'prop-types';
import {I18NLink} from 'app/I18N';
import marked from 'app/utils/marked';

const Testimonial = ({sharedId, title, metadata}) => (
  <div className="video">
    <div>
      <div className="markdownViewer" dangerouslySetInnerHTML={{__html: marked(metadata.video)}}/>
      <h3>{title}</h3>
      <p>{metadata.event_description.substring(1, 100)}...</p>
    </div>
    <I18NLink to={`/entity/${sharedId}`} className="btn-action" href="#">
      <i className="fa fa-file-text-o"></i> View report
    </I18NLink>
  </div>
);

Testimonial.propTypes = {
  title: PropTypes.string,
  sharedId: PropTypes.string,
  metadata: PropTypes.object
};

export default Testimonial;

