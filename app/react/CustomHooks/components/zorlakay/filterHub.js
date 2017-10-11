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
            currentFilters: {}
        };
    }

    onFilter (filter, values) {
        const { field, getValue } = filter;
        const currentFilters = Object.assign({}, this.state.currentFilters);
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
        }
        this.setState({ currentFilters });
        this.props.onFilter(results);
    }

    filterData (data, field, values, getValue) {
        if (!values.length) return data;
        return data.filter(item => {
            return values.includes(getValue(item.metadata[field]));
        });
    }

    computeAggregations (data, field, getValue) {
        const otherFilters = Object.assign({}, this.state.currentFilters);
        delete otherFilters[field];
        const filteredData = this.localSearch(data, otherFilters);
        const counts = {};
        for(const item of filteredData) {
            const value = getValue(item.metadata[field]);
            counts[value] = (counts[value] || 0) + 1;
        }
        const options = Object.keys(counts).map((key) => {
            return {
                key: key,
                value: key,
                label: key,
                results: counts[key]
            }
        });
        return options;
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
        const filterData = field in this.state.currentFilters?
            this.state.currentFilters[field].data : data;
        const values = field in this.state.currentFilters?
            this.state.currentFilters[field].values : []
        const options = this.computeAggregations(data, field, getValue);
        return (
            <MapFilter
                key={ field }
                { ...filter }
                onFilter={ this.onFilter.bind(this, filter) }
                data={ filterData || data }
                values={ values }
                options={ options } />
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