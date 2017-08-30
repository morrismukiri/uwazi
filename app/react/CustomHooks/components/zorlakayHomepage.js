import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../scss/zorlakayHomepage.scss';

export class zorlakayHomepage extends Component {

  render() {
    return (
      <div className="zorlakay-homepage">
        <div className="introduction">
          <div>
            <p>
              First  couple of sentences of the About The Database page.
              Continue reading option at the end.
              Font - bigger than rest of the texts on page,
              example: https://yvng.yadvashem.org)
            </p>
          </div>
          <ul>
            <li> <i className="fa fa-arrow-right"></i> About the database</li>
            <li> <i className="fa fa-arrow-right"></i> Methodology</li>
            <li> <i className="fa fa-arrow-right"></i> How to navigate in the database</li>
            <li> <i className="fa fa-arrow-right"></i> Take Action</li>
          </ul>
        </div>
        <div className="row">
          <div className="victim col-sm-8">
            <img src="/public/placeholder.png" />
            <dl>
              <dt>Name and Surname:</dt>
              <dd>PERSON 0903</dd>
              <dt>Place of the event:</dt>
              <dd>ACT 2104-MT63</dd>
              <dt>Date of the event:</dt>
              <dd>EVENT 0113</dd>
              <dt>Situation at the end of act:</dt>
              <dd>ACT 2123-MT25</dd>
            </dl>
            <dl>
              <dt>Age at the time of act:</dt>
              <dd>ACT 2118</dd>
              <dt>Occupation:</dt>
              <dd>PERSON 0923-MT64</dd>
              <dt>Marital Status:</dt>
              <dd>PERSON 0918-MT8</dd>
              <dt>Dependants:</dt>
              <dd>PERSON 0919</dd>
            </dl>
          </div>
          <div className="col-sm-4s">
            <img src="/public/zorlakay-video.png" />
          </div>
        </div>
        <div>
          Click below tabs to see the lists or got to <b>Victims page</b> to search for a person or to see all victim stories.
          Numbers and lists are not exhaustive, they represent the current <b>Verified</b> data.
          (When Victims Page is clicked, it opens in new tab.
          When the user clicks Verified, About the Database page opens in new tab)
        </div>
        <div>
          <ul className="stats">
            <li><b>XXX</b> Victims in the database</li>
            <li><b>XXX</b> Victims on ongoing trials</li>
            <li><b>XXX</b> Suspects on trials</li>
            <li><b>XXX</b> Acquitted suspects</li>
            <li><b>XXX</b> Convicted perpetrators</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <img src="/public/zorlakay-map.png" />
          </div>
          <div className="col-sm-3">
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
    );
  }
}

export default connect()(zorlakayHomepage);
