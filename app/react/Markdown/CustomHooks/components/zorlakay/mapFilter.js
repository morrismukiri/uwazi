import React, { Component } from 'react';
import { MultiSelect } from 'app/Forms';

export default ({title, field, onFilter, values, options}) =>  (
    <ul className='search__filter'>
        <li>{title}</li>
        <li className="wide">
            <MultiSelect 
                optionLabel='label'
                optionValue='value'
                prefix={ field }
                onChange={(values) => onFilter(values, field)}
                value={ values }
                options={ options }/>
        </li>
    </ul>
);
