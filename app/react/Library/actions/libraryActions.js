import * as types from 'app/Library/actions/actionTypes';
import api from 'app/Search/SearchAPI';
import {notify} from 'app/Notifications';
import {actions as formActions} from 'react-redux-form';
import {actions} from 'app/BasicReducer';
import documents from 'app/Documents';
import {browserHistory} from 'react-router';
import {toUrlParams} from 'shared/JSONRequest';
import referencesAPI from 'app/Viewer/referencesAPI';
import {api as entitiesAPI} from 'app/Entities';

export function enterLibrary() {
  return {type: types.ENTER_LIBRARY};
}

export function selectDocument(doc) {
  let document = doc;
  if (doc.toJS) {
    document = doc.toJS();
  }
  return {type: types.SELECT_DOCUMENT, doc: document};
}

export function selectDocuments(docs) {
  return {type: types.SELECT_DOCUMENTS, docs};
}

export function unselectDocument(docId) {
  return {type: types.UNSELECT_DOCUMENT, docId};
}

export function unselectAllDocuments() {
  return {type: types.UNSELECT_ALL_DOCUMENTS};
}

export function updateSelectedEntities(entities) {
  return {type: types.UPDATE_SELECTED_ENTITIES, entities};
}

export function showFilters() {
  return {type: types.SHOW_FILTERS};
}

export function hideFilters() {
  return {type: types.HIDE_FILTERS};
}

export function setDocuments(docs) {
  return {type: types.SET_DOCUMENTS, documents: docs};
}

export function setTemplates(templates, thesauris) {
  return function (dispatch) {
    dispatch({type: types.SET_LIBRARY_TEMPLATES, templates, thesauris});
  };
}

export function setPreviewDoc(docId) {
  return {type: types.SET_PREVIEW_DOC, docId};
}

export function setSuggestions(suggestions) {
  return {type: types.SET_SUGGESTIONS, suggestions};
}

export function hideSuggestions() {
  return {type: types.HIDE_SUGGESTIONS};
}

export function showSuggestions() {
  return {type: types.SHOW_SUGGESTIONS};
}

export function setOverSuggestions(boolean) {
  return {type: types.OVER_SUGGESTIONS, hover: boolean};
}

export function processFilters(readOnlySearch, filters, limit) {
  const search = Object.assign({}, readOnlySearch);
  search.aggregations = filters.properties
  .filter((property) => property.type === 'select' || property.type === 'multiselect' || property.type === 'nested')
  .map((property) => {
    if (property.type === 'nested') {
      return {name: property.name, nested: true, nestedProperties: property.nestedProperties};
    }
    return {name: property.name, nested: false};
  });

  search.filters = {};
  filters.properties.forEach((property) => {
    if (!property.active) {
      return;
    }
    let type = 'text';
    if (property.type === 'date' || property.type === 'multidate' || property.type === 'numeric') {
      type = 'range';
    }
    if (property.type === 'select' || property.type === 'multiselect') {
      type = 'multiselect';
    }
    if (property.type === 'nested') {
      type = 'nested';
    }
    if (property.type === 'multidaterange') {
      type = 'nestedrange';
    }
    search.filters[property.name] = {value: readOnlySearch.filters[property.name], type};
  });
  search.types = filters.documentTypes;
  search.limit = limit;
  return search;
}

export function searchDocuments(readOnlySearch, limit) {
  return function (dispatch, getState) {
    const filters = getState().library.filters.toJS();
    const search = processFilters(readOnlySearch, filters, limit);
    dispatch(hideSuggestions());
    browserHistory.push(`/library/${toUrlParams(search)}`);
  };
}

export function updateEntity(updatedDoc) {
  return {type: types.UPDATE_DOCUMENT, doc: updatedDoc};
}

export function updateEntities(updatedDocs) {
  return {type: types.UPDATE_DOCUMENTS, docs: updatedDocs};
}

export function saveDocument(doc) {
  return function (dispatch) {
    return documents.api.save(doc)
    .then((updatedDoc) => {
      dispatch(notify('Document updated', 'success'));
      dispatch(formActions.reset('library.sidepanel.metadata'));
      dispatch(updateEntity(updatedDoc));
      dispatch(selectDocument(updatedDoc));
    });
  };
}

export function multipleUpdate(entities, values) {
  return function (dispatch) {
    const updatedEntities = entities.toJS().map((entity) => {
      entity.metadata = Object.assign({}, entity.metadata, values.metadata);
      if (values.icon) {
        entity.icon = values.icon;
      }
      return entity;
    });

    const updatedEntitiesIds = updatedEntities.map((entity) => entity.sharedId);
    return entitiesAPI.multipleUpdate(updatedEntitiesIds, values)
    .then(() => {
      dispatch(notify('Update success', 'success'));
      dispatch(updateEntities(updatedEntities));
    });
  };
}

export function saveEntity(entity) {
  return function (dispatch) {
    return entitiesAPI.save(entity)
    .then((updatedDoc) => {
      dispatch(notify('Entity updated', 'success'));
      dispatch(formActions.reset('library.sidepanel.metadata'));
      dispatch(dispatch(updateEntity(updatedDoc)));
      dispatch(selectDocument(updatedDoc));
    });
  };
}

export function removeDocument(doc) {
  return {type: types.REMOVE_DOCUMENT, doc};
}

export function removeDocuments(docs) {
  return {type: types.REMOVE_DOCUMENTS, docs};
}

export function deleteDocument(doc) {
  return function (dispatch) {
    return documents.api.delete(doc)
    .then(() => {
      dispatch(notify('Document deleted', 'success'));
      dispatch(unselectAllDocuments());
      dispatch(removeDocument(doc));
    });
  };
}

export function deleteEntity(entity) {
  return function (dispatch) {
    return entitiesAPI.delete(entity)
    .then(() => {
      dispatch(notify('Entity deleted', 'success'));
      dispatch(unselectDocument(entity._id));
      dispatch(removeDocument(entity));
    });
  };
}

export function loadMoreDocuments(amount) {
  return function (dispatch, getState) {
    searchDocuments(getState().search, amount)(dispatch, getState);
  };
}

export function getSuggestions(searchTerm) {
  return (dispatch) => {
    return api.getSuggestions(searchTerm)
    .then((suggestions) => {
      dispatch(setSuggestions(suggestions));
      dispatch(showSuggestions());
    });
  };
}

export function getDocumentReferences(documentId) {
  return (dispatch) => {
    return referencesAPI.get(documentId)
    .then((references) => {
      dispatch(actions.set('library.sidepanel.references', references));
    });
  };
}
