define([
    'underscore',
    'PostDirekt_Autocomplete/js/lib/postdirekt-autocomplete-lib.amd',
    'domReady!'
], function (_, Autocomplete) {
    "use strict";
    /**
     * @typedef {{
     *     street: string,
     *     city: string,
     *     postalCode: string,
     *     country: string,
     * }} FieldNames
     */

    /**
     * @param {Object.<string, HTMLInputElement>} fieldSet
     * @return {Map<string, HTMLInputElement>}
     */
    var createFieldMap = function (fieldSet) {
        var map = new Map(Object.entries(fieldSet).map(function (key) {
            return [key[0], key[1]];
        }));
        map.delete('country');

        return map;
    };

    return function (config) {
        var token = config.token,
            /** @var {FieldNames} fieldNames */
            fieldNames = config.fieldNames,
            countryId = config.countryId;

        var knownFields = [];
        var fieldSet = {};

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (
                        !_.contains(knownFields, node.id)
                        && _.contains(Object.values(fieldNames), node.name)
                    ) {
                        knownFields.push(node.id);

                        // Add the node to the correct index of the fieldSet object
                        fieldSet[_.invert(fieldNames)[node.name]] = node;

                        if (!fieldSet.street || !fieldSet.city || !fieldSet.country || !fieldSet.postalCode) {
                            // Stop if the fieldSet object is not complete
                            return;
                        }

                        Autocomplete.init(createFieldMap(fieldSet), fieldSet.country, countryId, token);
                        fieldSet = {};
                    }
                });

            });
        });

        // watch the DOM for any new nodes
        observer.observe(document.body, {childList: true, subtree: true});
    };
});
