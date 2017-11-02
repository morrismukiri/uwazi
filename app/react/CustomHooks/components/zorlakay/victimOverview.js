import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getThesauriItemLabel, 
  formatDate,
  formatCitiesAsString,
  formatOccupationsAsString,
  extractImageDataUrlFromMarkdown} from './helpers';
import {fetchRelatedVictims} from './zorlakayAPI';

class VictimOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedVictims: []
    };

    const {victim, idConfig} = this.props;
    fetchRelatedVictims(victim.sharedId, idConfig.get('relationRelatedEvent'))
    .then(relatedVictims => {
      this.setState({relatedVictims});
    });
  }

  renderRelatedVictims(victims) {
    if (!victims.length) {
      return <p/>;
    }

    return (
      <p>
        <span>Other people who lost together:</span><br />
        {victims.map((v, i) => (
          <span key={v.sharedId}>
            <a href="#"><i className="fa fa-user-o"></i> {v.title}</a>
            {i < victims.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
    );
  }

  render() {
    const {victim, thesauris, idConfig} = this.props;
    const data = victim.metadata;
    const name = victim.title;
    const age = data.age_at_the_time_of_victimization || 'Unknown';
    const status = getThesauriItemLabel(thesauris, idConfig.get('thesauriStatusAsVictim'), 
      data.status_of_the_victim_at_the_end_of_act);
    const occupation = formatOccupationsAsString(thesauris, data.local_term_for_occupation, idConfig);
    const location = formatCitiesAsString(thesauris, data.place_of_the_event, idConfig);
    const date = data.initial_date ? formatDate(data.initial_date) : 'Unknown';
    const image = data.picture ? extractImageDataUrlFromMarkdown(data.picture) :
      '/public/team-placeholder.jpg';
    const {relatedVictims} = this.state;

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
            { this.renderRelatedVictims(relatedVictims)}
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
}

VictimOverview.propTypes = {
  thesauris: PropTypes.object,
  idConfig: PropTypes.object,
  victim: PropTypes.object
};

const mapStateToProps = ({templates, thesauris, settings}) => ({
  templates,
  thesauris,
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(VictimOverview);
