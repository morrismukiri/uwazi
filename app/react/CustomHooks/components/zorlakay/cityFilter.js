import React, { Component } from 'react';

export default class CityFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    renderItem ({ key, label, value, count }) {
        return (
            <li key={ key } className="multiselectItem" title="Argentina">
                <input type="checkbox" className="multiselectItem-input" value={ value } id="paisesgq5x91tl5vdndn29" />
                <label className="multiselectItem-label">
                <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                <span className="multiselectItem-name">{ label }</span>
                <span className="multiselectItem-results">{ count }</span>
                </label>
            </li>
        )
    }

    getFilterItems (data, field, getValue, undefinedVal) {
        const freqs = {};
        for (let item of data) {
            const raw = item.metadata[field];
            const value = (typeof raw === 'undefined' && undefinedVal) ?
                undefinedVal : getValue(raw, field, item);
            freqs[value] = (freqs[value] || 0) + 1;
        }
        return Object.keys(freqs).map(key => ({
            key: key,
            value: key,
            label: key,
            count: freqs[key]
        }));
    }

    getYearFilterData (data) {
        const field = 'initial_date';
        const getValue = (rawVal, field, obj) => (new Date(rawVal)).getFullYear();
        return this.getFilterItems(data, field, getValue, 'Unknown');
    }

    getFilterMaritalStatusData (data) {
        const field = 'civil_status';
        const getValue = (rawVal, field, obj) => {
            return rawVal;
        };
        return this.getFilterItems(data, field, getValue, 'Unknown');
    }

    render () {
        const itemsData = this.getFilterMaritalStatusData(this.props.victims);
        const items = itemsData.map(this.renderItem);
        return (
            <ul className='search__filter'>
                <li>City</li>
                <li className="wide">
                    <ul className="multiselect is-active">
                        <li className='multiselectActions'>
                            <div className="form-group">
                                <i className="fa fa-search"></i>
                                <input type="text" className="form-control" placeholder="Search item" value="" />
                            </div>
                        </li>
                        { items }
                    </ul>
                </li>
            </ul>
        );
    }
}