define(function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /**
     * See LICENSE.txt for license details.
     */
    /**
     * Definition of possible search modes
     */
    var Subject;
    (function (Subject) {
        Subject["Buildings"] = "buildings";
        Subject["Cities"] = "cities";
        Subject["Districts"] = "districts";
        Subject["PostalCodes"] = "postalcodes";
        Subject["PostalCodesCities"] = "postalcodes_cities";
        Subject["PostalCodesCitiesDistricts"] = "postalcodes_cities_districts";
        Subject["PostalCodesCitiesDistrictsStreets"] = "postalcodes_cities_districts_streets";
        Subject["PostalCodesCitiesStreets"] = "postalcodes_cities_streets";
    })(Subject || (Subject = {}));

    /**
     * Adapter implementation utilizing fetch and therefore only working in browser contexts
     */
    var FetchAdapter = /** @class */ (function () {
        function FetchAdapter() {
        }
        /**
         * Perform arbitrary HTTP request
         *
         * @param request RequestInterface
         */
        FetchAdapter.prototype.request = function (request) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, fetch(this.mapRequest(request))];
                        case 1:
                            response = _b.sent();
                            // the Autocomplete API only responds with json if there is a success state
                            if (response.status >= 200 && response.status < 300) {
                                if ((_a = response.headers.get('Content-Type')) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) {
                                    return [2 /*return*/, response.json()];
                                }
                                else {
                                    return [2 /*return*/, response.text()];
                                }
                            }
                            if (response.status === 400) {
                                return [2 /*return*/, response.json().then(function (r) {
                                        throw new Error((response.statusText + ': ' + r.message).trim());
                                    })];
                            }
                            return [2 /*return*/, response.text().then(function (t) {
                                    throw new Error((response.statusText + ' ' + t).trim());
                                })];
                    }
                });
            });
        };
        /**
         * Convert SDK request to HTTP request
         *
         * @param request RequestInterface
         */
        FetchAdapter.prototype.mapRequest = function (request) {
            return new Request(request.url, {
                method: request.method,
                headers: request.headers
            });
        };
        return FetchAdapter;
    }());

    /**
     * Static class for providing global defaults
     */
    var DefaultSettings = /** @class */ (function () {
        function DefaultSettings() {
        }
        /**
         * Get suitable adapter for current environment
         */
        DefaultSettings.getAdapter = function () {
            /**
             * @TODO later we want to dynamically check if the environment is node or browser
             */
            return new FetchAdapter();
        };
        DefaultSettings.baseUrl = 'https://autocomplete2.postdirekt.de/autocomplete2/';
        DefaultSettings.headers = {
            Accept: "application/json",
            Authorization: '',
        };
        return DefaultSettings;
    }());

    var Request$1 = /** @class */ (function () {
        function Request(url, method, headers) {
            if (method === void 0) { method = 'GET'; }
            if (headers === void 0) { headers = {}; }
            this.url = '';
            this.method = 'GET';
            this.headers = {};
            this.url = url;
            this.method = method;
            this.headers = headers;
        }
        return Request;
    }());
    /**
     * Request builder for search request
     */
    var SearchRequestBuilder = /** @class */ (function () {
        function SearchRequestBuilder(baseUrl, accessToken) {
            this.baseUrl = baseUrl;
            this.accessToken = accessToken;
        }
        /**
         * Generate a search request with given search options
         * @param options SearchOptions
         */
        SearchRequestBuilder.prototype.create = function (options) {
            var subject = options.subject, country = options.country, params = __rest(options, ["subject", "country"]);
            return new Request$1(this.buildUrl(country, subject, params), 'GET', __assign(__assign({}, DefaultSettings.headers), { "Authorization": "Bearer " + this.accessToken }));
        };
        /**
         * Generate final url with query parameters
         *
         * @param country string
         * @param subject Subject
         * @param params QueryParams
         */
        SearchRequestBuilder.prototype.buildUrl = function (country, subject, params) {
            // add country to path
            var urlString = this.baseUrl + "/" + country;
            // add subject to path
            urlString = urlString + "/" + subject;
            // add query parameters
            urlString = urlString + this.buildQueryString(params);
            return urlString;
        };
        /**
         * Generate query string from parameter configuration
         *
         * @param params QueryParams
         */
        SearchRequestBuilder.prototype.buildQueryString = function (params) {
            var queryString = Object.entries(params)
                .map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], val = _b[1];
                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            })
                .join('&');
            if (queryString) {
                queryString = '?' + queryString;
            }
            return queryString;
        };
        return SearchRequestBuilder;
    }());

    /**
     * Search service for searching address completion suggestions
     */
    var SearchService = /** @class */ (function () {
        function SearchService(accessToken, baseUrl, adapter) {
            this.accessToken = accessToken;
            this.baseUrl = baseUrl;
            this.adapter = adapter;
            this.requestBuilder = new SearchRequestBuilder(baseUrl, accessToken);
        }
        /**
         * Perform a search request
         *
         * @param request RequestInterface
         */
        SearchService.prototype.search = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adapter.request(request)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return SearchService;
    }());

    /**
     * Request builder for select requests
     */
    var SelectRequestBuilder = /** @class */ (function (_super) {
        __extends(SelectRequestBuilder, _super);
        function SelectRequestBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Create a request for selecting a specific suggestion
         *
         * @param options SelectOptions
         */
        SelectRequestBuilder.prototype.create = function (options) {
            return _super.prototype.create.call(this, options);
        };
        return SelectRequestBuilder;
    }(SearchRequestBuilder));

    /**
     * Select service for submitting selection to the API
     */
    var SelectService = /** @class */ (function () {
        function SelectService(accessToken, baseUrl, adapter) {
            this.accessToken = accessToken;
            this.baseUrl = baseUrl;
            this.adapter = adapter;
            this.requestBuilder = new SelectRequestBuilder(baseUrl, accessToken);
        }
        /**
         * Perform a select request
         *
         * @param request RequestInterface
         */
        SelectService.prototype.select = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adapter.request(request)];
                });
            });
        };
        return SelectService;
    }());

    /**
     * See LICENSE.txt for license details.
     */
    /**
     * Factory able to create search and select services
     */
    var ServiceFactory = /** @class */ (function () {
        function ServiceFactory() {
        }
        ServiceFactory.createSearchService = function (accessToken) {
            return new SearchService(accessToken, DefaultSettings.baseUrl + 'search', DefaultSettings.getAdapter());
        };
        ServiceFactory.createSelectService = function (accessToken) {
            return new SelectService(accessToken, DefaultSettings.baseUrl + 'select', DefaultSettings.getAdapter());
        };
        ServiceFactory.prototype.createSearchService = function (accessToken) {
            return ServiceFactory.createSearchService(accessToken);
        };
        ServiceFactory.prototype.createSelectService = function (accessToken) {
            return ServiceFactory.createSelectService(accessToken);
        };
        return ServiceFactory;
    }());

    /**
     * See LICENSE.md for license details.
     */
    var AutocompleteAddressSuggestions = /** @class */ (function () {
        function AutocompleteAddressSuggestions() {
            /**
             * Data storage for address suggestions from the Autocomplete API.
             */
            this.suggestions = [];
        }
        /**
         * Returns suggestion item with the given UUID.
         */
        AutocompleteAddressSuggestions.prototype.getByUuid = function (uuid) {
            return this.suggestions.find(function (item) { return item.uuid === uuid; }) || null;
        };
        return AutocompleteAddressSuggestions;
    }());

    /**
     * See LICENSE.md for license details.
     */
    /**
     * Sync data from and to the DOM address inputs.
     * */
    var AutocompleteDomAddress = /** @class */ (function () {
        function AutocompleteDomAddress(inputMap) {
            this.inputMap = inputMap;
        }
        Object.defineProperty(AutocompleteDomAddress.prototype, "address", {
            /**
             * Read current address input values from DOM.
             */
            get: function () {
                var result = { city: '', postalCode: '', street: '' };
                /**
                 * Note that type safety is guaranteed by the DomAddressData properties
                 * being constructed from the AddressInputType enum, same with the inputMap keys.
                 * They keys in the following iteration therefore always match
                 */
                this.inputMap.forEach(function (input, type) {
                    result[type] = input.value;
                });
                return result;
            },
            /**
             * Update DOM input values with new address data.
             */
            set: function (newAddressData) {
                var e_1, _a;
                try {
                    /**
                     * Note that type safety is guaranteed by the DomAddressData properties
                     * being constructed from the AddressInputType enum, same with the inputMap keys.
                     * They keys in the following iteration therefore always match
                     */
                    for (var _b = __values(this.inputMap), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), fieldName = _d[0], field = _d[1];
                        field.value = newAddressData[fieldName];
                        field.dispatchEvent(new Event('change'));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            },
            enumerable: true,
            configurable: true
        });
        return AutocompleteDomAddress;
    }());

    var Key;
    (function (Key) {
        Key["ArrowUp"] = "ArrowUp";
        Key["ArrowDown"] = "ArrowDown";
        Key["Enter"] = "Enter";
        Key["Tab"] = "Tab";
    })(Key || (Key = {}));
    var Key$1 = Key;

    var ListRenderer = /** @class */ (function () {
        function ListRenderer() {
        }
        /**
         * Attach a given list of suggestions to the given DOM input element,
         * emulating a datalist element.
         *
         * Only one list can be rendered at a time.
         */
        ListRenderer.prototype.render = function (inputElement, addressSuggestions) {
            var _this = this;
            if (!inputElement.parentElement) {
                throw Error('Input elements without a parent cannot be assigned a suggestion list.');
            }
            this.remove();
            this.currentField = inputElement;
            /** Disable native autocomplete to avoid overlapping suggestions. */
            inputElement.setAttribute('autocomplete', 'off');
            var dataList = document.createElement('ul');
            dataList.setAttribute('id', "datalist-" + inputElement.id);
            dataList.setAttribute('class', 'datalist');
            dataList.setAttribute('style', "width:" + inputElement.offsetWidth + "px; top:" + inputElement.offsetHeight + "px;");
            // Convert address data into AddressSuggestionOptions
            addressSuggestions.map(function (addressData) { return ({
                id: addressData.uuid,
                title: [addressData.street, addressData.postalCode, addressData.city].filter(Boolean).join(', '),
            }); })
                // Create HTML list of AddressSuggestionOptions
                .forEach(function (option) {
                var li = document.createElement('li');
                var label = document.createTextNode(option.title);
                li.setAttribute('id', option.id);
                li.setAttribute('data-value', option.title);
                li.appendChild(label);
                dataList.appendChild(li);
            });
            inputElement.parentElement.appendChild(dataList);
            inputElement.parentElement.classList.add('autocomplete-container');
            inputElement.setAttribute('list', "datalist-" + inputElement.id);
            /**
             * Trigger an item select when a datalist option is clicked.
             */
            dataList.addEventListener('mousedown', function (e) {
                var option = e.target;
                _this.itemSelect(option);
                setTimeout(function () { return inputElement.focus(); }, 0);
            });
            /**
             * Remove the datalist when the field is no longer in focus.
             */
            inputElement.addEventListener('focusout', this.remove.bind(this));
            /**
             * Add listener to observe address field navigation keydowns.
             */
            this.removableEventHandler = this.navigationKeyListener.bind(this);
            inputElement.addEventListener('keydown', this.removableEventHandler);
        };
        /**
         * Remove the previously rendered list of suggestions.
         * Removes list from the DOM and detaches all custom event listeners.
         */
        ListRenderer.prototype.remove = function () {
            if (!this.removableEventHandler || !this.currentField) {
                return;
            }
            var datalist = document.querySelector("#datalist-" + this.currentField.id);
            if (datalist) {
                datalist.remove();
            }
            this.currentField.removeEventListener('keydown', this.removableEventHandler);
            this.currentField = undefined;
        };
        ListRenderer.prototype.navigationKeyListener = function (e) {
            if (e.key in Key$1) {
                if (e.key !== Key$1.Tab) {
                    e.preventDefault();
                }
                this.triggerKeydown(e.key);
            }
        };
        ListRenderer.prototype.triggerKeydown = function (key) {
            if (!this.currentField) {
                return;
            }
            var dataList = document.querySelector("#datalist-" + this.currentField.id);
            if (!dataList) {
                return;
            }
            var dataOptions = Array.from(dataList.children);
            var activeItem = dataList.querySelector('[data-active]');
            var firstItem = dataOptions.find(function () { return true; });
            if (!activeItem && key === Key$1.Enter) {
                return;
            }
            if (key === Key$1.ArrowDown && !activeItem) {
                firstItem.setAttribute('data-active', 'true');
            }
            else if (activeItem) {
                var prevVisible_1 = null;
                var nextVisible_1 = null;
                dataOptions.forEach(function (element, index, array) {
                    if (element === activeItem) {
                        prevVisible_1 = array[index - 1];
                        nextVisible_1 = array[index + 1];
                    }
                });
                activeItem.removeAttribute('data-active');
                if (key === Key$1.ArrowUp) {
                    if (prevVisible_1) {
                        prevVisible_1 = prevVisible_1;
                        prevVisible_1.setAttribute('data-active', 'true');
                        if (prevVisible_1.offsetTop < dataList.scrollTop) {
                            dataList.scrollTop -= prevVisible_1.offsetHeight;
                        }
                    }
                    else {
                        dataOptions[dataOptions.length - 1].setAttribute('data-active', 'true');
                    }
                }
                if (key === Key$1.ArrowDown) {
                    if (nextVisible_1) {
                        nextVisible_1 = nextVisible_1;
                        nextVisible_1.setAttribute('data-active', 'true');
                    }
                    else {
                        dataOptions[0].setAttribute('data-active', 'true');
                    }
                }
                if (key === Key$1.Tab) {
                    // Focus the current field so the tab command moves the focus to the next input
                    this.currentField.focus();
                }
                if ([Key$1.Enter, Key$1.Tab].includes(key)) {
                    this.itemSelect(activeItem);
                }
            }
        };
        /**
         * Simulate a datalist element select event.
         */
        ListRenderer.prototype.itemSelect = function (item) {
            if (!this.currentField) {
                return;
            }
            this.currentField.dataset.suggestionUuid = item.id;
            this.currentField.dispatchEvent(new Event('autocomplete:datalist-select'));
            this.remove();
        };
        return ListRenderer;
    }());

    /**
     * See LICENSE.md for license details.
     */
    var AddressAutocomplete = /** @class */ (function () {
        function AddressAutocomplete(inputMap, countrySelect, deCountryId, token) {
            this.navigationKeyCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];
            this.typingDelay = 500;
            this.inputMap = inputMap;
            this.countrySelect = countrySelect;
            this.deCountryId = deCountryId;
            this.searchService = ServiceFactory.createSearchService(token);
            this.selectService = ServiceFactory.createSelectService(token);
            this.addressSuggestions = new AutocompleteAddressSuggestions();
            this.domAddress = new AutocompleteDomAddress(this.inputMap);
            this.listRenderer = new ListRenderer();
        }
        /**
         * Initialize event listeners on the given address DOM inputs elements.
         */
        AddressAutocomplete.prototype.start = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this.inputMap), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), type = _d[0], fieldItem = _d[1];
                    // Attach event listeners
                    fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
                    fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.countrySelect.addEventListener('change', this.handleCountryChange.bind(this));
        };
        /**
         * Handles keystrokes, but does not react to navigation keys.
         */
        AddressAutocomplete.prototype.handleFieldKeystroke = function (e) {
            var _this = this;
            if (this.countrySelect.value !== this.deCountryId) {
                return;
            }
            if (!this.navigationKeyCodes.includes(e.code)) {
                this.triggerDelayedCallback(function () { return _this.searchAction(e.target); }, this.typingDelay);
            }
        };
        /**
         * Update the DOM input values with the selected address suggestion
         * and perform an API select request.
         */
        AddressAutocomplete.prototype.handleDatalistSelect = function (e) {
            var field = e.target;
            var uuid = field.dataset.suggestionUuid;
            var suggestedAddress = this.addressSuggestions.getByUuid(uuid);
            if (!suggestedAddress) {
                return;
            }
            this.domAddress.address = suggestedAddress;
            this.selectAction(suggestedAddress.uuid);
        };
        /**
         * Remove any existing suggestion list from the DOM if the country is changed away from germany.
         */
        AddressAutocomplete.prototype.handleCountryChange = function () {
            if (this.countrySelect.value !== this.deCountryId) {
                this.listRenderer.remove();
            }
        };
        /**
         * Trigger a given callback with the given delay.
         * If called multiple times, queued callbacks are discarded.
         */
        AddressAutocomplete.prototype.triggerDelayedCallback = function (callback, delay) {
            // Clear timeout to prevent previous task from execution
            if (typeof this.timeoutId !== undefined) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = window.setTimeout(callback, delay);
        };
        /**
         * Execute a search request at the Autocomplete API,
         * update the AddressSuggestions model,
         * and render a suggestion list in the DOM.
         */
        AddressAutocomplete.prototype.searchAction = function (currentField) {
            var _this = this;
            var addressData = this.domAddress.address;
            var subject = addressData.street
                ? Subject.PostalCodesCitiesStreets
                : Subject.PostalCodesCities;
            if (Object.values(addressData).join('').trim() === '') {
                return;
            }
            this.searchService.search(this.searchService.requestBuilder.create({
                country: 'de',
                subject: subject,
                combined: Object.values(addressData).join(' '),
            })).then(function (response) {
                // Map search service response into AddressData array
                // and store them in suggestions model
                _this.addressSuggestions.suggestions = response.addresses
                    .filter(function (address) { return !!address.uuid; })
                    .map(function (address) { return ({
                    street: address.street || '',
                    postalCode: address.postalCode || '',
                    city: address.city || '',
                    uuid: address.uuid,
                    district: address.district,
                }); });
                /* Only render anything if the input is still active. */
                if (currentField === document.activeElement) {
                    _this.listRenderer.render(currentField, _this.addressSuggestions.suggestions);
                }
            });
        };
        /**
         * Executes a select request at the Autocomplete API.
         */
        AddressAutocomplete.prototype.selectAction = function (uuid) {
            this.selectService.select(this.selectService.requestBuilder.create({
                country: 'de',
                subject: Subject.PostalCodesCitiesStreets,
                uuid: uuid,
            }));
        };
        return AddressAutocomplete;
    }());

    /**
     * See LICENSE.txt for license details.
     */
    /**
     * The possible semantic types of inputs the library supports
     */
    var AddressInputType;
    (function (AddressInputType) {
        AddressInputType["City"] = "city";
        AddressInputType["Street"] = "street";
        AddressInputType["PostalCode"] = "postalCode";
    })(AddressInputType || (AddressInputType = {}));
    var AddressInputType$1 = AddressInputType;

    /**
     * See LICENSE.txt for license details.
     */
    var init = function (streetInput, cityInput, postalCodeInput, countryInput, deCountryId, token) {
        var autocomplete = new AddressAutocomplete(new Map([
            [AddressInputType$1.Street, streetInput],
            [AddressInputType$1.PostalCode, postalCodeInput],
            [AddressInputType$1.City, cityInput],
        ]), countryInput, deCountryId, token);
        autocomplete.start();
        return autocomplete;
    };
    var postdirektAutocompleteLib = { init: init };

    return postdirektAutocompleteLib;

});
//# sourceMappingURL=postdirekt-autocomplete-lib.amd.js.map
