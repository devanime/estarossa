/**
 * Generate map of filter types
 *
 * @param {array} filters
 */
function getFilterTypes(filters) {
    var filterTypes = {};
    $.each(filters, function(index, filter) {
        filterTypes[filter.name] = filter.type;
    });
    return filterTypes;
}

/**
 * Split keyword string by spaces or commas, keeping quoted text
 *
 * @param {string} keyword
 * @param {number} minChars
 * @return {array}
 */
function splitKeywordString(keyword, minChars) {
    if($.isArray(keyword)) {
        keyword = keyword.join(' ');
    }
    var split = keyword.replace(/'/g, '"').match(/(".*?"|[^",\s]+)(?=\s*,|\s*)/g);
    return $.map(split, function(str) {
        str = str.replace(/[\W_]+/g, " ").trim().toLowerCase();
        return str.length >= minChars ? str : undefined;
    });
}

/**
 * Convert filter results into object expected by filterable items
 *
 * @param {object} results
 * @param {array} filterDefinitions
 */
function normalizeResults(results, filterDefinitions) {
    var normalized = {};
    var types = getFilterTypes(filterDefinitions);
    // Get keyword configuration info
    var keywordDefinition = $.map(filterDefinitions, function(def) {
        return def.type === 'keyword' ? def.config : undefined;
    }).shift();

    $.each(results, function(key, value) {
        if (value && value.length) {
            if (types[key] === 'keyword') {
                // Split keyword string into array, respecting quoted strings
                normalized[key] = splitKeywordString(value, keywordDefinition['min_characters'] || 3);
            } else {
                // Ensure array values are used
                normalized[key] = $.isArray(value) ? value : [value];
            }
        }
    });

    return normalized;
}

function normalizeMatches(matches, types) {
    var normalized = {};
    $.each(matches, function(key, value) {
        if (value && value.length) {
            normalized[key] = $.isArray(value) ? value : [value];
            if (types[key] === 'keyword') {
                normalized[key] = normalized[key].join(' ').toLowerCase();
            }
        }
    });
    return normalized;
}

function expandChildFilters(definition) {
    var modifiedData = [];
    $.each(definition.filters, function(index, data) {
        if (data.input === 'split') {
            var parent = $.extend({}, data, {
                input: 'select'
            });
            var child = $.extend({}, data, {
                input: 'checkbox',
                name: 'sub_' + data.name,
                parent: data.name
            });
            modifiedData.push(parent);
            modifiedData.push(child);
            $.each(definition.data, function(index, data){
                data.matches[child.name] = data.matches[parent.name];
            });
        } else {
            modifiedData.push(data);
        }
    });
    definition.filters = modifiedData;
    return definition;
}