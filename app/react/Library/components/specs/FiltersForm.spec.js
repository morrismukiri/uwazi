import React from 'react';
import { shallow } from 'enzyme';
import { fromJS as Immutable } from 'immutable';
import { Form } from 'react-redux-form';

import { FiltersForm, mapStateToProps } from 'app/Library/components/FiltersForm';

describe('FiltersForm', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      searchDocuments: jasmine.createSpy('searchDocuments'),
      fields: Immutable([{ _id: '1', name: 'name', author: { initialValue: 'Philip K. Dick' } }]),
      documentTypes: Immutable({}),
      templates: Immutable([]),
      aggregations: Immutable({}),
      search: { searchTerm: 'Batman' },
      storeKey: 'library'
    };
    component = shallow(<FiltersForm {...props}/>);
  });

  describe('form on submit', () => {
    it('should call searchDocuments, with the searchTerm', () => {
      component.find(Form).simulate('submit', { myfilter: true });
      expect(props.searchDocuments).toHaveBeenCalledWith({ search: { myfilter: true } }, 'library');
    });
  });

  describe('maped state', () => {
    it('should contain the fields', () => {
      const store = {
        library: {
          ui: Immutable({ searchTerm: 'do a barrel roll' }),
          filters: Immutable({ properties: [{ name: 'author' }], documentTypes: { a: true } })
        },
        form: {
          filters: 'filtersForm'
        },
        templates: Immutable([]),
        settings: { collection: Immutable({}) }
      };
      const state = mapStateToProps(store, { storeKey: 'library' });
      expect(state.fields.toJS()).toEqual([{ name: 'author' }]);
      expect(state.documentTypes.toJS()).toEqual({ a: true });
    });
  });
});
