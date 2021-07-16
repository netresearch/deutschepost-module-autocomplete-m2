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
            deCountryId = config.countryId,
            hint = config.hint,
            knownElementIds = [],
            formInputs = {
                street: undefined,
                city: undefined,
                postalCode: undefined,
                country: undefined
            };

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (element) {
                    if (
                        !_.contains(knownElementIds, element.id)
                        && _.contains(Object.values(fieldNames), element.name)
                    ) {
                        // never process an element twice
                        knownElementIds.push(element.id);

                        // Add the element to the correct index of the formInputs object
                        formInputs[_.invert(fieldNames)[element.name]] = element;

                        if (!formInputs.street || !formInputs.city || !formInputs.postalCode || !formInputs.country) {
                            return;
                        }

                        try {
                            Autocomplete.init(
                                formInputs.street,
                                formInputs.city,
                                formInputs.postalCode,
                                formInputs.country,
                                deCountryId,
                                token,
                                hint
                            );
                        } catch (e) {
                            console.warn('Autocomplete init failed: ' + e);
                        }
                        formInputs = {};
                    }
                });
            });
        });

        // watch the DOM for any new nodess
        observer.observe(document.body, {childList: true, subtree: true});
    };
});
