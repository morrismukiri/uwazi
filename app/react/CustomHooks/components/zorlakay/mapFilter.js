import React, { Component } from 'react';
import { Set } from 'immutable';
import { MultiSelect } from 'app/Forms';

export default class MapFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            values: Set()
        };
    }

    renderItem ({ key, label, value, count }, data, onFilter) {
        return (
            <li key={ key } className="multiselectItem" title="Argentina" onClick={() => this.onFilterAdded(value, data, onFilter)}>
                <input type="checkbox" className="multiselectItem-input" value={ value } id="paisesgq5x91tl5vdndn29" />
                <label className="multiselectItem-label">
                <i className="multiselectItem-icon fa fa-square-o"></i><i className="multiselectItem-icon fa fa-check"></i>
                <span className="multiselectItem-name">{ label }</span>
                <span className="multiselectItem-results">{ count }</span>
                </label>
            </li>
        )
    }

    onFilterAdded (value, data, onFilter) {
        const field = 'civil_status';
        const getValue = (rawVal, field, obj) => {
            return rawVal;
        };
        const values = this.state.values.add(value);
        const filteredData = this.filterData(data, values, field, getValue);
        this.setState(Object.assign(
            {},
            this.state,
            { values: values }
        ));
        onFilter(filteredData);
    }

    onFilterChanged (values) {
        
        const { data, field, onFilter, getValue } = this.props;
        console.log('data', data);
        const filteredData = this.filterData(data, values, field, getValue);
        console.log('values', values);
        onFilter(filteredData);
    }

    filterData (data, filterValues, field, getValue, undefinedVal) {
        return data.filter(item => {
            return filterValues.includes(getValue(item.metadata[field]));
        });
    }

    getFilterItems (data, field, getValue, undefinedVal = 'Unknown') {
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
            count: freqs[key],
            results: freqs[key]
        }));
    }

    getFilterOptionsData (data) {
        const { field, getValue, undefinedValue } = this.props;
        return this.getFilterItems(data, field, getValue, undefinedValue);
    }

    render () {
        const data = this.props.data || [];
        const { title, field, onFilter } = this.props;
        const optionsData = this.getFilterOptionsData (data);
        const items = optionsData.map(item => this.renderItem(item, data, onFilter));
        // return (
        //     <ul className='search__filter'>
        //         <li>{ title }</li>
        //         <li className="wide">
        //             <ul className="multiselect is-active">
        //                 <li className='multiselectActions'>
        //                     <div className="form-group">
        //                         <i className="fa fa-search"></i>
        //                         <input type="text" className="form-control" placeholder="Search item" value="" />
        //                     </div>
        //                 </li>
        //                 { items }
        //             </ul>
        //         </li>
        //     </ul>
        // );
        return  (
            <ul className='search__filter'>
                <li>{title}</li>
                <li className="wide">
                    <MultiSelect 
                        options={ optionsData }
                        optionLabel='label'
                        optionValue='value'
                        prefix={ field }
                        onChange={this.onFilterChanged.bind(this)}/>
                </li>
            </ul>
        );
    }
}