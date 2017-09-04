import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeStats from './zorlakay/homeStats';
import VictimSlider from './zorlakay/victimSlider';
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
      fetchVictims({limit: 10})
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
    console.log(victims.rows);
    return (
      <div className="zorlakay-homepage">
        <div className="hero-img">
          <img src="/public/hero-gradient.jpg" />
        </div>
        <div className="container">
          <h1>Zorla Kaybedilenler Veritabanı</h1>
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

          <h2>
            <span>Testimonials</span>
            <div>
              <i className="slider-btn fa fa-angle-left"></i>
              <i className="slider-btn fa fa-angle-right"></i>
            </div>
          </h2>
          <div className="videos">
            <div className="video">
              <div>
                <iframe src="https://player.vimeo.com/video/68836138"
                width="280" height="165" frameBorder="0" allowFullScreen></iframe>
                <h3>İhsan Arslan (Şırnak-Cizre, 1993)</h3>
                <p>1993 yılında Şırnak-Cizre'de zorla kaybedilen İhsan Arslan'ın eşi Şevkiye Arslan ile yapılan görüşme.</p>
              </div>  
              <a href="#">
                <i className="fa fa-file-text-o"></i> View report
              </a>
            </div>
            <div className="video">
              <div>
                <iframe src="https://player.vimeo.com/video/157129383"
                  width="280" height="165" frameBorder="0" allowFullScreen></iframe>
                <h3>Abdullah Duskun (Şırnak-Cizre, 1994)</h3>
                <p>1994 yılında Şırnak'ın Cizre ilçesinde kaybedilen Abdullah Düşkün ile ilgili Abdullah Düşkün'ün eşi Hediye Düşkün ile görüşme</p>
              </div>  
              <a href="#">
                <i className="fa fa-file-text-o"></i> View report
              </a>
            </div>
            <div className="video">
              <div>
                <iframe src="https://player.vimeo.com/video/161483268"
                  width="280" height="165" frameBorder="0" allowFullScreen></iframe>
                <h3>İsmail Ağaya (Batman, 1994)</h3>
                <p>1994 yılında Batman'da kaybedilen İsmail Ağaya'nın annesi Müfide Ağaya ile görüşme</p>
              </div>  
              <a href="#">
                <i className="fa fa-file-text-o"></i> View report
              </a>
            </div>
          </div>

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
          <div className="map">
            <img src="/public/zorlakay-map.png" />
            <div className="filters">
              <ul className="search__filter">
                <li>City</li>
                <li className="wide">
                  <ul className="multiselect is-active">
                    <li className="multiselectActions">
                      <div className="form-group">
                        <i className="fa fa-search"></i> <input type="text" className="form-control" placeholder="Search item" value="" />
                      </div>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">Adana</span>
                        <span className="multiselectItem-results">1</span>
                      </label>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">Ankara</span>
                        <span className="multiselectItem-results">8</span>
                      </label>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">Bingöl</span>
                        <span className="multiselectItem-results">3</span>
                      </label>
                    </li>

                  </ul>
                </li>
              </ul>

              <ul className="search__filter">
                <li>Year</li>
                <li className="wide">
                  <ul className="multiselect is-active">
                    <li className="multiselectActions">
                      <div className="form-group">
                        <i className="fa fa-search"></i> <input type="text" className="form-control" placeholder="Search item" value="" />
                      </div>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">1994</span>
                        <span className="multiselectItem-results">127</span>
                      </label>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">1995</span>
                        <span className="multiselectItem-results">64</span>
                      </label>
                    </li>

                    <li className="multiselectItem" title="Argentina">
                      <input type="checkbox" className="multiselectItem-input" value="gq5x91tl5vdndn29" id="paisesgq5x91tl5vdndn29" />
                      <label className="multiselectItem-label">
                        <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                        <span className="multiselectItem-name">1993</span>
                        <span className="multiselectItem-results">49</span>
                      </label>
                    </li>

                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer">
            <p>© Forced Lost Database 2017. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(zorlakayHomepage);
