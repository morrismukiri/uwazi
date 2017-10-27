import React from 'react';
import marked from 'app/utils/marked';

export default ({title, metadata}) => (
  <div className="video">
    <div>
      <div className="markdownViewer" dangerouslySetInnerHTML={{__html: marked(metadata.video)}}/>
      <h3>{title}</h3>
      <p>{metadata.event_description.substring(1, 100)}...</p>
    </div>
    <a className="btn-action" href="#">
      <i className="fa fa-file-text-o"></i> View report
    </a>
  </div>
);
