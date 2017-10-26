import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getThesauriItemLabel, 
  formatDate, 
  formatCitiesAsString,
  formatOccupationsAsString,
  extractImageDataUrlFromMarkdown } from './helpers';

function VictimOverview ({victim, templates, thesauris, settings}) {
  const idConfig = settings.collection.get('custom').get('zorlakayIds');
  const data = victim.metadata;
  const name = victim.title;
  const age = data.age_at_the_time_of_victimization || 'Unknown';
  const status = getThesauriItemLabel(thesauris, idConfig.get('thesauriStatusAsVictim'), 
    data.status_of_the_victim_at_the_end_of_act);
  const occupation = formatOccupationsAsString(thesauris, data.local_term_for_occupation, idConfig);
  const location = formatCitiesAsString(thesauris, data.place_of_the_event, idConfig);
  const date = data.initial_date? formatDate(data.initial_date) : 'Unknown';
  const image = data.picture? extractImageDataUrlFromMarkdown(data.picture) :
    '/public/team-placeholder.jpg';
  
  return (
    <div className="video">
      <div className="victim-details">
        <div className="img">
          <img src={ image } />
        </div>
        <div>
          <h1>{ name }</h1>
          <p>Age { age }, { occupation }</p>
        </div>
        <div>
          <p>
            <i className="fa fa-circle"></i> <span>Status:</span> { status }
          </p>
          <p>
            <span>Lost location:</span> <a href="#"> <i className="fa fa-map-marker"></i> { location }</a>
          </p>
          <p>
            <span>Lost date:</span> { date }
          </p>
          <p>
            <span>Other people who lost together:</span><br />
            <a href="#"><i className="fa fa-user-o"></i> Abdurrahman İbin</a>, <a href="#"><i className="fa fa-user-o"></i> Celal Yanık</a>
          </p>
        </div>
        <div>
          <a href="#">
            <i className="fa fa-file-text-o"></i> View report
          </a>
          <a href="#">
            <i className="fa fa-file-video-o"></i> Testimonial
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps  = ({templates, thesauris, settings}) => ({templates, thesauris, settings});

export default connect(mapStateToProps)(VictimOverview);