import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {I18NLink} from 'app/I18N';
import '../scss/zorlakayHomepage.scss';

export class ZorlakayHeader extends Component {

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

  render() {
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
              <li>
                <I18NLink to={`/page/${this.props.idConfig.get('pageAbout')}`}>
                  <i className="fa fa-angle-right"></i> About the database
                </I18NLink>
              </li>
              <li>
                <I18NLink to={`/page/${this.props.idConfig.get('pageMethodology')}`}>
                  <i className="fa fa-angle-right"></i> Methodology
                </I18NLink>
              </li>
              <li>
                <I18NLink to={`/page/${this.props.idConfig.get('pageHowTo')}`}>
                  <i className="fa fa-angle-right"></i> How to navigate in the database
                </I18NLink>
              </li>
              <li>
                <I18NLink to={`/page/${this.props.idConfig.get('pageAction')}`}>
                  <i className="fa fa-angle-right"></i> Take Action
                </I18NLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ZorlakayHeader.propTypes = {
  idConfig: PropTypes.object,
  mapboxToken: PropTypes.string,
  mapLatitude: PropTypes.number,
  mapLongitude: PropTypes.number,
  mapZoom: PropTypes.number
};

const mapStateToProps = ({settings}) => ({
  idConfig: settings.collection.get('custom').get('zorlakayIds')
});

export default connect(mapStateToProps)(ZorlakayHeader);
