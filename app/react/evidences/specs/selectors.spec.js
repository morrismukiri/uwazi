import Immutable from 'immutable';

import {selectors} from '..';
import {evidences, docEvidences} from '../selectors';

describe('Evidences selectors', () => {
  let state;
  beforeEach(() => {
    state = {
      templates: Immutable.fromJS([
        {properties: [{_id: 'id1', label: 'property1'}, {_id: 'id2', label: 'property2'}]},
        {properties: [{_id: 'id3', label: 'property3'}, {_id: 'id4', label: 'property4'}]}
      ]),
      thesauris: Immutable.fromJS([
        {values: [{id: 'id1', label: 'value1'}, {id: 'id2', label: 'value2'}]},
        {values: [{id: 'id3', label: 'value3'}, {id: 'id4', label: 'value4'}]}
      ]),
      evidences: {
        evidences: Immutable.fromJS([
          {property: 'id3', value: 'id2'},
          {property: 'id1', value: 'id4'}
        ]),
        evidencesUI: Immutable.fromJS({totalRows: 3})
      }
    };
  });

  describe('evidencesSelectors', () => {
    describe('get', () => {
      it('should return evidences with added property and value labels', () => {
        const result = evidences.get(state);
        expect(result.toJS()).toEqual([
          {property: 'id3', value: 'id2', propertyLabel: 'property3', valueLabel: 'value2'},
          {property: 'id1', value: 'id4', propertyLabel: 'property1', valueLabel: 'value4'}
        ]);
      });
    });

    describe('totalRows', () => {
      it('should return totalRows', () => {
        const result = evidences.totalRows(state);
        expect(result).toBe(3);
      });
    });

    describe('count', () => {
      it('should return evidences with added property and value labels', () => {
        const result = evidences.count(state);
        expect(result).toBe(2);
      });
    });
  });

  describe('docEvidencesSelectors', () => {
    describe('getEvidences', () => {
      it('should get Evidences from docEvidences', () => {
        state.evidences.docEvidences = Immutable.fromJS([
          {property: 'id3', value: 'id2'},
          {property: 'id1', value: 'id4'},
          {property: 'id3', value: 'id2'}
        ]);

        expect(docEvidences.get(state).toJS()).toEqual([
          {property: 'id3', value: 'id2', propertyLabel: 'property3', valueLabel: 'value2'},
          {property: 'id1', value: 'id4', propertyLabel: 'property1', valueLabel: 'value4'},
          {property: 'id3', value: 'id2', propertyLabel: 'property3', valueLabel: 'value2'}
        ]);
      });
    });
  });

  describe('getFilters', () => {
    fit('should return all filter posibilities based on templates and thesauris', () => {
      state = {
        templates: Immutable.fromJS([
          {properties: [{_id: 'property1', label: 'propertyLabel1', content: 'thesauri1'}, {_id: 'property2', label: 'propertyLabel2'}]},
          {properties: [
            {_id: 'property3', label: 'propertyLabel3', content: 'thesauri2'},
            {_id: 'property4', label: 'propertyLabel4', content: 'thesauri1'}
          ]}
        ]),
        thesauris: Immutable.fromJS([
          {_id: 'thesauri1', values: [{id: 'value1', label: 'valueLabel1'}, {id: 'value2', label: 'valueLabel2'}]},
          {_id: 'thesauri2', values: [{id: 'value3', label: 'valueLabel3'}, {id: 'value4', label: 'valueLabel4'}]}
        ])
      };

      const filters = selectors.getFilters(state);

      expect(filters.toJS()).toEqual([
        {label: 'Type:', _id: 'isEvidence', values: [{value: 'null', label: 'Suggestion'}, {value: true, label: 'Positive'}, {value: false, label: 'Negative'}]},
        {label: 'Probability:', _id: 'probability', 
          values: [
            {value: '0.5-0.6', label: '50-60'},
            {value: '0.6-0.7', label: '60-70'},
            {value: '0.7-0.8', label: '70-80'},
            {value: '0.8-0.9', label: '80-90'},
            {value: '0.9-1', label: '90-100'}
          ]
        },
        {label: 'propertyLabel1', _id: 'property1', values: [{value: 'value1', label: 'valueLabel1'}, {value: 'value2', label: 'valueLabel2'}]},
        {label: 'propertyLabel3', _id: 'property3', values: [{value: 'value3', label: 'valueLabel3'}, {value: 'value4', label: 'valueLabel4'}]},
        {label: 'propertyLabel4', _id: 'property4', values: [{value: 'value1', label: 'valueLabel1'}, {value: 'value2', label: 'valueLabel2'}]}
      ]);
    });
  });
});