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
            values,
            getValue
        };
        const source = this.props.data;
        const results = this.localSearch(source, currentFilters);

        this.setState({ currentFilters });
        this.props.onFilter(results);
    }

    filterData (data, field, values, getValue) {
        if (!values.length) return data;
        return data.filter(item => {
            let fieldValues = getValue(item.metadata[field]);
            fieldValues = Array.isArray(fieldValues)? fieldValues: [fieldValues];
            const res = fieldValues.find(val => values.includes(val));
            return res !== undefined;
        });
    }

    computeAggregations (data, field, getValue) {
        const otherFilters = Object.assign({}, this.state.currentFilters);
        delete otherFilters[field];
        const filteredData = this.localSearch(data, otherFilters);
        const counts = {};
        for(const item of filteredData) {
            let fieldValues = getValue(item.metadata[field]);
            fieldValues = Array.isArray(fieldValues)? fieldValues : [fieldValues];
            for (let value of fieldValues) {
                counts[value] = (counts[value] || 0) + 1;
            }
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
        const values = field in this.state.currentFilters?
            this.state.currentFilters[field].values : [];
        const options = this.computeAggregations(data, field, getValue);
        return (
            <MapFilter
                key={ field }
                { ...filter }
                onFilter={ this.onFilter.bind(this, filter) }
                values={ values }
                options={ options } />
        );
    }

    render () {
        const { filters, data } = this.props;
        const filterItems = filters.map(f => this.renderFilter(f, data));
        return (
            <ul className='filters'>
                { filterItems }
            </ul>
        );
    }
}