import searchApi from 'app/Search/SearchAPI';

/**
 * makes request to search for entities from the specified template
 * @param {string} template template id
 * @param {object} args additional args to pass to search api
 * @return {Promise}
 */
export function fetchTemplateEntities (template, args = {limit: 0}) {
    args.types = [template];
    return searchApi.search(args);
}