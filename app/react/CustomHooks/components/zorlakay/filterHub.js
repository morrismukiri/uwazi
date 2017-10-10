import React, { Component } from 'react';
import MapFilter from './mapFilter';

export default class FilterHub extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: {
                status: null,
                city: null,
                year: null
            },
            selectedFilters: {}
        };
    }

    onFilter (filter, values) {
        const { field, getValue } = filter;
        const currentFilters = Object.assign({}, this.state.selectedFilters);
        const thisFilter = currentFilters[field] || {};
        const { data } = thisFilter;
        currentFilters[field] = {
            data,
            values,
            getValue
        };
        const source = this.props.data;
        const results = this.localSearch(source, currentFilters);

        for (const f of this.props.filters) {
            currentFilters[f.field] = currentFilters[f.field] || {
                values: [],
                getValue: f.getValue
            };
            if (f.field !== field || !values.length) {
                currentFilters[f.field].data = results;
            }
        }
        this.setState({ selectedFilters: currentFilters });
        this.props.onFilter(results);
    }

    filterData (data, field, values, getValue) {
        if (!values.length) return data;
        return data.filter(item => {
            return values.includes(getValue(item.metadata[field]));
        });
    }

    localSearch (data, filters) {
        const filterFields = Object.keys(filters);
        const filtered = filterFields.reduce((thisData, field) => {
            const { getValue, values } = filters[field];
            return this.filterData(thisData, field, values, getValue)
        }, data);
        return filtered;
    }

    renderFilter (filter, data) {
        const { title, getValue, field } = filter;
        const filterData = field in this.state.selectedFilters?
            this.state.selectedFilters[field].data : data;
        return (
            <MapFilter
                key={ field }
                { ...filter }
                onFilter={ this.onFilter.bind(this, filter) }
                data={ filterData || data } />
        );
    }

    render () {
        const sourceData = this.props.data;
        const { filters } = this.props;
        const filterItems = filters.map(f => this.renderFilter(f, sourceData));
        return (
            <ul className='filters'>
                { filterItems }
            </ul>
        );
    }
}