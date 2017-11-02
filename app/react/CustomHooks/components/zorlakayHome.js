import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HomeStats from './zorlakay/homeStats';
import VictimSlider from './zorlakay/victimSlider';
import TestimonialSlider from './zorlakay/testimonialSlider';
import VictimsMap from './zorlakay/victimsMap';
import {fetchTemplateEntities} from './zorlakay/zorlakayAPI';
import {I18NLink} from 'app/I18N';
import '../scss/zorlakayHomepage.scss';

export class ZorlakayHomepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      victims: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      },
      testimonials: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      },
      legalProcesses: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      }
    };
  }

  getData() {
    const {idConfig} = this.props;
    Promise.all([
      fetchTemplateEntities(idConfig.get('templateVictim'), {limit: 300}),
      fetchTemplateEntities(idConfig.get('templateEvent'), {sort: 'metadata.video', limit: 20}),
      fetchTemplateEntities(idConfig.get('templateLegalProcess'), {limit: 10})
    ])
    .then(([victims, testimonials, legalProcesses]) => {
      this.setState({victims, testimonials, legalProcesses});
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {victims, testimonials, legalProcesses} = this.state;
    const {mapboxToken, mapLatitude, mapLongitude, mapZoom} = this.props;
    const victimsTemplate = this.props.idConfig.get('templateVictim');
    return (
      <div className="zorlakay-homepage">
        <div className="hero-img">
          <b>Zorla Kaybedilenler Veritabanı</b>
          <img src="/public/zorlakay-logo-light.png" />
        </div>
        <div className="container">
          <div className="introduction">
            <div>
              <p>Hakikat Adalet Hafıza Merkezi tarafından hazırlanan bu veritabanında 12 Eylül 1980 askeri
                darbesinden sonra Türkiye’de zorla kaybedilenlerin verilerinin toplanması amaçlanıyor.
                Bu veritabanında kaybedilenlerin kişisel bilgileri, kaybedilme tarihi ve yerleri, kaybedilme öyküleri,
                kayıp olayına ilişkin hukuki veriler ve suçun şüphelileri yer alıyor.</p>
              <p>Veritabanı, 12 Eylül 1980 askeri darbesinden sonra kaybedilenlerin tümünü henüz kapsamıyor.
                Amacımız zaman içinde bu çalışmanın tüm zorla kaybedilenlerin verilerini içerecek şekilde tamamlanması.</p>
            </div>
            <ul>
              <li> <i className="fa fa-angle-right"></i> About the database</li>
              <li> <i className="fa fa-angle-right"></i> Methodology</li>
              <li> <i className="fa fa-angle-right"></i> How to navigate in the database</li>
              <li> <i className="fa fa-angle-right"></i> Take Action</li>
            </ul>
          </div>
          {
            victims.rows.length ?
            <VictimSlider victims={victims.rows} /> : ''
          }

          <I18NLink to={`/library/?q=(order:asc,sort:title,types:!(%27${victimsTemplate}%27))`}
            className="btn btn-default btn-lg">
            <i className="fa fa-angle-right"></i> All {victims.totalRows} victims
          </I18NLink>

          <TestimonialSlider testimonials={testimonials.rows} />

          <a href="#" className="btn btn-default btn-lg">
            <i className="fa fa-angle-right"></i> All videos
          </a>

          <div>
            <HomeStats victims={victims}
              legalProcesses={legalProcesses}
              suspectsOnTrials={10}
              suspectsAcquitted={123}
              suspectsConvicted={343} />
            <p className="stats-description">Numbers and lists are not exhaustive, they represent the current <a href="#">Verified data</a>.</p>
          </div>
          <VictimsMap victims={victims.rows}
            mapboxToken={ mapboxToken }
            latitude={ mapLatitude }
            longitude={ mapLongitude }
            zoom={ mapZoom } />

        </div>
      </div>
    );
  }
}

ZorlakayHomepage.propTypes = {
  idConfig: PropTypes.object,
  mapboxToken: PropTypes.string,
  mapLatitude: PropTypes.number,
  mapLongitude: PropTypes.number,
  mapZoom: PropTypes.number
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(ZorlakayHomepage);
