import React, { Component } from 'react';
import { Set } from 'immutable';
import { MultiSelect } from 'app/Forms';

export default class MapFilter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectValues: [],
        };
    }

    onFilterChanged (values) { 
        const { data, field, onFilter, getValue } = this.props;
        onFilter(values, field);
        this.setState({selectedValues: values});
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
        return  (
            <ul className='search__filter'>
                <li>{title}</li>
                <li className="wide">
                    <MultiSelect 
                        options={ optionsData }
                        optionLabel='label'
                        optionValue='value'
                        prefix={ field }
                        onChange={this.onFilterChanged.bind(this)}
                        value={this.state.selectedValues}/>
                </li>
            </ul>
        );
    }
}