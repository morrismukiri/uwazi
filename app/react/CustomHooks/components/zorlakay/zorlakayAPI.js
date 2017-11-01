import searchApi from 'app/Search/SearchAPI';
import api from 'app/utils/api';

/**
 * makes request to search for entities from the specified template
 * @param {string} template template id
 * @param {object} args additional args to pass to search api
 * @return {Promise} resolves search results
 */
export function fetchTemplateEntities(template, args = {limit: 0}) {
  args.types = [template];
  return searchApi.search(args);
}

/**
 * makes request to fetch references of the specified entity
 * @param {string} entity entity sharedId
 * @param {string} relationType relation type id, if provided only references
 * from this relation type are returned
 * @return {Promise} resolves with references results
 */
export function fetchEntityReferences(entity, relationType = null) {
  const url = `references/by_document/${entity}`;
  return api.get(url).then(response => {
    if (relationType) {
      return response.json.filter(ref => ref.relationType === relationType);
    }
    return response.json;
  });
}

/**
 * fetches all victims who are related to the same event
 * as the specified victim
 * @param {string} victim victim id
 * @param {string} eventRelation relation type id
 * @return {Promise} resolves with array of related victims
 */
export function fetchRelatedVictims(victim, eventRelation) {
  return fetchEntityReferences(victim, eventRelation)
  .then(victimRefs => {
    if (!victimRefs.length) {
      return Promise.resolve([]);
    }
    const event = victimRefs[0].connectedDocument;
    return fetchEntityReferences(event, eventRelation)
    .then(eventRefs => {
      return eventRefs.filter(r => r.connectedDocument !== victim)
      .map(r => ({
        template: r.connectedDocumentTemplate,
        sharedId: r.connectedDocument,
        title: r.connectedDocumentTitle,
        metadata: r.connectedDocumentMetadata
      }));
    });
  });
}
