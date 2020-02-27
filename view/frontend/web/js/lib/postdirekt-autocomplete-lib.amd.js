define(function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var postdirektAutocomplete_umd = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, (function () {
	  /**
	   * Adapter implementation utilizing fetch and therefore only working in browser contexts
	   */
	  class FetchAdapter {
	      /**
	       * Perform arbitrary HTTP request
	       *
	       * @param request RequestInterface
	       */
	      async request(request) {
	          const response = await fetch(this.mapRequest(request));
	          // the Autocomplete API only responds with json if there is a success state
	          if (response.status >= 200 && response.status < 300) {
	              return response.json();
	          }
	          if (response.status === 400) {
	              return response.json().then((r) => {
	                  throw new Error((response.statusText + ': ' + r.message).trim());
	              });
	          }
	          return response.text().then((t) => {
	              throw new Error((response.statusText + ' ' + t).trim());
	          });
	      }
	      /**
	       * Convert SDK request to HTTP request
	       *
	       * @param request RequestInterface
	       */
	      mapRequest(request) {
	          return new Request(request.url, {
	              method: request.method,
	              headers: request.headers
	          });
	      }
	  }

	  /**
	   * Static class for providing global defaults
	   */
	  class DefaultSettings {
	      /**
	       * Get suitable adapter for current environment
	       */
	      static getAdapter() {
	          /**
	           * @TODO later we want to dynamically check if the environment is node or browser
	           */
	          return new FetchAdapter();
	      }
	  }
	  DefaultSettings.baseUrl = 'https://autocomplete2.postdirekt.de/autocomplete2/';
	  DefaultSettings.headers = {
	      Accept: "application/json",
	      Authorization: '',
	  };

	  class Request$1 {
	      constructor(url, method = 'GET', headers = {}) {
	          this.url = '';
	          this.method = 'GET';
	          this.headers = {};
	          this.url = url;
	          this.method = method;
	          this.headers = headers;
	      }
	  }
	  /**
	   * Request builder for search request
	   */
	  class SearchRequestBuilder {
	      constructor(baseUrl, accessToken) {
	          this.baseUrl = baseUrl;
	          this.accessToken = accessToken;
	      }
	      /**
	       * Generate a search request with given search options
	       * @param options SearchOptions
	       */
	      create(options) {
	          const { subject, country, ...params } = options;
	          return new Request$1(this.buildUrl(country, subject, params), 'GET', {
	              ...DefaultSettings.headers,
	              ...{ "Authorization": "Bearer " + this.accessToken }
	          });
	      }
	      /**
	       * Generate final url with query parameters
	       *
	       * @param country string
	       * @param subject Subject
	       * @param params QueryParams
	       */
	      buildUrl(country, subject, params) {
	          // add country to path
	          let urlString = this.baseUrl + "/" + country;
	          // add subject to path
	          urlString = urlString + "/" + subject;
	          // add query parameters
	          urlString = urlString + this.buildQueryString(params);
	          return urlString;
	      }
	      /**
	       * Generate query string from parameter configuration
	       *
	       * @param params QueryParams
	       */
	      buildQueryString(params) {
	          let queryString = Object.entries(params)
	              .map(([key, val]) => encodeURIComponent(key) + '=' + encodeURIComponent(val))
	              .join('&');
	          if (queryString) {
	              queryString = '?' + queryString;
	          }
	          return queryString;
	      }
	  }

	  /**
	   * Search service for searching address completion suggestions
	   */
	  class SearchService {
	      constructor(accessToken, baseUrl, adapter) {
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
	      async search(request) {
	          return await this.adapter.request(request);
	      }
	  }

	  /**
	   * Request builder for select requests
	   */
	  class SelectRequestBuilder extends SearchRequestBuilder {
	      /**
	       * Create a request for selecting a specific suggestion
	       *
	       * @param options SelectOptions
	       */
	      create(options) {
	          return super.create(options);
	      }
	  }

	  /**
	   * See LICENSE.txt for license details.
	   */
	  /**
	   * Select service for submitting selection to the API
	   */
	  class SelectService {
	      constructor(accessToken, baseUrl, adapter) {
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
	      async select(request) {
	          return this.adapter.request(request);
	      }
	  }

	  /**
	   * See LICENSE.txt for license details.
	   */
	  /**
	   * Factory able to create search and select services
	   */
	  class ServiceFactory {
	      static createSearchService(accessToken) {
	          return new SearchService(accessToken, DefaultSettings.baseUrl + 'search', DefaultSettings.getAdapter());
	      }
	      static createSelectService(accessToken) {
	          return new SelectService(accessToken, DefaultSettings.baseUrl + 'select', DefaultSettings.getAdapter());
	      }
	      createSearchService(accessToken) {
	          return ServiceFactory.createSearchService(accessToken);
	      }
	      createSelectService(accessToken) {
	          return ServiceFactory.createSelectService(accessToken);
	      }
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
	   * See LICENSE.txt for license details.
	   */
	  const createSearchService = ServiceFactory.createSearchService;
	  const createSelectService = ServiceFactory.createSelectService;
	  var postdirektAutocomplete = {
	      createSearchService,
	      createSelectService,
	      SearchSubjects: Subject
	  };

	  return postdirektAutocomplete;

	})));

	});

	/**
	 * See LICENSE.md for license details.
	 */
	class AutocompleteAddressSuggestions {
	    constructor() {
	        /**
	           * Data storage for address suggestions from the Autocomplete API.
	           */
	        this.suggestions = [];
	    }
	    /**
	       * Returns suggestion item with the given UUID.
	       */
	    getByUuid(uuid) {
	        var _a;
	        return _a = this.suggestions.find((item) => item.uuid === uuid), (_a !== null && _a !== void 0 ? _a : null);
	    }
	}

	/**
	 * See LICENSE.md for license details.
	 */
	/**
	 * Sync data from and to the DOM address inputs.
	 * */
	class AutocompleteDomAddress {
	    constructor(inputMap) {
	        this.inputMap = inputMap;
	    }
	    /**
	       * Read current address input values from DOM.
	       */
	    get address() {
	        return Array.from(this.inputMap)
	            .reduce((carry, [type, input]) => ({ ...carry, [type]: input.value }), {});
	    }
	    /**
	       * Update DOM input values with new address data.
	       */
	    set address(newAddressData) {
	        Object.keys(newAddressData)
	            .forEach((type) => {
	            const input = this.inputMap.get(type);
	            if (input) {
	                input.value = newAddressData[type];
	            }
	        });
	    }
	}

	var Key;
	(function (Key) {
	    Key["ArrowUp"] = "ArrowUp";
	    Key["ArrowDown"] = "ArrowDown";
	    Key["Enter"] = "Enter";
	    Key["Tab"] = "Tab";
	})(Key || (Key = {}));
	var Key$1 = Key;

	class ListRenderer {
	    /**
	       * Attach a given list of suggestions to the given DOM input element,
	       * emulating a datalist element.
	       *
	       * Only one list can be rendered at a time.
	       */
	    render(inputElement, addressSuggestions) {
	        if (!inputElement.parentElement) {
	            throw Error('Input elements without a parent cannot be assigned a suggestion list.');
	        }
	        this.remove();
	        this.currentField = inputElement;
	        /** Disable native autocomplete to avoid overlapping suggestions. */
	        inputElement.setAttribute('autocomplete', 'off');
	        const dataList = document.createElement('ul');
	        dataList.setAttribute('id', `datalist-${inputElement.id}`);
	        dataList.setAttribute('class', 'datalist');
	        dataList.setAttribute('style', `width:${inputElement.offsetWidth}px; top:${inputElement.offsetHeight}px;`);
	        // Convert address data into AddressSuggestionOptions
	        addressSuggestions.map((addressData) => ({
	            id: addressData.uuid,
	            title: [addressData.street, addressData.postalCode, addressData.city].filter(Boolean).join(', '),
	        }))
	            // Create HTML list of AddressSuggestionOptions
	            .forEach((option) => {
	            var _a;
	            const li = document.createElement('li');
	            const label = document.createTextNode(option.title);
	            li.setAttribute('id', (_a = option.id, (_a !== null && _a !== void 0 ? _a : '')));
	            li.setAttribute('data-value', option.title);
	            li.appendChild(label);
	            dataList.appendChild(li);
	        });
	        inputElement.parentElement.appendChild(dataList);
	        inputElement.parentElement.classList.add('autocomplete-container');
	        inputElement.setAttribute('list', `datalist-${inputElement.id}`);
	        /**
	         * Trigger an item select when a datalist option is clicked.
	         */
	        dataList.addEventListener('mousedown', (e) => {
	            const option = e.target;
	            this.itemSelect(option);
	            setTimeout(() => inputElement.focus(), 0);
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
	    }
	    /**
	     * Remove the previously rendered list of suggestions.
	     * Removes list from the DOM and detaches all custom event listeners.
	     */
	    remove() {
	        if (!this.removableEventHandler || !this.currentField) {
	            return;
	        }
	        const datalist = document.querySelector(`#datalist-${this.currentField.id}`);
	        if (datalist) {
	            datalist.remove();
	        }
	        this.currentField.removeEventListener('keydown', this.removableEventHandler);
	        this.currentField = undefined;
	    }
	    navigationKeyListener(e) {
	        if (e.key in Key$1) {
	            if (e.key !== Key$1.Tab) {
	                e.preventDefault();
	            }
	            this.triggerKeydown(e.key);
	        }
	    }
	    triggerKeydown(key) {
	        if (!this.currentField) {
	            return;
	        }
	        const dataList = document.querySelector(`#datalist-${this.currentField.id}`);
	        if (!dataList) {
	            return;
	        }
	        const dataOptions = Array.from(dataList.children);
	        const activeItem = dataList.querySelector('[data-active]');
	        const firstItem = dataOptions.find(() => true);
	        if (!activeItem && key === Key$1.Enter) {
	            return;
	        }
	        if (key === Key$1.ArrowDown && !activeItem) {
	            firstItem.setAttribute('data-active', 'true');
	        }
	        else if (activeItem) {
	            let prevVisible = null;
	            let nextVisible = null;
	            dataOptions.forEach((element, index, array) => {
	                if (element === activeItem) {
	                    prevVisible = array[index - 1];
	                    nextVisible = array[index + 1];
	                }
	            });
	            activeItem.removeAttribute('data-active');
	            if (key === Key$1.ArrowUp) {
	                if (prevVisible) {
	                    prevVisible = prevVisible;
	                    prevVisible.setAttribute('data-active', 'true');
	                    if (prevVisible.offsetTop < dataList.scrollTop) {
	                        dataList.scrollTop -= prevVisible.offsetHeight;
	                    }
	                }
	                else {
	                    dataOptions[dataOptions.length - 1].setAttribute('data-active', 'true');
	                }
	            }
	            if (key === Key$1.ArrowDown) {
	                if (nextVisible) {
	                    nextVisible = nextVisible;
	                    nextVisible.setAttribute('data-active', 'true');
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
	    }
	    /**
	       * Simulate a datalist element select event.
	       */
	    itemSelect(item) {
	        if (!this.currentField) {
	            return;
	        }
	        this.currentField.dataset.suggestionUuid = item.id;
	        this.currentField.dispatchEvent(new Event('autocomplete:datalist-select'));
	        this.remove();
	    }
	}

	/**
	 * See LICENSE.md for license details.
	 */
	class AddressAutocomplete {
	    constructor(inputMap, countrySelect, deCountryId, token) {
	        this.navigationKeyCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];
	        this.typingDelay = 500;
	        this.inputMap = inputMap;
	        this.countrySelect = countrySelect;
	        this.deCountryId = deCountryId;
	        this.searchService = postdirektAutocomplete_umd.createSearchService(token);
	        this.selectService = postdirektAutocomplete_umd.createSelectService(token);
	        this.addressSuggestions = new AutocompleteAddressSuggestions();
	        this.domAddress = new AutocompleteDomAddress(this.inputMap);
	        this.listRenderer = new ListRenderer();
	    }
	    /**
	       * Initialize event listeners on the given address DOM inputs elements.
	       */
	    start() {
	        for (const [type, fieldItem] of this.inputMap) {
	            // Set the type of input into a data attribute
	            // to know the type when the element is triggering an event listener.
	            fieldItem.setAttribute('data-autocomplete-address-type', type);
	            // Attach event listeners
	            fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
	            fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
	        }
	        this.countrySelect.addEventListener('change', this.handleCountryChange.bind(this));
	    }
	    /**
	       * Handles keystrokes, but does not react to navigation keys.
	       */
	    handleFieldKeystroke(e) {
	        if (this.countrySelect.value !== this.deCountryId) {
	            return;
	        }
	        if (!this.navigationKeyCodes.includes(e.code)) {
	            this.triggerDelayedCallback(() => this.searchAction(e.target), this.typingDelay);
	        }
	    }
	    /**
	       * Update the DOM input values with the selected address suggestion
	       * and perform an API select request.
	       */
	    handleDatalistSelect(e) {
	        const input = e.target;
	        const uuid = input.dataset.suggestionUuid;
	        if (!uuid) {
	            return;
	        }
	        const suggestedAddress = this.addressSuggestions.getByUuid(uuid);
	        if (!suggestedAddress) {
	            return;
	        }
	        this.domAddress.address = suggestedAddress;
	        this.selectAction(suggestedAddress.uuid);
	    }
	    /**
	       * Remove any existing suggestion list from the DOM if the country is changed away from germany.
	       */
	    handleCountryChange() {
	        if (this.countrySelect.value !== this.deCountryId) {
	            this.listRenderer.remove();
	        }
	    }
	    /**
	       * Trigger a given callback with the given delay.
	       * If called multiple times, queued callbacks are discarded.
	       */
	    triggerDelayedCallback(callback, delay) {
	        // Clear timeout to prevent previous task from execution
	        if (typeof this.timeoutId !== undefined) {
	            clearTimeout(this.timeoutId);
	        }
	        this.timeoutId = window.setTimeout(callback, delay);
	    }
	    /**
	       * Execute a search request at the Autocomplete API,
	       * update the AddressSuggestions model,
	       * and render a suggestion list in the DOM.
	       */
	    searchAction(currentField) {
	        const addressData = this.domAddress.address;
	        const subject = addressData.street
	            ? postdirektAutocomplete_umd.SearchSubjects.PostalCodesCitiesStreets
	            : postdirektAutocomplete_umd.SearchSubjects.PostalCodesCities;
	        this.searchService.search(this.searchService.requestBuilder.create({
	            country: 'de',
	            subject,
	            combined: Object.values(addressData).join(' '),
	        })).then((response) => {
	            // Map search service response into AddressData array
	            // and store them in suggestions model
	            this.addressSuggestions.suggestions = response.addresses.reduce((filtered, address) => {
	                var _a, _b, _c;
	                // ignore all results with no uuid.
	                if (!address.uuid) {
	                    return filtered;
	                }
	                filtered.push({
	                    street: (_a = address.street, (_a !== null && _a !== void 0 ? _a : '')),
	                    postalCode: (_b = address.postalCode, (_b !== null && _b !== void 0 ? _b : '')),
	                    city: (_c = address.city, (_c !== null && _c !== void 0 ? _c : '')),
	                    uuid: address.uuid,
	                    district: address.district,
	                });
	                return filtered;
	            }, []);
	            /* Only render anything if the input is still active. */
	            if (currentField === document.activeElement) {
	                this.listRenderer.render(currentField, this.addressSuggestions.suggestions);
	            }
	        });
	    }
	    /**
	       * Executes a select request at the Autocomplete API.
	       */
	    selectAction(uuid) {
	        this.selectService.select(this.selectService.requestBuilder.create({
	            country: 'de',
	            subject: postdirektAutocomplete_umd.SearchSubjects.PostalCodesCitiesStreets,
	            uuid,
	        }));
	    }
	}

	/**
	 * See LICENSE.txt for license details.
	 */
	const init = (inputMap, countrySelect, deCountryId, token) => {
	    const autocomplete = new AddressAutocomplete(inputMap, countrySelect, deCountryId, token);
	    autocomplete.start();
	    return autocomplete;
	};
	var postdirektAutocompleteLib = { init };

	return postdirektAutocompleteLib;

});
//# sourceMappingURL=postdirekt-autocomplete-lib.amd.js.map
