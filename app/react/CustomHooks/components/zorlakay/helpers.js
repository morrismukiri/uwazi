import moment from 'moment';
import {
    DECISION_BY_THE_PROSECUTION_OFFICE
} from './constants';

/**
 * returns the number of documents with the specified value for the specified 
 * facetField
 * @param {object} data response object from a call to the search api, should contain the
 * aggregations object for that request
 * @param {string} facetField the field for which to obtain aggregations
 * @param {mixed} the value for which to count matching documents
 * @return {number}
 */
export function getFacetCount (data, facetField, value) {
    const facet = data.aggregations.all[facetField];
    if (!facet) return 0;
    const bucket = facet.buckets.find(b => b.key === value);
    return bucket? bucket.doc_count : 0;
}

/**
 * gets the number of victims on trial
 * @param {object} victims response from the search api
 * @param {Map} idConfig
 */
export function getNumberOfVictimsOnTrial (victims, idConfig) {
    const CASE_ONGOING = idConfig.get('caseOngoing');
    return getFacetCount(victims, DECISION_BY_THE_PROSECUTION_OFFICE, CASE_ONGOING);
}

/**
 * finds a specific thesauri list by id
 * @param {List} thesauris list of all thesauris
 * @param {string} id id of the thesauri to find
 */
export function getThesauriList (thesauris, id) {
    return thesauris.find(thes => thes.get("_id") === id);
}

/**
 * returns the textual label of the specified value
 * from the specified thesauri list
 * @param {List} thesauris list of all thesauris
 * @param {string} listId id of the thesauri list which contains the item
 * @param {string} valueId uuid of the value for which to find the label
 * @return {string}
 */
export function getThesauriItemLabel (thesauris, listId, valueId) {
    const thesauriList = getThesauriList(thesauris, listId);
    const item = thesauriList.get('values').find(i => i.get("id") === valueId);
    return item? item.get("label"): '';
}

/**
 * converts timestamp to a date string
 * using the format YYYY-MM-DD
 * @param {number} timestamp 
 * @return {string}
 */
export function formatDate (timestamp) {
    const d = new Date(timestamp * 1000);
    return moment(d).format('YYYY-MM-DD');
}

/**
 * Conversts an array of hesauri values
 * to a comma separated string of their corresponding labels
 * @param {List} thesauris list of all thesauri
 * @param {string} listId id of the thesauri list which contains the item
 * @param {array} values uuids of the thesauri items
 * @return {string}
 */
export function formatThesauriValuesAsString (thesauris, listId, values) {
    if (!values.length) return 'Unknown';
    return values
        .map(value => getThesauriItemLabel(thesauris, listId, value))
        .join(', ');
}

/**
 * Conversts an array of city thesauri items
 * to a comma separated string of city names
 * @param {List} thesauris 
 * @param {array} cities
 * @param {Map} idConfig
 * @return {string}
 */
export function formatCitiesAsString (thesauris, cities, idConfig) {
    const LOCAL_GEOGRAPHICAL_AREA = idConfig.get('thesauriLocalGeographicalArea');
    return formatThesauriValuesAsString(thesauris, LOCAL_GEOGRAPHICAL_AREA, cities);
}

/**
 * Conversts an array of occupations thesauri items
 * to a comma separated string of occupations names
 * @param {List} thesauris 
 * @param {array} occupations
 * @param {Map} idConfig
 * @return {string}
 */
export function formatOccupationsAsString (thesauris, occupations, idConfig) {
    const LOCAL_TERM_FOR_OCCUPATION = idConfig.get('thesauriLocalTermForOccupation');
    return formatThesauriValuesAsString(thesauris, LOCAL_TERM_FOR_OCCUPATION, occupations);
}

/**
 * extracts an image's data url from markdown markup of the image
 * @param {string} markdown picture markup in the form ![picture](dataUrl)
 * @return {string}
 */
export function extractImageDataUrlFromMarkdown (markdown) {
    return markdown.slice(11, markdown.length - 1);
}