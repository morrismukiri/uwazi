import superagent from 'superagent';
import {actions as formActions, getModel} from 'react-redux-form';
import {requestViewerState, setViewerState} from 'app/Viewer/actions/routeActions';
import {APIURL} from 'app/config.js';
import * as types from './actionTypes';
import {api as entitiesAPI} from 'app/Entities';
import {notify} from 'app/Notifications';
import {advancedSort} from 'app/utils/advancedSort';

export function resetReduxForm(form) {
  return formActions.reset(form);
}

const resetMetadata = (metadata, template, options) => {
  template.properties.forEach((property) => {
    const assignProperty = options.resetExisting || !metadata[property.name];
    if (assignProperty && property.type !== 'date') {
      metadata[property.name] = '';
    }
    if (assignProperty && property.type === 'daterange') {
      metadata[property.name] = {};
    }
    if (assignProperty && property.type === 'multiselect') {
      metadata[property.name] = [];
    }
    if (assignProperty && property.type === 'nested') {
      metadata[property.name] = [];
    }
    if (assignProperty && property.type === 'multidate') {
      metadata[property.name] = [];
    }
    if (assignProperty && property.type === 'multidaterange') {
      metadata[property.name] = [];
    }
  });
};

export function loadInReduxForm(form, onlyReadEntity, templates) {
  return function (dispatch) {
    //test
    let entity = Object.assign({}, onlyReadEntity);
    //

    const sortedTemplates = advancedSort(templates, {property: 'name'});

    if (!entity.template) {
      entity.template = sortedTemplates[0]._id;
      if (entity.type === 'document' && sortedTemplates.find(t => !t.isEntity)) {
        entity.template = sortedTemplates.find(t => !t.isEntity)._id;
      }
      if (entity.type === 'entity' && sortedTemplates.find(t => t.isEntity)) {
        entity.template = sortedTemplates.find(t => t.isEntity)._id;
      }
    }

    if (!entity.metadata) {
      entity.metadata = {};
    }

    let template = sortedTemplates.find((t) => t._id === entity.template);

    const relationshipProps = template.properties.filter((p) => p.type === 'relationship');

    relationshipProps.forEach((prop) => {
      entity.metadata[prop.name] = entity.relationships
      .filter(r => r.template === prop.relationType)
      .filter(r => !prop.content || prop.content === r.entityData.template)
      .map(r => r.entity);
    });

    delete entity.relationships;
    resetMetadata(entity.metadata, template, {resetExisting: false});

    dispatch(formActions.reset(form));
    dispatch(formActions.load(form, entity));
    dispatch(formActions.setPristine(form));
  };
}

export function changeTemplate(form, templateId) {
  return function (dispatch, getState) {
    const entity = Object.assign({}, getModel(getState(), form));
    entity.metadata = {};

    const template = getState().templates.find(t => t.get('_id') === templateId);

    resetMetadata(entity.metadata, template.toJS(), {resetExisting: true});
    entity.template = template.get('_id');

    dispatch(formActions.reset(form));
    setTimeout(() => {
      dispatch(formActions.load(form, entity));
    });
  };
}

export function loadTemplate(form, template) {
  return function (dispatch) {
    let data = {template: template._id, metadata: {}};
    resetMetadata(data.metadata, template, {resetExisting: true});
    dispatch(formActions.load(form, data));
    dispatch(formActions.setPristine(form));
  };
}

export function reuploadDocument(docId, file, docSharedId, __reducerKey) {
  return function (dispatch, getState) {
    dispatch({type: types.START_REUPLOAD_DOCUMENT, doc: docId});
    superagent.post(APIURL + 'reupload')
    .set('Accept', 'application/json')
    .field('document', docId)
    .attach('file', file, file.name)
    .on('progress', (data) => {
      dispatch({type: types.REUPLOAD_PROGRESS, doc: docId, progress: Math.floor(data.percent)});
    })
    .on('response', () => {
      dispatch({type: types.REUPLOAD_COMPLETE, doc: docId, file, __reducerKey});

      requestViewerState(docSharedId, getState().locale, {templates: getState().templates})
      .then(state => {
        dispatch(setViewerState(state));
      });
    })
    .end();
  };
}

export function multipleUpdate(_entities, values) {
  return function (dispatch) {
    const updatedEntities = _entities.toJS().map((entity) => {
      entity.metadata = Object.assign({}, entity.metadata, values.metadata);
      if (values.icon) {
        entity.icon = values.icon;
      }
      if (values.template) {
        entity.template = values.template;
      }
      return entity;
    });

    const updatedEntitiesIds = updatedEntities.map((entity) => entity.sharedId);
    return entitiesAPI.multipleUpdate(updatedEntitiesIds, values)
    .then(() => {
      dispatch(notify('Update success', 'success'));
      return updatedEntities;
    });
  };
}
