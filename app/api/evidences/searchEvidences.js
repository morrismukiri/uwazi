import {index as elasticIndex} from 'api/config/elasticIndexes';
import elastic from '../search/elastic';
//import queryBuilder from './documentQueryBuilder';

export default {
  //search() {

  //},

  index(evidence) {
    const id = evidence._id.toString();
    let body = Object.assign({}, evidence);
    delete body._id;
    return elastic.index({index: elasticIndex, type: 'evidence', id, body});
  },

  bulkIndex(evidences) {
    const body = evidences.reduce((value, evidence) => {
      value.push({index: {_index: elasticIndex, _type: 'evidence', _id: evidence._id}});
      delete evidence._id;
      value.push(evidence);
      return value;
    }, []);

    return elastic.bulk({body})
    .then((res) => {
      if (res.items) {
        res.items.forEach((f) => {
          if (f.index.error) {
            console.log(`ERROR Failed to index evidence ${f.index._id}: ${JSON.stringify(f.index.error, null, ' ')}`);
          }
        });
      }
      return res;
    });
  },

  delete(id) {
    return elastic.delete({index: elasticIndex, type: 'evidence', id: id.toString()});
  },

  deleteAll() {
    return elastic.deleteByQuery({index: elasticIndex, type: 'evidence', body: {query: {match_all: {}}}});
  }
};
