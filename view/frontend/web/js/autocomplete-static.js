define([
    'PostDirekt_Autocomplete/js/lib/postdirekt-autocomplete-lib.amd',
    'domReady!'
], function (Autocomplete) {
    "use strict";

    /**
     * @typedef {{
     *     street: string,
     *     city: string,
     *     postalCode: string,
     *     country: string,
     * }} FieldNames
     */
    return function (config) {
        /** @var {FieldNames} fieldNames */
        var fieldNames = config.fieldNames,
            countrySelect = document.querySelector(
            '[name = "' + fieldNames.country + '"]'
        );

        if (!countrySelect) {
            console.warn('Autocomplete init failed: Country select not found');
            return;
        }
        try {
            var fieldMap = new Map(Object.keys(fieldNames).map(function (type) {
                var name = fieldNames[type],
                    element = document.querySelector('[name="' + name + '"]');
                if (!element) {
                    throw new Error('Element with name "' + name + '" does not exist');
                }
                return [
                    type,
                    element
                ];
            }));
            Autocomplete.init(fieldMap, countrySelect, config.countryId, config.token);
        } catch (e) {
            console.warn('Autocomplete init failed: ' + e);
        }
    }
});
