/**
 * @license ral v1.0.0 
 * Copyright (c) @2013 Rakuten.Inc 
 * Date : @2013-02-21
 */

/**
* Logging statements enabling switch.
*
* Remove with --define='RELEASE' --compilation_level ADVANCED_OPTIMIZATIONS
* in the Google Closure command line.
*
* @private
* @define {boolean} Debugging switch.
*/
var RELEASE = false;

// GJsLint complains about the @namespace tag, but it is present in jsdoc...

/**
* Container for all the analytics code.
*
* @namespace
* @type {Object}
*/
var RAL = RAL || {};

// Uncomment this if you want to not have Google Closure complain about
// RAL.callQueue being undefined - it is defined elsewhere in the namespace
// but outside this file.

// RAL.callQueue = RAL.callQueue || [];

(function (window,undefined) {
    'use strict';
    
    /**
    * Keys for the analytics parameters.
    * @enum {string}
    */
    RAL.ParameterTypes = {
        /** Account ID. */
        ACCOUNT_ID: 'acc',

        /** GPS Accuracy, in metres. */
        ACCURACY: 'accu',

        /** Affiliate ID. */
        AFFILIATE_ID: 'afid',

        /** GPS Altitude, in metres. */
        ALTITUDE: 'altitude',

        /** GPS Altitude accuracy, in metres. */
        ALTITUDE_ACCURACY: 'altaccu',

        /** Browser language, in ISO-639 format. */
        BROWSER_LANGUAGE: 'bln',

        /** Campaign code. */
        CAMPAIGN_CODE: 'cc',

        /** Character set in use by the browser. */
        CHARSET: 'tis',

        /** Checkout stage. */
        CHECKOUT: 'chkout',

        /** Checkpoints. */
        CHECKPOINTS: 'chkpt',

        /** Content language, in ISO-639 format. */
        CONTENT_LANGUAGE: 'cntln',

        /** Currency code, in ISO-4217 format. */
        CURRENCY: 'cycode',

        /** Custom parameters. */
        CUSTOM: 'cp',

        /** Adobe Flash(tm) version. */
        FLASH_VERSION: 'flv',

        /** Item genre. */
        GENRE: 'genre',

        /** Goal ID. */
        GOAL_ID: 'gol',

        /** GPS Timestamp. */
        GPS_TIMESTAMP: 'tms',

        /** GPS Heading, in degrees. */
        HEADING: 'head',

        /** Number of items per product. */
        ITEMS_COUNT: 'ni',

        /** Oracle Java(tm) presence flag. */
        JAVA_PRESENT: 'jav',

        /** GPS Latitude, in degrees North. */
        LATITUDE: 'lat',

        /** GPS Position container. */
        LOCATION: 'loc',

        /** GPS Longitude, in degrees West. */
        LONGITUDE: 'long',

        /** Online flag. */
        ONLINE_STATUS: 'online',

        /** Page name. */
        PAGE_NAME: 'pgn',

        /** Page type. */
        PAGE_TYPE: 'pgt',

        /** Persistent cookie. */
        PERSISTENT_COOKIE: 'ckp',

        /** Item price. */
        ITEM_PRICE: 'price',

        /** Item ID. */
        ITEM_ID: 'itemid',
        
        /** Item Vector. */
        ITEM_QUANTITY: 'num_items',

        /** HTTP Referrer URL. */
        REFERRER: 'ref',

        /** Request result. */
        REQUEST_RESULT: 'reqc',

        /** Window size, in WxH string format. */
        RESOLUTION: 'res',

        /** Script load timestamp. */
        SCRIPT_START_TIME: 'ltm',

        /** Search query fields. */
        SEARCH_QUERY: 'sq',

        /** Service ID. */
        SERVICE_ID: 'aid',

        /** Session cookie. */
        SESSION_COOKIE: 'cks',

        /** GPS Speed, in m/s. */
        SPEED: 'speed',

        /** Current timestamp. */
        TIMESTAMP: 'ts',

        /** Browser timezone. */
        TIMEZONE: 'tzo',

        /** Browser user agent string. */
        USER_AGENT: 'ua',

        /** Analytics parameters version. */
        VERSION: 'ver',

        /** List of items that have been shown. */
        VIEW_IMPRESSIONS: 'sresv',

        /** Tab Id. */
        TAB_ID: 'tid'
    };

    /**
    * Fallback browser language code.
    *
    * @private
    * @const
    * @type {string}
    */
    RAL._UNKNOWN_BROWSER_LANGUAGE = 'OO1OO';

    /**
    * The amount of milliseconds to wait between each update.
    *
    * @private
    * @const
    * @type {number}
    */
    RAL._DEFAULT_ANALYTICS_INTERVAL = 500;

    /**
    * Predefined key to use for storing offline data.
    *
    * Oh, and 'ROFL' stands for 'RakutenOFfLine'.
    *
    * @private
    * @const
    * @type {string}
    */
    RAL._OFFLINE_STORAGE_KEY = 'ROFL';

    /**
    * Predefined HTTP POST parameter for uncompressed record requests.
    *
    * @private
    * @const
    * @type {string}
    */
    RAL._POST_RAW_REQUEST_PARAMETER = 'cpkg_none=';

    /**
    * Predefined HTTP GET parameter for single uncompressed record requests.
    *
    * @private
    * @const
    * @type {string}
    */
    RAL._GET_RAW_REQUEST_PARAMETER = '?' + RAL._POST_RAW_REQUEST_PARAMETER;

    /**
    * Maximum amount of tracked events that can be held in the offline storage
    * area.
    *
    * @private
    * @const
    * @type {number}
    */
    RAL._RECORDS_LIMIT_COUNT = 256;

    /**
    * Maximum amount of characters for the offline storage record data.
    *
    * @private
    * @const
    * @type {number}
    */
    RAL._RECORDS_LIMIT_TOTAL_SIZE = 256 * 1024;

    /**
    * Maximum amount of records that can be sent at any single time.
    *
    * @private
    * @const
    * @type {number}
    */
    RAL._RECORDS_CHUNK_LENGTH = 16;

    /////////////////////////////////////////////////////////////////////


    /**
    * Strips spaces away from both ends of a given string.
    *
    * @private
    * @param {*} input The string to process.
    * @return {?string} the processed string or null if the input was invalid.
    */
    RAL._trimString = function (input) {
        return (typeof input === 'string') ?
            input.replace(/^\s+|\s+$/g, '') : null;
    };

    /**
    * Merges two dictionaries, copying data from the second given dictionary
    * into the first.
    *
    * If either or both arguments are not objects, nothing will be done.
    *
    * @private
    * @param {Object.<string, (number|Object|string|boolean)>} first The first
    *        dictionary, which will also contains the new data.
    * @param {Object.<string, (number|Object|string|boolean)>} second The second 
    *        dictionary.
    * @return {boolean} true if a merge was possible, false otherwise.
    */
    RAL._mergeDictionaries = function (first, second) {
        if ((typeof first === 'object') && (typeof second === 'object')) {
            /** @type {string} */
            var key;
            for (key in second) {
                first[key] = second[key];
            }

            return true;
        }

        return false;
    };

    /**
    * Gets a named cookie.
    *
    * @private
    * @param {string} name The cookie name.
    * @return {?string} the cookie data or null if not found.
    */
    RAL._getCookie = function (name) {
        /** @type {?string} */
        var cookieName = RAL._trimString(name);

        if (cookieName === null) {
            !RELEASE && window.console && window.console.log('Empty cookie name!');
            return null;
        }

        /** @type {Array.<string>|string} */
        var cookieData = document.cookie && document.cookie.split(';');
        /** @type {number} */
        var index;
        for (index = 0; index < cookieData.length; index++) {
            /** @type {number} */
            var separatorIndex = cookieData[index].indexOf('=');
            if (separatorIndex > 0) {
                /** @type {?string} */
                var data = RAL._trimString(cookieData[index].substr(
                    0, separatorIndex));
                if (data === cookieName) {
                    return cookieData[index].substr(separatorIndex + 1);
                }
            }
        }

        return null;
    };

    /**
    * Sets cookie data.
    *
    * @private
    * @param {string} name The cookie name.
    * @param {string} value The cookie value.
    * @param {number} days The amount of days this cookie should be valid.
    */
    RAL._setCookie = function (name, value, days) {
        /** @type {?string} */
        var cookieName = RAL._trimString(name);
        /** @type {?string} */
        var cookieValue = RAL._trimString(value);
        /** @type {number} */
        var cookieDays = parseInt(days, 10);

        if ((cookieName !== null) && (cookieValue !== null) &&
        !isNaN(cookieDays)) {

            /** @type {Object} */
            var date = new Date();
            if (cookieDays <= 0) {
                date.setTime(0);
            } else {
                date.setDate(date.getDate() + cookieDays);
            }

            if (!RELEASE && window.console) {
                if (cookieDays <= 0) {
                    window.console.log('Clearing cookie "' + cookieName + '"');
                } else {
                    /** @type {boolean} */
                    var secure = location.protocol === 'https:';
                    window.console.log('Setting ' + (secure ? 'secure ' : '') +
                        'cookie "' + cookieName + '" with value "' + cookieValue +
                        '" valid for "' + cookieDays + '" days');
                }
            }

            document.cookie = cookieName + '=' + cookieValue +
                '; expires=' + date.toGMTString() + ';' +
                (location.protocol === 'https:' ? ' secure;' : '');
        } else {
            !RELEASE && window.console &&
                window.console.log('Empty name or string!');
        }
    };

    /**
    * Removes a named cookie.
    *
    * @private
    * @param {string} name The cookie name.
    */
    RAL._removeCookie = function (name) {
        RAL._setCookie(name, '', -1);
    };

    /**
    * Checks if cookies are accepted by the browser.
    *
    * @private
    * @return {boolean} true if cookies are accepted, false otherwise.
    */
    RAL._testCookieSupport = function () {
        /** @type {string} */
        var testMarker = 'RAL_TEST';
        RAL._setCookie(testMarker, testMarker);
        if (RAL._getCookie(testMarker) !== testMarker) {
            // we are setting expiry data to '-1' because of this 'testMarker'
            // cookie gets deleted as it is not in use further  
            RAL._setCookie(testMarker, '', -1);
            return true;
        }

        return false;
    };

    /////////////////////////////////////////////////////////////////////

    /**
    * Smart parameter container.
    *
    * Akin to a plain Javascript object container, this class encapsulates
    * the various sanity checks involved in making sure incoming data is
    * valid and outgoing data is accepted by the analytics server.
    *
    * @class
    * @private
    * @constructor
    * @param {Object=} preload An optional container object to preload the
    *                  current container instance with.
    */
    RAL.ParametersContainer = function (preload) {
        /** @type {Object} */
        this._parameters = {};

        if (preload !== undefined) {
            RAL._mergeDictionaries(this._parameters, preload);
        }
    };

    /**
    * Removes all entries in the container.
    */
    RAL.ParametersContainer.prototype.clear = function () {
        this._parameters = {};
    };

    /**
    * Checks if the given value can be put in the parameters list.
    *
    * @private
    * @param {Object|string|number|boolean} value The value to check.
    * @return {boolean} if the value can be used.
    */
    RAL.ParametersContainer.prototype._isValid = function (value) {
        /** @type {string} */
        var type = typeof value;
        if (type === 'string') {
            return RAL._trimString(value) !== '';
        }

        if ((type === 'object') && ((value === []) || (value === {}))) {
            return false;
        }

        if ((type === 'number') && isNaN(value)) {
            return false;
        }

        return (((value !== null) && (value !== undefined)) &&
            ((type === 'number') || (type === 'boolean') || (type === 'object')));
    };

    /**
    * Adds a new key,value pair to the parameters list.
    *
    * If an invalid key,value pair gets sent, as in either the key not
    * being a non-empty string or the value not being of a valid type,
    * nothing gets added and nothing gets reported to the caller.
    *
    * @param {string} key The key to use for the given value.
    * @param {Object|number|string|boolean} value The value to add to the
    *        parameters list.
    */
    RAL.ParametersContainer.prototype.insert = function (key, value) {
        /** @type {?string} */
        var keyString = RAL._trimString(key);

        if ((keyString === null) || (keyString === '')) {
            !RELEASE && window.console && window.console.log('Empty key!');
            return;
        }

        if (keyString in this._parameters) {
            !RELEASE && window.console &&
                window.console.log('Overwriting ' + keyString);
        }

        if (!this._isValid(value)) {
            !RELEASE && window.console && window.console.log('Invalid value for ' +
                keyString);
        } else {
            this._parameters[keyString] = (typeof value === 'string') ?
                RAL._trimString(value) : value;
        }
    };

    /**
    * Deletes a key from the parameters list.
    *
    * If the given key is not found, or is not a non-empty string,
    * nothing happens.
    *
    * @param {string} key The key to remove.
    */
    RAL.ParametersContainer.prototype.remove = function (key) {
        /** @type {?string} */
        var keyString = RAL._trimString(key);

        if ((keyString === null) || (keyString === '')) {
            !RELEASE && window.console && window.console.log('Empty key!');
            return;
        }

        if (keyString in this._parameters) {
            delete this._parameters[keyString];
        }
    };

    /**
    * Utility method to populate the parameters list from a given object.
    *
    * If the given source item is not an object or is empty, nothing happens.
    * Pre-existing data will not be removed but if overlapping keys are found,
    * they will be overwritten with the new value.
    *
    * @param {Object.<string, Object|number|boolean|string>} parameters The
    *        source of key,value pairs to add.
    */
    RAL.ParametersContainer.prototype.merge = function (parameters) {
        if ((typeof parameters !== 'object') || (parameters === {})) {
            !RELEASE && window.console && window.console.log(
                'Invalid object type or empty object!');
            return;
        }

        /** @type {string} key */
        var key;

        for (key in parameters) {
            this.insert(key, parameters[key]);
        }
    };

    /**
    * Converts the content of the parameters list into a JSON string.
    *
    * @return {string} a JSON-formatted parameters list.
    */
    RAL.ParametersContainer.prototype.serialize = function () {
        return JSON.stringify(this._parameters);
    };

    /**
    * Gets the associated value for a given key.
    *
    * If the given key is not found, or is not a non-empty string,
    * null is returned to the caller.
    *
    * @param {string} key The key to fetch.
    * @return {Object} the associated value or null if not present.
    */
    RAL.ParametersContainer.prototype.get = function (key) {
        /** @type {?string} */
        var keyString = RAL._trimString(key);

        if ((keyString === null) || (keyString === '')) {
            return null;
        }

        return (keyString in this._parameters) ?
            this._parameters[keyString] : null;
    };

    /**
    * Checks if a key is in the parameters list.
    *
    * If the given key is not found, or is not a non-empty string,
    * false is returned to the caller.
    *
    * @param {string} key The key to check for.
    * @return {boolean} if the key has been found.
    */
    RAL.ParametersContainer.prototype.hasKey = function (key) {
        /** @type {?string} */
        var keyString = RAL._trimString(key);

        if ((keyString === null) || (keyString === '')) {
            return false;
        }

        return keyString in this._parameters;
    };

    /**
    * Returns a copy of the parameters list.
    *
    * @return {Object.<string, Object|number|string|boolean>} a copy of the
    *         parameters contained in the object.
    */
    RAL.ParametersContainer.prototype.clone = function () {
        /** @type {Object.<string, Object|number|string|boolean>} */
        var output = {};
        /** @type {string} */
        var key;

        for (key in this._parameters) {
            output[key] = this._parameters[key];
        }

        return output;
    };

    /////////////////////////////////////////////////////////////////////

    /**
    * Offline storage provider interface.
    *
    * @private
    * @interface
    */
    RAL.OfflineStorage = function () {
    };

    /**
    * Sets the given key with the given data in the offline storage area.
    *
    * @private
    * @param {string} key The key name to store data in.
    * @param {Object|string|number|boolean} value The value to store.
    * @return {boolean} true if the data was saved correctly, false otherwise.
    */
    RAL.OfflineStorage.prototype.setForKey = function (key, value) {
    };

    /**
    * Gets the value associated with the given key.
    *
    * @private
    * @param {string} key The key name to fetch data for.
    * @return {Object|string|number|boolean|null} the associated data, or null
    *         if the key is not present.
    */
    RAL.OfflineStorage.prototype.getForKey = function (key) {
    };

    /**
    * Removes data associated with the given key, if present.
    *
    * @private
    * @param {string} key The key name to remove.
    */
    RAL.OfflineStorage.prototype.removeKey = function (key) {
    };

    /**
    * Removes all keys from the offline storage area.
    *
    * @private
    */
    RAL.OfflineStorage.prototype.clear = function () {
    };

    /**
    * Checks for the existence of a given key.
    *
    * @private
    * @param {string} key The key name to check.
    * @return {boolean} true if the key exists, false otherwise.
    */
    RAL.OfflineStorage.prototype.hasKey = function (key) {
    };

    /**
    * Cookie-based storage provider.
    *
    * @private
    * @see RAL.OfflineStorage
    * @implements {RAL.OfflineStorage}
    * @constructor
    */
    RAL.CookieStorage = function () {
        /** @type {string} */
        this._marker = 'RAL';
    };

    /**
    * Sets the given key with the given data in the Cookie storage area.
    *
    * @private
    * @param {string} key The key name to store data in.
    * @param {Object|string|number|boolean} value The value to store.
    * @return {boolean} true if the data was saved correctly, false otherwise.
    */
    RAL.CookieStorage.prototype.setForKey = function (key, value) {
        // Limit data to 1000 unescaped bytes - can be up to 3000 once escaped.
        if (value.length > 1000) {
            return false;
        }

        RAL._setCookie(this._marker + key, encodeURIComponent(String(value)), 365);
        return decodeURIComponent(RAL._getCookie(this._marker + key)) === value;
    };

    /**
    * Gets the value associated with the given key.
    *
    * @private
    * @param {string} key The key name to fetch data for.
    * @return {Object|string|number|boolean|null} the associated data, or null
    *         if the key is not present.
    */
    RAL.CookieStorage.prototype.getForKey = function (key) {
        /** @type {?string} */
        var cookieValue = RAL._getCookie(this._marker + key);
        return cookieValue == null ? null : decodeURIComponent(cookieValue);
    };

    /**
    * Removes data associated with the given key, if present.
    *
    * @private
    * @param {string} key The key name to remove.
    */
    RAL.CookieStorage.prototype.removeKey = function (key) {
        RAL._removeCookie(this._marker + key);
    };

    /**
    * Removes all data from the Cookie storage area.
    *
    * @private
    */
    RAL.CookieStorage.prototype.clear = function () {
        /** @type {Array.<string>|string} */
        var cookieData = document.cookie && document.cookie.split(';');
        /** @type {number} */
        var index;
        for (index = 0; index < cookieData.length; index++) {
            /** @type {number} */
            var separatorIndex = cookieData[index].indexOf('=');
            if (separatorIndex > 0) {
                /** @type {string} */
                var cookieName = RAL._trimString(cookieData[index].substr(0, separatorIndex));
                if (cookieName.indexOf(this._marker) === 0) {
                    this.removeKey(cookieName.substring(this._marker.length));
                }
            }
        }
    };

    /**
    * Checks for the existence of a given key.
    *
    * @private
    * @param {string} key The key name to check.
    * @return {boolean} true if the key exists, false otherwise.
    */
    RAL.CookieStorage.prototype.hasKey = function (key) {
        return this.getForKey(key) !== null;
    };

    /**
    * HTML LocalStorage-based storage provider.
    *
    * @private
    * @see RAL.OfflineStorage
    * @implements {RAL.OfflineStorage}
    * @constructor
    */
    RAL.LocalStorage = function () {
        /** @type {string} */
        this._marker = 'RAL';
    };

    /**
    * Sets the given key with the given data in the Local storage area.
    *
    * @private
    * @param {string} key The key name to store data in.
    * @param {Object|string|number|boolean} value The value to store.
    * @return {boolean} true if the data was saved correctly, false otherwise.
    */
    RAL.LocalStorage.prototype.setForKey = function (key, value) {
        try {
            window.localStorage.setItem(this._marker + key, value);
            return true;
        } catch (quotaExceeded) {
            !RELEASE && window.console && window.console.log('Quota exceeded: ' +
                quotaExceeded.toString());
        }

        return false;
    };

    /**
    * Gets the value associated with the given key.
    *
    * @private
    * @param {string} key The key name to fetch data for.
    * @return {Object|string|number|boolean|null} the associated data, or null
    *         if the key is not present.
    */
    RAL.LocalStorage.prototype.getForKey = function (key) {
        return window.localStorage.getItem(this._marker + key);
    };

    /**
    * Removes data associated with the given key, if present.
    *
    * @private
    * @param {string} key The key name to remove.
    */
    RAL.LocalStorage.prototype.removeKey = function (key) {
        window.localStorage.removeItem(this._marker + key);
    };

    /**
    * Removes all keys from the offline storage area.
    *
    * @private
    */
    RAL.LocalStorage.prototype.clear = function () {

        /** @type {Array.<string>|string} */
        var localStorageName = [];

        //We are adding all the keys to a separate array and looping that array 
        //because the window.localStorage.length reduces if we remove an item.

        /** @type {number} */
        var index;

        //Add only those keys which starts with this._marker
        for (index = 0; index < window.localStorage.length; index++) {
            if (window.localStorage.key(index).indexOf(this._marker) === 0) {
                localStorageName.push(window.localStorage.key(index));
            }
        }

        for (index = 0; index < localStorageName.length; index++) {
            this.removeKey(localStorageName[index].substring(this._marker.length));
        }
    };

    /**
    * Checks for the existence of a given key.
    *
    * @private
    * @param {string} key The key name to check.
    * @return {boolean} true if the key exists, false otherwise.
    */
    RAL.LocalStorage.prototype.hasKey = function (key) {
        return this.getForKey(key) !== null;
    };

    /**
    * Null storage, to use if there is neither HTML local storage or cookies
    * support from the browser.
    *
    * @private
    * @see RAL.OfflineStorage
    * @implements {RAL.OfflineStorage}
    * @constructor
    */
    RAL.NullStorage = function () {
        !RELEASE && window.console && window.console.log('No storage support!');
    };

    /**
    * Sets the given key with the given data in the offline storage area.
    *
    * @private
    * @param {string} key The key name to store data in.
    * @param {Object|string|number|boolean} value The value to store.
    * @return {boolean} true if the data was saved correctly, false otherwise.
    */
    RAL.NullStorage.prototype.setForKey = function (key, value) {
        !RELEASE && window.console && window.console.log('No storage support!');

        return true;
    };

    /**
    * Gets the value associated with the given key.
    *
    * @private
    * @param {string} key The key name to fetch data for.
    * @return {Object|string|number|boolean|null} the associated data, or null
    *         if the key is not present.
    */
    RAL.NullStorage.prototype.getForKey = function (key) {
        !RELEASE && window.console && window.console.log('No storage support!');

        return null;
    };

    /**
    * Removes data associated with the given key, if present.
    *
    * @private
    * @param {string} key The key name to remove.
    */
    RAL.NullStorage.prototype.removeKey = function (key) {
        !RELEASE && window.console && window.console.log('No storage support!');
    };

    /**
    * Removes all keys from the Null storage area.
    *
    * @private
    */
    RAL.NullStorage.prototype.clear = function () {
        !RELEASE && window.console && window.console.log('No storage support!');
    };

    /**
    * Checks for the existence of a given key.
    *
    * @private
    * @param {string} key The key name to check.
    * @return {boolean} true if the key exists, false otherwise.
    */
    RAL.NullStorage.prototype.hasKey = function (key) {
        !RELEASE && window.console && window.console.log('No storage support!');

        return false;
    };

    /**
    * RAM-based storage, used either when the browser does not accept cookies,
    * and if there is no local storage but data should be still logged.
    *
    * @private
    * @see RAL.OfflineStorage
    * @implements {RAL.OfflineStorage}
    * @constructor
    */
    RAL.RamStorage = function () {
        /** @type {Object} */
        this._container = {};
    };

    /**
    * Sets the given key with the given data in the offline storage area.
    *
    * @private
    * @param {string} key The key name to store data in.
    * @param {Object|string|number|boolean} value The value to store.
    * @return {boolean} true if the data was saved correctly, false otherwise.
    */
    RAL.RamStorage.prototype.setForKey = function (key, value) {
        this._container[key] = value;
        return true;
    };

    /**
    * Gets the value associated with the given key.
    *
    * @private
    * @param {string} key The key name to fetch data for.
    * @return {Object|string|number|boolean|null} the associated data, or null
    *         if the key is not present.
    */
    RAL.RamStorage.prototype.getForKey = function (key) {
        return (key in this._container) ? this._container[key] : null;
    };

    /**
    * Removes data associated with the given key, if present.
    *
    * @private
    * @param {string} key The key name to remove.
    */
    RAL.RamStorage.prototype.removeKey = function (key) {
        if (key in this._container) {
            delete this._container[key];
        }
    };

    /**
    * Removes all keys from the offline storage area.
    *
    * @private
    */
    RAL.RamStorage.prototype.clear = function () {
        this._container = {};
    };

    /**
    * Checks for the existence of a given key.
    *
    * @private
    * @param {string} key The key name to check.
    * @return {boolean} true if the key exists, false otherwise.
    */
    RAL.RamStorage.prototype.hasKey = function (key) {
        return key in this._container;
    };

    /////////////////////////////////////////////////////////////////////


    /**
    * Tracking object vacuum callback.
    *
    * If tracking data is not being spooled out quickly enough and keeps
    * piling up, this callback will be invoked to make sure that less valuable
    * records can be safely discarded.
    *
    * The callback signals whether records can be kept or not by returning
    * true to mark the record as valuable, and false to mark the record as
    * discardable.
    *
    * @name RAL._vacuumCallback
    * @function
    * @param {Object} object The object to check whether it is worthwhile to
    *                 keep around or not.
    * @return {boolean} true if the object should be kept around, false if
    *                   it is to be removed.
    */

    /**
    * RAL.Library constructor.
    *
    * @param {!string} url The URL to use as the receiver base for analytics
    *        data.
    * @param {string=} storageKey Optional unique identifier for the given
    *        Rakuten service.
    * @param {function(Object):boolean=} vacuumCallback Optional callback
    *        invoked whenever tracked data takes too much memory, in order
    *        to have a more precise cleanup process to keep valuable data.
    * @constructor
	* @expose
    */
    RAL.Library = function (url, storageKey, vacuumCallback) {
        // URL is mandatory.

        /** @type {?string} */
        var baseUrl = RAL._trimString(url);
        if (!baseUrl) {
            throw 'Missing URL!';
        }

        /** @type {string} */
        this._baseUrl = baseUrl;
        /** @type {boolean} */
        this._isOnline = true;
        /** @type {Object} */
        this._parameters = new RAL.ParametersContainer();
        this._parameters.insert(RAL.ParameterTypes.SCRIPT_START_TIME,
        this._getTimestamp());
        /** @type {Object} */
        this._storage = this._getStorageProvider();
        /** @type {?Object} */
        this._currentLocation = null;
        /** @type {number} */
        this._reportingInterval = RAL._DEFAULT_ANALYTICS_INTERVAL;
        /** @type {string} */
        this._storageKey = storageKey || RAL._OFFLINE_STORAGE_KEY;
        /** @type {number} */
        this._recordsCount = 0;
        /** @type {function(Object):boolean} */
        this._vacuumCallback = vacuumCallback || function (record) {
            return true;
        };
        /** @type {Array.<string>} */
        this._itemId = [];
        /** @type {Array.<number>} */
        this._itemPrice = [];
        /** @type {Array.<number>} */
        this._itemQuantity = [];
        
        // Internet Explorer has a 2048 characters limit for URLS, as per
        // http://support.microsoft.com/kb/208427/en-us

        /** @type {number} */
        this._bulkRawRequestSizeThreshold = 2048 - (this._baseUrl.length +
      RAL._GET_RAW_REQUEST_PARAMETER.length);
        /** @type {?Array.<Element>} */
        this._bulkUploadsIframe = null;
        /** @type {boolean} */
        this._canDoXhrBulkUploads = !this._isInternetExplorer6();

        // Set up the record counter at startup.
        if (this._storage.hasKey(this._storageKey)) {
            /** @type {string} */
            var data = this._storage.getForKey(this._storageKey);
            if (data !== '') {
                this._recordsCount = data.split('\t').count;
            }
        }

        // Hook up the online/offline event handlers.
        if (document.body) {
            var thisObject = this;
            document.body.ononline = thisObject._callbackBinder(this._onlineListener, thisObject, [thisObject]);
            document.body.onoffline = thisObject._callbackBinder(this._onlineListener, thisObject, [thisObject]);
        }
    };

    /**
    * Create a new function from the provided <code>fn</code>, change <code>this</code> to the provided scope, optionally
    * overrides arguments for the call. (Defaults to the arguments passed by the caller)
    * reference http://stackoverflow.com/questions/6698720/passing-parameter-to-invoked-event-handler-i-e-element-onchange-javascript
    * change has been done to fetch window.event in case arguments is not an array with length more than 0
    *
    * @private
    * @param {Function} fn The function to delegate.
    * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
    * <b>If omitted, defaults to the browser window.</b>
    * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
    * @return {Function} The new function
    */
    RAL.Library.prototype._callbackBinder = function (fn, scope, args) {
        /** @type {object} */
        var method = fn;

        return function () {
            /** @type {Array} */
            var callArgs = args || arguments;

            // IE does not send a domEvent so the event has to be captured from window.event
            callArgs = Array.prototype.slice.call(arguments[0] ? arguments : [window.event], 0);
            callArgs = callArgs.concat(args);
            return method.apply(scope || window, callArgs);
        };
    };

    /**
    * Attempts to remove less important data from the list of tracked events.
    *
    * @private
    * @param {string} data The data to clean up.
    * @return {?string} a string with the cleaned up records already joined
    *                   together, or null if no cleanup action can be done.
    */
    RAL.Library.prototype._vacuum = function (data) {
        if ((!this._vacuumCallback) || (data === null) || (data === '')) {
            return null;
        }

        /** @type {Array.<string>} */
        var output = [];
        /** @type {Array.<string>} */
        var records = data.split('\t');

        /** @type {number} */
        var index;

        for (index = 0; index < records.length; index++) {
            /** @type {string} */
            var record = records[index];

            if (this._vacuumCallback(JSON.parse(record))) {
                output.push(record);
            }
        }

        return output.join('\t');
    };

    /**
    * Checks if HTML Local Storage is available.
    *
    * @private
    * @return {boolean} true if local storage is available, false otherwise.
    */
    RAL.Library.prototype._hasLocalStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (exception) {
            return false;
        }
    };

    /**
    * Returns an appropriate offline storage provider to store tracking data.
    *
    * TODO: Force skipping cookie support if requested (check new UK privacy
    *       laws requiring informed consent before using cookies, and see if
    *       that also applies for local storage too).
    *
    * @private
    * @return {Object} a suitable storage provider.
    */
    RAL.Library.prototype._getStorageProvider = function () {
        if (this._hasLocalStorage()) {
            !RELEASE && window.console && window.console.log(
                'Using HTML Local Storage for offline data');
            return new RAL.LocalStorage();
        }

        if (!RAL._testCookieSupport()) {
            !RELEASE && window.console && window.console.log(
                'Not storing any offline data, browser does not accept cookies');
            return new RAL.NullStorage();
        }

        !RELEASE && window.console && window.console.log(
            'Using document cookies for offline data');
        return new RAL.CookieStorage();
    };

    /**
    * Returns an appropriate XMLHttpRequest object for the
    * browser in use.
    *
    * If the browser in use is too old (earlier than IE6) or does not support
    * XMLHttpRequest calls, then null is returned.
    *
    * @private
    * @param {string} requestType 'GET' or 'POST' .
    * @return {?Object} the resulting XMLHttpRequest object or null.
    */
    RAL.Library.prototype._getXHRProvider = function (requestType) {

        /** @type {string} */
        var baseUrl = this._baseUrl;

        //Set the content-type in the request header
        /** @type {function} 
        * @private
        * @param {Object} requestObject XDomain,XMLHttpRequest or ActiveXObject
        * @param {?bool} setContentType true if content-type is set in the request header
        * 
        * */
        var setRequestHeader = function (reqObject, setContentType) {
            if (requestType === 'POST') {
                reqObject.open(requestType, baseUrl);
                if (setContentType) {
                    reqObject.setRequestHeader('Content-type',
                        'application/x-www-form-urlencoded; charset=utf-8');
                }
            }
        }

        if (window.XDomainRequest) {
            !RELEASE && window.console && window.console.log(
                'Using XDomainRequest, this is either IE 8 or 9');
            var XDRObject = new XDomainRequest();
            // to maintain consistency 
            setRequestHeader(XDRObject);
            return XDRObject;
        }

        if (window.XMLHttpRequest) {
            !RELEASE && window.console && window.console.log(
                'Using W3C XMLHttpRequest');
            var XHRObject = new XMLHttpRequest();
            setRequestHeader(XHRObject, true);
            return XHRObject;
        }

        // This is the preferred way to get an XMLHttpRequest object from IE6,
        // from http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx

        if (window.ActiveXObject) {
            try {
                !RELEASE && window.console && window.console.log(
                    'Using MSXML2.XMLHTTP.3.0 ActiveX object');
                var AXObject = new ActiveXObject('MSXML2.XMLHTTP.3.0');
                setRequestHeader(AXObject, true);
                return AXObject;
            } catch (exception) {
                !RELEASE && window.console && window.console.log(
                    'MSXML2.XMLHTTP.3.0 not found: ' + exception.toString());
            }
        }

        // TODO: See if it makes sense to patch window.XMLHttpRequest with:
        // window.XMLHttpRequest = function() {
        //   try {
        //     return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        //   } catch (exception) {
        //     return null;
        //   }
        // };

        // On Internet Explorer, it is possible to disable XMLHttpRequest support
        // via the control panel.  In this case we can either patch
        // window.XMLHttpRequest with an empty implementation or just return null
        // and hope for the best.  Let's return null for the time being and see...

        !RELEASE && window.console && window.console.log(
            'No XMLHttpRequest providers found!');
        return null;
    };

    /**
    * Checks if the given value is made up of latin letters.
    *
    * @private
    * @param {string} value The value to check.
    * @return {boolean} true if only letters were found, false otherwise.
    */
    RAL.Library.prototype._isAlphabetic = function (value) {
        return (typeof value === 'string') && (value !== null) &&
            /^[a-zA-Z]+$/.test(value);
    };

    /**
    * Checks if the given value is made up of latin letters and numbers.
    *
    * @private
    * @param {string} value The value to check.
    * @return {boolean} true if only letters and numbers were found,
    *                   false otherwise.
    */
    RAL.Library.prototype._isAlphanumeric = function (value) {
        return (typeof value === 'string') && (value !== null) &&
            /^[0-9a-zA-Z]+$/.test(value);
    };

    /**
    * Checks if the given value is made up of numbers or is numeric.
    *
    * @private
    * @param {string|number} value The value to check.
    * @return {boolean} true if only numbers were found or is numeric,
    *                   false otherwise.
    */
    RAL.Library.prototype._isNumeric = function (value) {
        /** @type {number} */
        var number = parseInt(value, 10);
        //We are checking number == value because input to this function may be string
        return !isNaN(number) && (number > 0) && number == value;
    };

    /**
    * Checks if the given value is an object.
    *
    * @private
    * @param {object} value The value to check.
    * @return {boolean} true if object,
    *                   false otherwise.
    */
    RAL.Library.prototype._isObject = function (value) {
        return (typeof (value) === 'object');
    };

    /**
    * Sets the account id field.
    *
    * @param {string|number} accountId The account ID field to set.
    * @expose	
    */
    RAL.Library.prototype.setAccountId = function (accountId) {
        if (this._isNumeric(accountId)) {
            this._parameters.insert(RAL.ParameterTypes.ACCOUNT_ID, parseInt(accountId,10));
        }
    };

    /**
    * Sets the character set field.
    *
    * @param {string} charSet The character set field to set.
    * @expose	
    */
    RAL.Library.prototype.setCharSet = function (charSet) {
        if (!this._isObject(charSet) && (charSet !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.CHARSET, charSet + '');
        }
    };

    /**
    * Sets the referrer.
    *
    * If the given referrer is not a string or is empty, the current
    * document's referrer will be set if available.
    *
    * @param {?string} referrer The referrer to set.
	* @expose
    */
    RAL.Library.prototype.setReferrer = function (referrer) {
        if ((typeof referrer === 'string') && referrer !== '') {
            this._parameters.insert(RAL.ParameterTypes.REFERRER, referrer);
        } else if (document.referrer !== 'undefined') {
            this._parameters.insert(RAL.ParameterTypes.REFERRER, document.referrer);
        }
    };

    /**
    * Sets the goal id field.
    *
    * @param {string} goalId The goal id to set.
    * @expose		
    */
    RAL.Library.prototype.setGoalId = function (goalId) {
        if (!this._isObject(goalId) && (goalId !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.GOAL_ID, goalId + '');
        }
    };

    /**
    * Sets the affiliate id field.
    *
    * @param {number} affiliateId The affiliate id to set.
    * @expose		
    */
    RAL.Library.prototype.setAffiliateId = function (affiliateId) {
        if (!this._isObject(affiliateId)) {
            this._parameters.insert(RAL.ParameterTypes.AFFILIATE_ID, parseInt(affiliateId, 10));
        }
    };

    /**
    * Checks if Java(tm) is enabled.
    *
    * @private
    * @return {boolean} true if enabled, false otherwise.
    */
    RAL.Library.prototype._isJavaEnabled = function () {
        if (!navigator.mimeTypes) {
            return false;
        }

        /** @type {number} */
        var index;

        for (index = 0; index < navigator.mimeTypes.length; index++) {
            if ((navigator.mimeTypes[index].type.match(
                /^application\/x-java-applet;jpi-version=(.*)$/)) !== null) {
                return true;
            }
        }

        return false;
    };

    /**
    * Sets the service id field.
    *
    * @param {number} serviceId The service id to set.
    * @expose		
    */
    RAL.Library.prototype.setServiceId = function (serviceId) {
        if (this._isNumeric(serviceId)) {
            this._parameters.insert(RAL.ParameterTypes.SERVICE_ID, parseInt(serviceId,10));
        }
    };

    /**
    * Sets the itemID field from the given values.
    *
    * @param {string} itemId of the item to be added
    * @expose	
    */
    RAL.Library.prototype.addItemId = function (itemId) {
    	//Remove the leading and trailing white spaces from the itemId
    	itemId = (typeof itemId === 'string') ?  itemId.replace(/^\s+|\s+$/g, '') : itemId;
        if(!this._isObject(itemId) && itemId !== null && itemId !== undefined  && itemId !== ''){
            //Converting to string if number is passed
            /** @type {string} */
            var item_id = itemId + '';
            this._itemId.push(item_id);
            this._parameters.insert(RAL.ParameterTypes.ITEM_ID, this._itemId);
            !RELEASE && window.console && window.console.log(
                'Item Id set to ' + this._parameters.get(RAL.ParameterTypes.ITEM_ID));
        }
         
    }
     
    /**
    * Sets the itemID field from the given values.
    *
    * @param {number|string} itemQuantity of the items to be added
    * @expose	
    */
    RAL.Library.prototype.addItemQuantity = function (itemQuantity) {
         
        if(this._isNumeric(itemQuantity)){
            /** @type {number} */
            var quantity = parseInt(itemQuantity, 10);
            this._itemQuantity.push(quantity);
            this._parameters.insert(RAL.ParameterTypes.ITEM_QUANTITY, this._itemQuantity);
            !RELEASE && window.console && window.console.log(
                'Item Quantity set to ' + this._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY));
        }
    }     
    
    
    /**
    * Sets the price field from the given values.
    *
    * @param {number|string} number price without the decimal point
    * @param {number=|string=} decimalPlaces from the right
    * @expose		
    */
    RAL.Library.prototype.addItemPrice = function (number, decimalPlaces) {

        // handles undefined, null, alphanumeric and blank
        if (number === undefined || number === null || isNaN(number) ||
        isNaN(parseInt(number), 10)) {

            !RELEASE && window.console && window.console.log(
                'Invalid whole price "' + number + '"');
            return;
        }

        /** @type {number} */
        var wholePrice = parseInt(number, 10);
        /** @type {number} */
        var decimal = 0;

        if (decimalPlaces !== undefined) {
            if (decimalPlaces === null || isNaN(decimalPlaces) || isNaN(parseInt(decimalPlaces, 10))) {
                !RELEASE && window.console && window.console.log(
                    'Invalid decimal places "' + decimalPlaces + '"');
                return;
            }
            decimal = parseInt(decimalPlaces, 10);
        }

        //Negative values of decimal are ignored
        decimal = (decimal < 0) ? 0 : decimal;

        /** @type {number} */
        var priceToSet = wholePrice * Math.pow(10, -decimal);
        
        this._itemPrice.push(priceToSet);
        this._parameters.insert(RAL.ParameterTypes.ITEM_PRICE, this._itemPrice);

        !RELEASE && window.console && window.console.log(
            'Price set to ' + this._parameters.get(RAL.ParameterTypes.ITEM_PRICE));

    };


    /**
    * Sets the version field.
    *
    * @param {string} version The version number to set.
    * @expose		
    */
  RAL.Library.prototype.setVersion = function (version) {
      if (!this._isObject(version) && (version !== undefined)) {
        this._parameters.insert(RAL.ParameterTypes.VERSION, version + '');
      }
  };

    /**
    * Sets the currency code.
    *
    * if the given currency code is not a string or is shorter than 3
    * characters then the internal currency code will be set to an empty
    * string.
    *
    * @param {string} code The currency code to set.
	* @expose
    */
    RAL.Library.prototype.setCurrencyCode = function (code) {
        if (typeof code === 'string' && code !== '' && code.length >= 3 &&
        this._isAlphabetic(code)) {
            this._parameters.insert(RAL.ParameterTypes.CURRENCY, code.substr(0, 3));
        }
    };

    /**
    * Sets the search query.
    *
    * @param {string} searchQuery The search query string to set.
	* @expose
    */
    RAL.Library.prototype.setSearchQuery = function (searchQuery) {
        if (!this._isObject(searchQuery)&& (searchQuery !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.SEARCH_QUERY, searchQuery + '');
        }
    };

    /**
    * Sets the content language.
    *
    * @param {string} contentLanguage The content language to set.
	* @expose
    */
    RAL.Library.prototype.setContentLanguage = function (contentLanguage) {
        if (!this._isObject(contentLanguage) && (contentLanguage !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.CONTENT_LANGUAGE,
                contentLanguage + '');
        }
    };

    /**
    * Sets the alphanumeric campaign code.
    *
    * @param {string} campaignCode The campaign code to set.
	* @expose
    */
    RAL.Library.prototype.setCampaignCode = function (campaignCode) {
        if (this._isAlphanumeric(campaignCode)) {
            this._parameters.insert(RAL.ParameterTypes.CAMPAIGN_CODE, campaignCode);
        }
    };

    /**
    * Sets the check points field.
    *
    * @param {number} checkPoints The check points field value to set.
	* @expose
    */
    RAL.Library.prototype.setCheckPoints = function (checkPoints) {
        if (!isNaN(parseInt(checkPoints, 10))) {
            this._parameters.insert(RAL.ParameterTypes.CHECKPOINTS, parseInt(checkPoints, 10));
        }
    };

    /**
    * Sets the checkout status field.
    *
    * @param {number} checkout The checkout value to set.
	* @expose
    */
    RAL.Library.prototype.setCheckout = function (checkout) {
        if(this._isNumeric(checkout)){
            /** @type {number} */
            var value = parseInt(checkout, 10);
        
            switch (value) {
                case 10: // Fallthrough
                case 20: // Fallthrough
                case 30: // Fallthrough
                case 40: // Fallthrough
                case 50: // Fallthrough
                this._parameters.insert(RAL.ParameterTypes.CHECKOUT, value);
                break;

                default:
                    !RELEASE && window.console && window.console.log('Invalid checkout ' +
                        checkout);
            }
        }
    };

    /**
    * Sets the request result field.
    *
    * @param {string} requestResult The request result value to set.
	* @expose
    */
    RAL.Library.prototype.setRequestResult = function (requestResult) {
        if (!this._isObject(requestResult) && (requestResult !== undefined) ) {
            this._parameters.insert(RAL.ParameterTypes.REQUEST_RESULT, requestResult + '');
        }
    };

    /**
    * Gets the current timestamp in string format.
    *
    * @private
    * @return {string} The current timestamp.
    */
    RAL.Library.prototype._getTimestamp = function () {
        /** @type {Object} */
        var today = new Date();
        /** @type {number} */
        var month = today.getMonth() + 1;
        /** @type {number} */
        var day = today.getDate();
        /** @type {number} */
        var hours = today.getHours();
        /** @type {number} */
        var minutes = today.getMinutes();
        /** @type {number} */
        var seconds = today.getSeconds();

        return today.getFullYear() + '-' +
            (month < 10 ? '0' : '') + month + '-' +
            (day < 10 ? '0' : '') + day + ' ' +
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    };

    /**
    * Sets the page name field.
    *
    * @param {string} pageName The page name to set.
    * @expose
    */
    RAL.Library.prototype.setPageName = function (pageName) {
        if (!this._isObject(pageName) && (pageName !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.PAGE_NAME, pageName + '');
        }
    };

    /**
    * Sets the page type field.
    *
    * @param {string} pageType The page type to set.
	* @expose
    */
    RAL.Library.prototype.setPageType = function (pageType) {
        if (!this._isObject(pageType) && (pageType !== undefined)) {
            this._parameters.insert(RAL.ParameterTypes.PAGE_TYPE, pageType + '');
        }
    };

    /**
    * Sets the genre field.
    *
    * @param {string} genre The genre field to set.
	* @expose
    */
    RAL.Library.prototype.setGenre = function (genre) {
        if (!this._isObject(genre)) {
            this._parameters.insert(RAL.ParameterTypes.GENRE, genre);
        }
    };


    /**
    * Sets the custom parameters.
    *
    * If objects get passed to this function, they will be merged with the
    * internal custom parameters object definition.  If anything else gets
    * passed to it, then the internal custom parameters object will be set
    * to what has been passed.
    *
    * @param {!Object} customParameters The custom parameters to set.
	* @expose
    */
    RAL.Library.prototype.setCustomParameters = function (customParameters) {
        if (customParameters) {
            /** @type {Object} */
            var data = customParameters;

            if (this._parameters.hasKey(RAL.ParameterTypes.CUSTOM)) {
                /** @type {Object} */
                var oldData = this._parameters.get(RAL.ParameterTypes.CUSTOM);
                if (RAL._mergeDictionaries(oldData, customParameters)) {
                    data = oldData;
                }
            }

            this._parameters.insert(RAL.ParameterTypes.CUSTOM, data);
        }
    };

    /**
    * Sets the item count per product.
    *
    * @param {Array.<number>} itemsCount The items count to set.
    * @expose
    */
    RAL.Library.prototype.setItemsCount = function (itemsCount) {
        this._parameters.insert(RAL.ParameterTypes.ITEMS_COUNT, itemsCount);
    };

    /**
    * Sets the list of shown items.
    *
    * @param {Array.<number>} itemsList The list of shown items.
    * @expose
    */
    RAL.Library.prototype.setViewImpressions = function (itemsList) {
        this._parameters.insert(RAL.ParameterTypes.VIEW_IMPRESSIONS, itemsList);
    };

    /**
    * Merges the given parameters array with the current analytics parameters
    * set, overwriting old values.
    *
    * @param {Object} parameters The parameters to merge.
    * @expose
    */
    RAL.Library.prototype.setParameters = function (parameters) {
        this._parameters.merge(parameters);
    };

    /**
    * Merges the given parameters array with the current analytics parameters
    * set, converting existing elements into arrays and appending the current
    * value.
    *
    * New keys will be added to the parameters list in different forms,
    * depending of the incoming data type.  Arrays and objects are added to
    * the parameters list as they are, while any other valid type (string,
    * boolean, number) will be added to the parameter as an array with just
    * one element - the latter being the value to set in the first place.
    *
    * @param {Object} parameters The parameters to merge.
    * @expose
    */
    RAL.Library.prototype.appendParameters = function (parameters) {
        if ((typeof parameters !== 'object') || (parameters === {})) {
            !RELEASE && window.console && window.console.log(
                'Invalid object type or empty object!');
            return;
        }

        /** @type {string} */
        var key;

        for (key in parameters) {
            if (this._parameters.hasKey(key)) {
                /** @type {boolean|number|string|Object} */
                var data = this._parameters.get(key);
                if (typeof data !== 'object') {
                    data = [];
                }

                this._parameters.insert(key, [].concat(data).concat(parameters[key]));
            } else {
                if (typeof parameters[key] === 'object') {
                    this._parameters.insert(key, parameters[key]);
                } else {
                    this._parameters.insert(key, [parameters[key]]);
                }
            }
        }
    };

    /**
    * Checks if the request is internal.
    *
    * @private
    * @return {boolean} true if it is, false otherwise.
    */
    RAL.Library.prototype._isRequestInternal = function () {
        return window.navigator.userAgent &&
            window.navigator.userAgent.match(/RAL/i);
    };

    /**
    * Checks the Adobe Flash(tm) plugin version and sets it into
    * the parameter array.
    *
    * This will be turned into a static getter in the next release.
	* @expose
    */
    RAL.Library.prototype.detectFlashVersion = function () {
        if (!document.images) {
            return;
        }

        /** @type {?string} */
        var flashVersion = null;
        /** @type {boolean} */
        var hasFlash = false;
        /**
        * @const
        * @type {string}
        */
        var flashMimeTypeStr = 'application/x-shockwave-flash';

        if (navigator.mimeTypes && navigator.mimeTypes[flashMimeTypeStr]) {
            var flashMimeType = navigator.mimeTypes[flashMimeTypeStr];
            if (flashMimeType.enabledPlugin &&
          flashMimeType.enabledPlugin.description) {
                flashVersion = flashMimeType.enabledPlugin.description;
                hasFlash = true;
            }
        } else if (navigator.plugins && ('Shockwave Flash' in navigator.plugins)) {
            /** @type {Object} */
            var plugin = navigator.plugins['Shockwave Flash'];
            flashVersion = plugin.description.match(/[\d]+/g).join('.');
            hasFlash = true;
        }

        try {
            if (!hasFlash) {
                /** @type {Object} */
                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                flashVersion = axo.GetVariable('$version');
            }
        } catch (exception) {
            !RELEASE && window.console && window.console.log(
                'Unable to detect Adobe Flash(tm) version: ' + exception.toString());
        }

        this._parameters.insert(RAL.ParameterTypes.FLASH_VERSION, flashVersion);
    };

    /**
    * Returns the session cookie.
    *
    * @private
    * @return {?string} The session cookie value or null if not found.
    */
    RAL.Library.prototype._getSessionCookie = function () {
        return RAL._getCookie('RAL_S');
    };

    /**
    * Returns the persistent cookie.
    *
    * @private
    * @return {?string} The persistent cookie value or null.
    */
    RAL.Library.prototype._getPersistentCookie = function () {
        return RAL._getCookie('RAL_P');
    };

    /**
    * Returns the browser language or a fallback code if it was not
    * be possible to fetch that information.
    *
    * @private
    * @return {string} the browser language string.
    */
    RAL.Library.prototype._getBrowserLanguage = function () {
        if (!navigator.browserLanguage) {
            if (!navigator.language) {
                return RAL._UNKNOWN_BROWSER_LANGUAGE;
            }

            return navigator.language;
        }

        return navigator.browserLanguage;
    };

    /**
    * Checks if the browser in use is Internet Explorer 6.
    *
    * This uses the preferred way to detect Internet Explorer 6 according to
    * http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
    *
    * @private
    * @return {boolean} true if the browser is Internet Explorer 6,
    *                   false otherwise.
    */
    RAL.Library.prototype._isInternetExplorer6 = function () {
        if (navigator.appName === 'Microsoft Internet Explorer') {
            /** @type {Object} */
            var regexp = /MSIE ([0-9]{1,}[\.0-9]{0,})/;
            /** @type {Object} */
            var result = navigator.userAgent.match(regexp);
            if (result !== null) {
                /** @type {number} */
                var version = parseFloat(result[1]);

                // Misleading, but we consider anything less than 7.0 as IE6
                return (!isNaN(version) && (version < 7.0));
            }
        }

        return false;
    };

    /**
    * This function is used to set tab name if it is not set already and returns the tab name.
    * 
    * @private
    * @return {string} window name
    */
    RAL.Library.prototype._getTabName = function () {
        if (!window.name) {
            window.name = this._GUID();
        }
        return window.name;
    };

    /**
    * function to create a unique identifier to be used as tab name
    * 
    * @private
    * @see _getTabName
    * @return {string} the generated string 
    */
    RAL.Library.prototype._GUID = function () {

        /** @type {string} */
        var value = Math.floor(Math.random() * 0x10000).toString(16);
        return String(value) + String((value * 17) & 0xFFFF);
    };

    /**
    * Adds the current set of parameters to the queue.
    * @expose
    */
    RAL.Library.prototype.pageViewEvent = function () {
        // Don't skew statistics
        if (this._isRequestInternal()) {
            !RELEASE && window.console && window.console.log('Internal request');
            return;
        }

        // Programmatic refresh?
        if ((document.location.href.length > 0) &&
        (document.location.href === document.referrer)) {
            !RELEASE && window.console && window.console.log('Programmatic refresh');
            return;
        }

        // Is there any collected data?

        if ((!this._parameters.hasKey(RAL.ParameterTypes.ACCOUNT_ID) ||
          !this._parameters.hasKey(RAL.ParameterTypes.SERVICE_ID)) &&
        this._storage.getForKey(this._storageKey) === null) {
            !RELEASE && window.console && window.console.log('No data collected');
            return;
        }

        // Fill transient data fields.

        this._parameters.insert(RAL.ParameterTypes.TAB_ID,
            this._getTabName());
        this._parameters.insert(RAL.ParameterTypes.TIMEZONE,
            -(new Date().getTimezoneOffset() / 60));
        this._parameters.insert(RAL.ParameterTypes.RESOLUTION,
            window.screen.width + 'x' + window.screen.height);
        this._parameters.insert(RAL.ParameterTypes.JAVA_PRESENT,
        this._isJavaEnabled());
        this._parameters.insert(RAL.ParameterTypes.BROWSER_LANGUAGE,
        this._getBrowserLanguage());
        this._parameters.insert(RAL.ParameterTypes.SESSION_COOKIE,
        this._getSessionCookie());
        this._parameters.insert(RAL.ParameterTypes.PERSISTENT_COOKIE,
        this._getPersistentCookie());
        this._parameters.insert(RAL.ParameterTypes.USER_AGENT,
            navigator.userAgent);
        this._parameters.insert(RAL.ParameterTypes.ONLINE_STATUS,
        this._isOnline);
        this._parameters.insert(RAL.ParameterTypes.TIMESTAMP,
        this._getTimestamp());
        if (this._currentLocation === null || this._currentLocation === {}) {
            this._parameters.remove(RAL.ParameterTypes.LOCATION);
        } else {
            this._parameters.insert(RAL.ParameterTypes.LOCATION,
                this._currentLocation);
        }
    };

    /**
    * Checks if the current offline data blob requires bulk upload support.
    *
    * The offline data blob can be sent via single GET requests if it only
    * contains one record, and said record length fits into 2048 characters
    * once escaped and appended to the final URL.
    *
    * @private
    * @return {boolean} true if the offline data blob can only be sent via
    *                   bulk upload.
    */
    RAL.Library.prototype._needsBulkUpload = function () {
        if (!this._canDoXhrBulkUploads) {
            return false;
        }

        /** @type {string} */
        var records = this._storage.getForKey(this._storageKey);
        if (!records) {
            !RELEASE && window.console &&
        window.console.log('No records to upload');
            return false;
        }

        /** @type {Array.<string>} */
        var data = records.split('\t');
        if (data.length > 1) {
            return true;
        }

        return encodeURIComponent(data[0]).length <
      this._bulkRawRequestSizeThreshold;
    };

    /**
    * Sends the given record to the analytics server via a GET request.
    *
    * If the data does not fit in a GET request, then the function will
    * still attempt to send the data but either fail at it or report a success
    * code without sending any data.  This is most common on Internet
    * Explorer 6, as there is no XMLHttpRequest POST support and there is a
    * hard limit on the maximum number of characters in a GET request.
    *
    * @private
    * @param {string} data The data to send.
    * @return {boolean} true if the data was successfully sent or false
    *                   otherwise.
    */
    RAL.Library.prototype._sendSingleRecord = function (data) {
        try {
            /** @type {?Object} */
            var xhr = this._getXHRProvider('GET');
            if (xhr) {
                /** @type {string} */
                var dataToSend = this._baseUrl + RAL._GET_RAW_REQUEST_PARAMETER + encodeURIComponent(data);
                //Random number is sent in the GET request since XDomain is not able to  send two exactly same request
                //This happens in IE browser when two exactly same data is sent within the same second 
                if (window.XDomainRequest) {
                    dataToSend = dataToSend + '&rndNum=' + (new Date()).getTime();
                }
                xhr.open('GET', dataToSend);
                xhr.send('');
            } else {
                !RELEASE && window.console && window.console.log(
                    'No XMLHttpRequest support, removing data');
            }
        } catch (networkError) {
            !RELEASE && window.console && window.console.log(
                'Single item upload failed: ' + networkError.toString());
            return false;
        }

        return true;
    };

    /**
    * Sends the given set of records to the analytics server via a POST
    * request.
    *
    * @private
    * @param {Array.<string>} data The records to send.
    * @return {boolean} true if the data was successfully sent, false otherwise.
    */
    RAL.Library.prototype._sendMultipleRecords = function (data) {
        try {
            /** @type {?Object} */
            var xhr = this._getXHRProvider('POST');
            if (xhr) {
                //When special characters '%' and '&' are part of the Post request, 
                //the output at the server is skewed. Hence the data needs to be encoded,
                //based on the content-type set in the request header.
                //The content-type for XDomain is text plain, hence the data is not encoded
                /** @type {string} */
                var dataToSend = ('[' + data.join(',') + ']');
                // The content-type for XMLHttpRequest and ActiveXObject is 
                //'application/x-www-form-urlencoded; charset=utf-8'. Hence it needs to be url encoded    
                if (!window.XDomainRequest) {
                    dataToSend = encodeURIComponent(dataToSend);

                    !RELEASE && window.console && window.console.log(
                'Post request URI encoded');
                }
                xhr.send(RAL._POST_RAW_REQUEST_PARAMETER + dataToSend);

                !RELEASE && window.console && window.console.log(
                    'Bulk upload performed successfully');
            } else {
                !RELEASE && window.console && window.console.log(
                    'No XMLHttpRequest support, removing data');
            }
        } catch (networkError) {
            !RELEASE && window.console && window.console.log(
                'Bulk upload failed: ' + networkError.toString());
            return false;
        }

        return true;
    };

    /**
    * Workaround to perform an HTTP POST without sending the whole page.
    *
    * This is used for Internet Explorer 6 to work around the hard limit in
    * sending GET requests to locations longer than 2048 characters.
    *
    * Right now there is no way to know whether the POST actually succeeded,
    * so we assume everything works as expected once we get to the form
    * submission stage.
    *
    * @private
    * @param {Array.<string>} data The data to be sent.
    * @return {boolean} true if an attempt to send data was made, false
    *                   otherwise.
    */
    RAL.Library.prototype._sendMultipleRecordsIE6 = function (data) {
        if (!document.body) {
            !RELEASE && window.console && window.console.log(
                'Bulk upload failed: no BODY tag found!');
            return false;
        }

        if (!this._bulkUploadsIframe) {
            /** @type {string} */
            var tag = 'RAL' + String(Math.floor(Math.random() * 2147483648));

            /** @type {Element} */
            var form = document.createElement('form');
            form.target = tag;
            form.action = this._baseUrl;
            form.method = 'POST';

            /** @type {Element} */
            var input = document.createElement('input');
            input.type = 'hidden';
            //Remove the '=' from the RAL._POST_RAW_REQUEST_PARAMETER since it will be
            // automatically added by input.name.
            input.name = RAL._POST_RAW_REQUEST_PARAMETER.replace('=','');
            form.appendChild(input);
            
            /** @type {Element} */
            var iframe = document.createElement('<iframe name="' + tag + '">');
            iframe.id = tag;
            iframe.style.visibility = 'hidden';
            
            document.body.appendChild(form);
            document.body.appendChild(iframe);
            this._bulkUploadsIframe = [input, form];
        }

        // INPUT
        this._bulkUploadsIframe[0].value = '[' + data.join(',') + ']';

        // FORM
        this._bulkUploadsIframe[1].submit();

        return true;
    };

    /**
    * Sends a set of tracking records over to the analytics server,
    * incapsulating all the transport logic.
    *
    * @private
    * @param {Array.<string>} records The records to transfer.
    * @return {boolean} true if records have been sent successfully, false
    *                   otherwise.
    */
    RAL.Library.prototype._sendRecords = function (records) {
        if ((records === null) || (typeof records !== 'object') ||
            (records.length === 0)) {
            // No harm done, makes things simpler on the caller side.
            return true;
        }

        /** @type {boolean} */
        var readyForRemoval = true;

        // One single record, try to send it via GET if possible

        if (records.length === 1) {
            if (records[0].length < this._bulkRawRequestSizeThreshold) {
                readyForRemoval = this._sendSingleRecord(records[0]);
            } else {

                !RELEASE && window.console && window.console.log(
                    'Record too big to send via GET (' + records[0].length +
                    ' characters vs. ' + this._bulkRawRequestSizeThreshold +
                    ' characters max)');

                // Try to send it in a POST request

                readyForRemoval = this._canDoXhrBulkUploads ?
                    this._sendMultipleRecords(records) :
                    this._sendMultipleRecordsIE6(records);
            }
        } else {

            // Multiple records, try via POST if possible
            if (this._canDoXhrBulkUploads) {

                // Data is not preprocessed in this case
                readyForRemoval = this._sendMultipleRecords(records);
            } else {

                // There is no easy way to check the status of a form submission
                // so we assume things have gone smoothly here.

                this._sendMultipleRecordsIE6(records);
                readyForRemoval = true;
            }

            !RELEASE && readyForRemoval && window.console &&
                window.console.log('All items successfully sent');
        }

        return readyForRemoval;
    };

    /**
    * Spools data off to the server.
    *
    * @private
    */
    RAL.Library.prototype._spoolData = function () {
        /** @type {?string} */
        var serialized = this._parameters.serialize();
        /** @type {string} */
        var offlineData = this._storage.getForKey(this._storageKey);

        offlineData = (offlineData !== null) ? offlineData + '\t' : '';

        if (this._parameters.hasKey(RAL.ParameterTypes.ACCOUNT_ID) &&
        this._parameters.hasKey(RAL.ParameterTypes.SERVICE_ID)) {

            if ((this._recordsCount + 1) > RAL._RECORDS_LIMIT_COUNT) {
                !RELEASE && window.console && window.console.log(
                    'Too many records, vacuuming');
                offlineData = this._vacuum() || offlineData;
            }

            if ((serialized.length + offlineData.length) > RAL._RECORDS_LIMIT_TOTAL_SIZE) {
                !RELEASE && window.console && window.console.log(
                    'Data block too large, vacuuming');
                offlineData = this._vacuum() || offlineData;
            }

            /** @type {boolean} */
            var success = this._storage.setForKey(this._storageKey,
                offlineData + serialized);

            !success && !RELEASE && window.console && window.console.log(
                'Unable to save data to offline storage');
            if (success) {
                offlineData += serialized;
                this._parameters.clear();
                /* clear item vectors after successful submit */
                this._itemId = [];
                this._itemPrice = [];
                this._itemQuantity = [];
                serialized = null;
                this._recordsCount++;
            } else if (offlineData.substring(offlineData.length - 1) == '\t') {
                //Remove the trailing '\t' added to the offlineData
                offlineData = offlineData.substring(0, offlineData.length - 1);
            }
        }

        if (!this._isOnline) {
            return;
        }

        /** @type {Array.<string>} */
        var records = (offlineData !== null && offlineData !== '') ?
            offlineData.split('\t') : [];

        // If serialized is not cleared, it means it was not saved to the local
        // storage area, so we can still try to shoehorn that one in.
        if (serialized) {
            records.push(serialized);
        }

        // Only do a partial send if there are too many records to be sent
        // at once.

        if (records.length > RAL._RECORDS_CHUNK_LENGTH) {
            !RELEASE && window.console && window.console.log(
                'Too many records to send in one single operation (' +
                records.length + ' vs ' + RAL._RECORDS_CHUNK_LENGTH + ' maximum)');

            if (this._sendRecords(records.slice(0, RAL._RECORDS_CHUNK_LENGTH))) {

                // Transfer successful, remove old records
                records = records.slice(RAL._RECORDS_CHUNK_LENGTH);
                if (this._storage.setForKey(this._storageKey, records.join('\t'))) {
                    // Save successful
                    this._recordsCount = records.length;
                    !RELEASE && window.console && window.console.log(
                        'Old data successfully removed');
                } else {

                    // Unable to save new data, there might be duplicates for now.
                    !RELEASE && window.console && window.console.log(
                        'Unable to save data to offline storage');
                }
            } else {
                !RELEASE && window.console && window.console.log(
                    'Data transfer failed!');
            }
        } else {

            !RELEASE && window.console && window.console.log(
                'Record count threshold not crossed, sending all records in ' +
                'one go');

            // Send the whole lot and clear everything if successful
            if (this._sendRecords(records)) {

                // Transfer successful, remove all records
                this._storage.removeKey(this._storageKey);
                this._recordsCount = 0;
            } else {

                !RELEASE && window.console && window.console.log(
                    'Data transfer failed!');
            }
        }
    };

    /**
    * Callback for updating the online/offline status.
    *
    * @private
    * @param {Object?} domEvent DOM online event or null if on IE.
    */
    RAL.Library.prototype._onlineListener = function (domEvent) {
        domEvent = domEvent || window.event;
        this._isOnline = (domEvent.type === 'online');

        !RELEASE && window.console && window.console.log('Online status change: ' +
            (this._isOnline ? 'Online' : 'Offline'));
    };

    /***
    * Sets the location parameters like LATITUDE, LONGITUDE, ACCURACY, SPEED ALTITUDE etc.
    *
    * @private
    * @param {Object?} Position object
    */
    RAL.Library.prototype._setPosition = function (position) {
        this._currentLocation = {};
        this._currentLocation[RAL.ParameterTypes.LATITUDE] =
            position.coords.latitude;
        this._currentLocation[RAL.ParameterTypes.LONGITUDE] =
            position.coords.longitude;
        this._currentLocation[RAL.ParameterTypes.ACCURACY] =
            position.coords.accuracy;
        if (position.coords.speed) {
            this._currentLocation[RAL.ParameterTypes.SPEED] =
              position.coords.speed;
        }
        if (position.coords.altitude) {
            this._currentLocation[RAL.ParameterTypes.ALTITUDE] =
              position.coords.altitude;
        }
        if (position.coords.heading) {
            this._currentLocation[RAL.ParameterTypes.HEADING] =
              position.coords.heading;
        }
        if (position.coords.altitudeAccuracy) {
            this._currentLocation[RAL.ParameterTypes.ALTITUDE_ACCURACY] =
              position.coords.altitudeAccuracy;
        }
        this._currentLocation[RAL.ParameterTypes.GPS_TIMESTAMP] =
            position.timestamp;

        if (!RELEASE && window.console) {
            window.console.log('New GPS fix acquired');
            window.console.log('Timestamp: ' + position.timestamp);
            window.console.log('Latitude: ' + position.coords.latitude);
            window.console.log('Longitude: ' + position.coords.longitude);
            window.console.log('Accuracy: ' + position.coords.accuracy);
            window.console.log('Speed: ' +
                (position.coords.speed ? position.coords.speed : 'Unknown'));
            window.console.log('Altitude: ' +
                (position.coords.altitude ? position.coords.altitude : 'Unknown'));
            window.console.log('Heading: ' +
                (position.coords.heading ? position.coords.heading : 'Unknown'));
            window.console.log('Altitude accuracy: ' +
                (position.coords.altitudeAccuracy ?
                position.coords.altitudeAccuracy : 'Unknown'));
        }
    };

    /***
    * Callback when navigator.geolocation.getCurrentPosition returns an error
    * This function just logs the reason for the error
    * @private
    * @param {Object?} error details
    */
    RAL.Library.prototype._onPositionError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                {
                    !RELEASE && window.console && window.console.log(
                        'Permission denied when retrieving GPS fix: ' +
                        error.message);
                    break;
                }

            case error.POSITION_UNAVAILABLE:
                {
                    !RELEASE && window.console && window.console.log(
                        'Unable to get a valid GPS fix: ' + error.message);
                    break;
                }

            case error.TIMEOUT:
                {
                    !RELEASE && window.console && window.console.log(
                        'Timeout when getting a GPS fix: ' + error.message);
                    break;
                }

            default:
                {
                    !RELEASE && window.console && window.console.log(
                        'Unknown error code ' + error.code + ': ' + error.message);
                }
        }

    };

    /**
    * Requests a GPS fix from the browser if geolocation support is enabled.
    *
    * The previous GPS fix information will be lost upon a successful request.
    * @expose
    */
    RAL.Library.prototype.getLocation = function () {
        if (navigator.geolocation) {
            this._currentLocation = null;
            var thisObject = this;
            // binding the _setPosition function since it uses this object, _onPositionError does not need a bind
            navigator.geolocation.getCurrentPosition((thisObject._callbackBinder(this._setPosition, thisObject, [thisObject])),
                this._onPositionError);
        } else {
            !RELEASE && window.console && window.console.log(
                'GPS GeoLocation is not available!');
        }
    };

    /**
    * Sets the amount of time to wait between queue processing operations.
    *
    * @param {number} interval The amount of milliseconds to wait.
    * @expose
    */
    RAL.Library.prototype.setReportingInterval = function (interval) {
        /** @type {number} */
        var newInterval = parseInt(interval, 10);
        if (!isNaN(newInterval) && (newInterval > 0)) {
            this._reportingInterval = newInterval;
        } else {
            !RELEASE && window.console && window.console.log('Invalid interval ' +
                interval);
        }
    };

    /**
    * Processes a batch of callback updates and sends data to the server at
    * regular intervals.
    *
    * Google Closure will raise issues about RAL.callQueue being not defined,
    * but it is defined elsewhere - need to figure out how to silence that.
    * @expose
    */
    RAL.Library.prototype.processQueue = function () {
        !RELEASE && window.console && window.console.log(RAL.callQueue.length +
            ' elements to process in the queue');

        // According to the ECMA-262 specifications, paragraphs 10.2.1.1 and
        // 10.2.1.1.6, the 'this' value is to consider set to 'undefined' if it
        // comes from within a function outside a prototype, which is how we
        // reschedule RAL.Library.processQueue.
        //
        // The next line of code just caches the 'this' value that is correctly
        // set the first time it gets invoked from a proper execution context,
        // and passes it over to the anonymous function for rescheduling the
        // function itself.  Subsequent invocations of RAL.Library.processQueue
        // from within the anonymous function will have the 'this' value correctly
        // set as the function will be invoked through Object.call.

        /** @type {RAL.Library} */
        var objectThis = this;

        try {
            /** @type {Array.<*>} */
            var callback;

            /** @type {boolean} */
            var newDataAvailable = false;

            // Process updates

            while (callback = RAL.callQueue.shift()) {
                /** @type {string} */
                var name = callback[0];

                (name in objectThis) && objectThis[name].apply(objectThis, callback.slice(1));
                newDataAvailable = true;
            }

            // Send data if there is any available
            // Even when only Item vectors are available newDataAvailable is true
            // So an additional check is required to confirm that the Mandatory parameters, 
            // ACCOUNT_ID and SERVICE_ID are not null
            if (newDataAvailable && this._parameters.get(RAL.ParameterTypes.ACCOUNT_ID) !== null &&
            this._parameters.get(RAL.ParameterTypes.SERVICE_ID) !== null) {
                objectThis._spoolData();
            }
        } catch (exception) {
            !RELEASE && window.console &&
                window.console.log('Process queue exception ' + exception.toString());
        }

        // window.setTimeout will lose calling object information, so we have to
        // preserve that reference by explicitly passing the calling object context
        // to the reschedule function via Object.call through an anonymous
        // function.

        window.setTimeout(function () {
            objectThis.processQueue.call(objectThis);
        }, objectThis._reportingInterval);
    };

    /////////////////////////////////////////////////////////////////////

    // JSON polyfiller for IE6

    var JSON = JSON || {};

    // Patch stringify if needed.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var gap = '';
            var rep;
            var indent = '';

            var quote = function (string) {
                // GJsLint complains about this but there isn't much we can do for it.
                var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' +
                    string.replace(escapable, function (a) {
                        var meta = {
                        '\b': '\\b',
                        '\t': '\\t',
                        '\n': '\\n',
                        '\f': '\\f',
                        '\r': '\\r',
                        '"': '\\"',
                        '\\': '\\\\'
                };
            var c = meta[a];
            return typeof c == 'string' ? c : '\\u' +
                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            };

            var str = function (key, holder) {
                var i, k, v, length, mind = gap, partial, value = holder[key];
                if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }

                if (typeof rep === 'function') {
                    value = rep.call(holder, key, value);
                }

                switch (typeof value) {
                    case 'string': return quote(value);
                    case 'number': return isFinite(value) ? String(value) : 'null';
                    case 'boolean':
                    case 'null': return String(value);
                    case 'object':
                        if (!value) {
                            return 'null';
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }

                            v = partial.length === 0 ? '[]' : gap ?
                                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                                    '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }

                        if (rep && typeof rep === 'object') {
                            length = rep.length;
                            for (i = 0; i < length; i += 1) {
                                if (typeof rep[i] === 'string') {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        } else {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        }

                        v = partial.length === 0 ? '{}' : gap ?
                            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                            '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                }
            };

            var i;
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', { '': value });
        };
    }

    // Patch parse if needed.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            };

            // GJsLint complains about this but there isn't much we can do for it.
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/.test(
            text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']'
          ).replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }

            return null;
        };
    }

    /////////////////////////////////////////////////////////////////////

    // CHANGE THIS FOR DEBUGGING!
    /** @type{string} */
    var eventReceiverBaseUrl = 'http://172.27.139.142:8080/TestUtil/UploadServlet';

    // Bring RAL to life.

    /** @type{RAL.Library} */
    var ralLibrary = new RAL.Library(eventReceiverBaseUrl);
    ralLibrary.processQueue();
})(window);

// vim:sts=2:sw=2:et:
