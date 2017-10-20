import React from 'react';

export default ({ name, video, description }) => (
    <div className="video">
        <div>
            <iframe src={ video }
                width="284" height="165" frameBorder="0" allowFullScreen></iframe>
            <h3>{ name }</h3>
            <p>{ description }</p>
        </div>
        <a className="btn-action" href="#">
            <i className="fa fa-file-text-o"></i> View report
        </a>
  </div>
)