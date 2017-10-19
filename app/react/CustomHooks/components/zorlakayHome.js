import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeStats from './zorlakay/homeStats';
import VictimSlider from './zorlakay/victimSlider';
import TestimonialSlider from './zorlakay/testimonialSlider';
import VictimsMap from './zorlakay/victimsMap';
import {fetchVictims} from './zorlakay/zorlakayAPI';
import '../scss/zorlakayHomepage.scss';

export class zorlakayHomepage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      victims: {
        aggregations: {
          all: {}
        },
        totalRows: 0,
        rows: []
      }
    };
  }

  getData () {
    Promise.all([
      fetchVictims({limit: 300})
    ])
    .then(([victims]) => {
      this.setState({victims});
    })
  }

  componentDidMount () {
    this.getData();
  }

  render() {
    const victims = this.state.victims;
    const { mapboxToken, mapLatitude, mapLongitude, mapZoom } = this.props;
    console.log(victims.rows);
    console.log('res', victims);
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

          <VictimSlider victims={victims.rows} />

          <a href="#" className="btn btn-default btn-lg">
            <i className="fa fa-angle-right"></i> All {victims.totalRows} victims
          </a>

          <TestimonialSlider />

          <a href="#" className="btn btn-default btn-lg">
            <i className="fa fa-angle-right"></i> All videos
          </a>

          <div>
            <HomeStats victims={victims}
              suspectsOnTrials={10}
              suspectsAcquitted={123}
              suspectsConvicted={343} />
            <p className="stats-description">Numbers and lists are not exhaustive, they represent the current <a href="#">Verified data</a>.</p>
          </div>
          {/* <div className="map"> */}
            <VictimsMap victims={victims.rows}
              mapboxToken={ mapboxToken }
              latitude={ mapLatitude }
              longitude={ mapLongitude }
              zoom={ mapZoom } />
            
          {/* </div> */}

        </div>
      </div>
    );
  }
}

export default connect()(zorlakayHomepage);
