import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS as Immutable} from 'immutable';
import {searchReferences, loadMoreReferences} from '../actions/actions';

import DocumentsList from 'app/Layout/DocumentsList';
import SearchBar from 'app/ConnectionsList/components/SearchBar';
import RelationshipsGraph from 'app/Relationships/components/RelationshipsGraphEdit';

export function mapStateToProps({relationships}) {
  const documents = relationships.list.searchResults;

  return {
    documents,
    connections: {
      totalRows: documents.get('rows')
                 .filter(r => r.get('sharedId') !== relationships.list.entityId)
                 .reduce((total, r) => total + r.get('connections').size, 0)
    },
    filters: Immutable({documentTypes: []}),
    search: relationships.list.sort,
    sortButtonsStateProperty: 'relationships/list.sort',
    SearchBar,
    GraphView: RelationshipsGraph,
    view: 'graph'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadMoreDocuments: loadMoreReferences,
    searchDocuments: searchReferences
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
