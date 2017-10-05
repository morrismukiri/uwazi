import React from 'react';

export default () => (
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
)