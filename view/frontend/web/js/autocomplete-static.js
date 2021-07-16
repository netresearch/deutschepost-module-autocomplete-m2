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
            formInputs = {
            street: document.querySelector('[name="' + fieldNames.street + '"]'),
            city: document.querySelector('[name="' + fieldNames.city + '"]'),
            postalCode: document.querySelector('[name="' + fieldNames.postalCode + '"]'),
            country: document.querySelector('[name="' + fieldNames.country + '"]')
        };

        if (!formInputs.street || !formInputs.city || !formInputs.postalCode || !formInputs.country) {
            console.warn('Autocomplete init failed: Not all neccessary inputs found in DOM', formInputs);
            return;
        }

        try {
            Autocomplete.init(
                formInputs.street,
                formInputs.city,
                formInputs.postalCode,
                formInputs.country,
                config.countryId,
                config.token,
                config.hint
            );
        } catch (e) {
            console.warn('Autocomplete init failed: ' + e);
        }
    }
});
