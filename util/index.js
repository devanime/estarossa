/**
 * Global variables and function alises
 */

const sd = window.Estarossa || {};
const sit = window.sit || {};

export const $ = window.jQuery || null;
export const _ = window.lodash || null;
export const dataLayer = window.dataLayer || [];
export const ajaxUrl = sit.ajax_url;
export const apiUrl = sit.api_url;
export const doAction = sd.doAction;
export const addAction = sd.addAction;
export const removeAction = sd.removeAction;
export const applyFilters = sd.applyFilters;
export const addFilter = sd.addFilter;
export const removeFilter = sd.removeFilter;
export const INIT = sd.INIT;
export const REGISTER = sd.REGISTER;
export const READY = sd.READY;
export const HASH_STATE_CHANGE = sd.HASH_STATE_CHANGE;
export const SET_HASH_STATE = sd.SET_HASH_STATE;
export const LAYOUT = sd.LAYOUT;
export const LAYOUTEND = sd.LAYOUTEND;
export const SCROLLSTART = sd.SCROLLSTART;
export const SCROLL = sd.SCROLL;
export const SCROLLEND = sd.SCROLLEND;
export const USER_FIRST_INTERACTION = sd.USER_FIRST_INTERACTION;
export const GFORM_CONFIRM = sd.GFORM_CONFIRM;
export const GA_EVENT = sd.GA_EVENT;
export const GTM_INTERACTION = sd.GTM_INTERACTION;
export const GTM_STATE = sd.GTM_STATE;
export const TRANSITION_END_EVENT = sd.TRANSITION_END_EVENT;

/**
 * Utilities
 */
export const importAll = (r) => r.keys().map(r).map((m) => m.default);
export const registerVueComponents = (r, vue) => importAll(r).forEach((c) => vue.component(c.name, c));
export const apiGet = $ ? (endpoint, data) => $.get(`${apiUrl}${endpoint}`, data) : () => {};
export const apiPost = $ ? (endpoint, data) => $.post(`${apiUrl}${endpoint}`, data) : () => {};
