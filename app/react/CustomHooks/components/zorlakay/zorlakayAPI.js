import searchApi from 'app/Search/SearchAPI';
import { VICTIMS } from './constants';

/**
 * makes request to search for victims
 * @param {object} args additional args to pass to search api
 * @return {Promise}
 */
export function fetchVictims (args = {}) {
    args.types = [VICTIMS];
    return searchApi.search(args);
}