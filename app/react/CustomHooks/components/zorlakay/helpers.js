import {
    CASE_ONGOING,
    DECISION_BY_THE_PROSECUTION_OFFICE} from './constants';

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
    const bucket = facet.buckets.find(b => {
        console.log(b.key, value);
        return b.key === value;
    });
    return bucket? bucket.doc_count : 0;
}

/**
 * gets the number of victims on trial
 * @param {object} victims response from the search api
 */
export function getNumberOfVictimsOnTrial (victims) {
    return getFacetCount(victims, DECISION_BY_THE_PROSECUTION_OFFICE, CASE_ONGOING);
}