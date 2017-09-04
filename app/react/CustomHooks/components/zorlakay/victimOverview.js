import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getThesauriItemLabel, formatDate} from './helpers';
import {
  STATUS_AS_VICTIM,
  LOCAL_TERM_FOR_OCCUPATION,
  LOCAL_GEOGRAPHICAL_AREA
} from './constants';

function VictimOverview ({victim, templates, thesauris}) {
  console.log('v', victim);
  const data = victim.metadata;
  const age = data.age_at_time_of_victimization || 'Unknown';
  const status = getThesauriItemLabel(thesauris, STATUS_AS_VICTIM, 
    data.status_of_the_victim_at_the_end_of_act);
  const occupation = data.local_term_for_occupation.length?
    getThesauriItemLabel(thesauris, LOCAL_TERM_FOR_OCCUPATION, 
      data.local_term_for_occupation[0]) : 'Unknown';
  const location = data.place_of_the_event.length?
    getThesauriItemLabel(thesauris, LOCAL_GEOGRAPHICAL_AREA,
      data.place_of_the_event[0]) : 'Unknown';
  const date = data.initial_date? formatDate(date) : 'Unknown';

  return (
    <div className="victim">
      <div className="victim-details">
        <div>
          <h1>{ data.person_name }</h1>
          <p>Age { age }, { occupation }</p>
        </div>
      </div>
      <div className="event-details">
        <div>
          <p>
            <i className="fa fa-circle"></i> <span>Status:</span> {status}
          </p>
          <p>
            <span>Lost location:</span> <a href="#"> <i className="fa fa-map-marker"></i> { location }</a>
          </p>
          <p>
            <span>Lost date:</span> 1994-05-28
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

const mapStateToProps  = ({templates, thesauris}) => ({templates, thesauris});

export default connect(mapStateToProps)(VictimOverview);