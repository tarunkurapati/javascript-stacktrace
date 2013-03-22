/* Template file for Rakuten Web analytics 
 * @author Anshu Singh 
 * /  
/*******************************************************************  
 * WE CAN TRACK EVENTS LIKE SCROLL POSITION,MOUSE MOVE EVENT  KEY PRESS AND MOUSE KEY PRESS EVENTS. WE HAVE COMMENTED THE CODE AS IT IS NOT THERE IN SPEC
 *********************************************************************/
try {
    /**  
	@namespace This Namespace (RAL) holds Primary functionality for the JS Analytics.
	*/
    var RAL = RAL || {};
    RAL.callQueue = RAL.callQueue || [];
    /*
     * Create the URL to log the information on server change the IP and Port
     * according to requirement
     */
    
    /*
    var ip_Address = 'sachinsi';
    var folder_name = "TestUtil";
    var testApp_name = "UploadServlet";
    var port_Number = '8443';
    RAL.eventReceiverBaseUrl = ('http' + (location.protocol == 'https:' ? 's://' : '://') + ip_Address + ':' + port_Number + '/' + folder_name + "/" + testApp_name);
    */

    //Change the server URL accordingly.
    RAL.eventReceiverBaseUrl = "http://rat.rd.rakuten.co.jp/rat.pl";


    // Change the IP address, port number and path of reporting.html file
    
    
    /**
     * Class defined? If not, create.
     */

    if (!RAL.Library) {

        /**  
         * RAL.Library constructor.  
         * @constructor  
         */
        RAL.Library = function () {
            this.m_accountId = "";
            this.m_serviceId = "";
            this.m_pageViewReportedFor = [];
            this.m_adSpaceSpecs = {};
            this.m_customParameters = [];
            this.m_scriptStartTime = this.setStartScriptTime();
            this.m_customParam = "";
        };

        /**
         * Prototype declaration for the RAL.Library class.
         */
        RAL.Library.prototype = {
            // Properties
            m_accountId: "",
            m_serviceId: "",
            m_goalId: "",
            m_pageName: "",
            m_adSpaceSpecs: "",
            m_location: "",
            m_price: "",
            m_cycode: "",
            m_searchQuery: "",
            m_contentLanguage: "",
            m_campaignCode: "",
            m_checkPoints: "",
            m_checkout: "",
            m_requestResult: "",
            m_customParam: "",
            m_version: "",
            m_online: "",
            m_scriptStartTime: "",
            m_timezoneOffset: "",
            m_referrer: "",
            m_AffiliateId: "",
            m_charSet: "",
            m_offlineCount: "",
                       
            /**  * This function is used for validation of number(int,float) data.
             * @param {number} input
             */
            validateInput: function (input) {
                if (((parseInt(input) == (input)) || parseFloat(input) == input) && input > 0) {
                    return true;
                } else {
                    return false;
                }
            },

            /**  * This function is used to set AccountId
             * @param {integer} accountId
             */

            setAccountId: function (accountId) {
                var input = accountId;
                /* validation for integer*/
                var valid = this.validateIntInput(input);
                if (valid) {
                    this.m_accountId = accountId;
                } else {
                    this.m_accountId = "";
                }
            },

            /**  * This function is used to set CharSet
             * @param {char} charSet
             */
            setCharSet: function (charSet) {
                this.m_charSet = charSet;
            },

            /**  * This function is used to set pollTime
             * @param {time} pollTime
             */
            setPollTime: function (pollTime) {
                var input = pollTime;
                /* validation for integer and float value */
                var valid = this.validateInput(input);
                if (valid) {
                    this.m_pollTime = pollTime;
                    setTimeout(this.ral_pollActivity(), this.m_pollTime);
                } else {
                    this.m_pollTime = 1000;
                    setTimeout(this.ral_pollActivity(), this.m_pollTime);
                }
            },

            /**  * This function is used to set Referrer
             * @param {string} referrer
             */
            setReferrer: function (referrer) {
                if (referrer == null || referrer == "") {
					if(typeof(document.Referrer) != 'undefined'){
                    this.m_referrer = document.Referrer;
					}else{
						this.m_referrer = "";
					}
                } else {
                    this.m_referrer = referrer;
                }
            },

            /**  * This function is used to set goalId
             * @param {integer} goalId
             */
            setGoalId: function (goalId) {
                this.m_goalId = goalId;
            },

            /**  * This function is used to set affiliateId
             * @param {integer} affiliateId
             */
            setAffiliateId: function (affiliateId) {
                /* Check Special Character */
                affiliateId += "";
                this.m_AffiliateId = this.chkSpecialChars(affiliateId);
            },

            /**  * This function is used to check parameter for special characters.
             * @param {string} input
             */
            checkSpecialChars: function (input) {
                input += "";
                var regexp = /^[a-zA-Z]+$/;
                if (input != "") {
                    if (regexp.test(input)) {
                        return input;
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            },

            /**  * This function is used to check parameter for special characters.
             * @param {string} input
             */
            chkSpecialChars: function (input) {
                input += "";
                var regexp = /^[0-9a-zA-Z]+$/;
                if (input != "") {
                    if (regexp.test(input)) {
                        return input;
                    } else {
                        return "";
                    }
                } else {
                    return "";
                }
            },

            /**  * This function is used for checking whether browser is java enabled or not.
             */
            javaEnabled: function () {
                for (var i = 0, size = navigator.mimeTypes.length; i < size; i++) {
                    if ((result = navigator.mimeTypes[i].type.match(/^application\/x-java-applet;jpi-version=(.*)$/)) !== null) {
                        return true;
                    }
                }
                return false;
            },

            /**  * This function is used to set ServiceId.
             * @param {integer} serviceId
             */
            setServiceId: function (serviceId) {
                var input = serviceId;
                /* validation for integer */
                var valid = this.validateIntInput(input);
                if (valid) {
                    this.m_serviceId = serviceId;
                } else {
                    this.m_serviceId = "";
                }
            },

            /**  * This function is used to set Price.
             * @param {integer} price
             */
            setPrice: function (price) {
                var input = price;
                /* validation for integer and float value */
                var valid = this.validateInput(input);
                if (valid) {
                    this.m_price = parseFloat(price);
                } else {
                    this.m_price = "";
                }
            },

            /**  * This function is used to set OnlineStatus.
             */
            setOnlineStatus: function () {
                this.m_online = navigator.onLine;
            },

            /**  * This function is used to set TimezoneOffset.
             */
            setTimezoneOffset: function () {
                var timeOffset = new Date().getTimezoneOffset();
                /* to calculate time offset in hours format */
                timeOffset = -((timeOffset) / 60);
                if (((parseInt(timeOffset) == (timeOffset)) || parseFloat(timeOffset) == timeOffset)) {
                    this.m_timezoneOffset = timeOffset;
                } else {
                    this.m_timezoneOffset = "";
                }
            },

            /**  * This function is used to set Version.
             * @param {integer} version
             */
            setVersion: function (version) {
                this.m_version = version;
            },

            /**  * This function is used to set CurrencyCode.
             * @param {integer} cycode
             */
            setCurrencyCode: function (cycode) {
                try {
                    /* check for special characters */
                    cycode += "";
                    if (cycode != "") {
                        if (cycode.length < 3) {
                            this.m_cycode = "";
                        } else {
                            this.m_cycode = this.checkSpecialChars(cycode.substr(0, 3));
                        }
                    } else {
                        this.m_cycode = "";
                    }
                } catch (exception) {};
            },

            /**  * This function is used to set SearchQuery.
             * @param {string} searchQuery
             */
            setSearchQuery: function (searchQuery) {
                this.m_searchQuery = searchQuery;
            },

            /**  * This function is used to set ContentLanguage.
             * @param {string} contentLanguage
             */
            setContentLanguage: function (contentLanguage) {
                contentLanguage += "";
                this.m_contentLanguage = contentLanguage;
            },

            /**  * This function is used to set CampaignCode.
             * @param {string} campaignCode
             */
            setCampaignCode: function (campaignCode) {
                campaignCode += "";
                this.m_campaignCode = this.chkSpecialChars(campaignCode);
            },
            
             /**  * This function is used to set CheckPoints.
             * @param {string} checkPoints
             */
            setCheckPoints: function (checkPoints) {
                var input = checkPoints;
                /* validation for integer value */
                if (parseInt(input) == (input)) {
                    this.m_checkPoints = checkPoints;
                } else {
                    this.m_checkPoints = "";
                }
            },

            /**  * This function is used to set Checkout.
             * @param {string} checkout
             */
            setCheckout: function (checkout) {
                var input = checkout;
                /* validation for integer value */
                if ((parseInt(input) == (input)) && (input == 10 || input == 20 || input == 30 || input == 40 || input == 50)) {
                    this.m_checkout = checkout;
                } else {
                    this.m_checkout = "";
                }
            },

            /**  * This function is used to set RequestResult.
             * @param {string} requestResult
             */
            setRequestResult: function (requestResult) {
                requestResult += "";
                this.m_requestResult = requestResult;
            },

            /**  * This function is used to Get Start script time in specific format
             */
            setStartScriptTime: function () {
                var today = new Date();
                // today.getMonth() returns month with starting index '0'. Hence
                // added 1
                var scriptStartTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                return scriptStartTime;
            },

            /**  * This function is used to set custom parameters sent by user to class level variable.
             * @param {string} param
             */
            customParam: function (param) {
                try {
                    var tempStr = param + "";
                    var keyValuePair = tempStr.split("=");
                    if(keyValuePair != null && typeof(keyValuePair)!='undefined' && keyValuePair.length > 1)
						{
                    var key = keyValuePair[0];
                    var value = keyValuePair[1];
                    if (key != "") {
                        if (key.length > 20) {
                            key = "";
                        }
                        if (value != "" && value.length > 15) {
                            value = "";
                        }

                        if (key != "") {
                            if ((this.m_customParam.indexOf(key + "\"" + ":")) == -1) {
                                this.m_customParam += "\"" + encodeURIComponent(key) + "\"" + ':' + "\"" + encodeURIComponent(value) + "\"" + ",";
                            }
                        }
                    }
						}
                    this.m_customParam += "";
                } catch (exception) {}
            },

            /**  * This function is used to set page name.
             * @param {string} pageName
             */
            set_pageName: function (pageName) {
                try {
                    this.m_pageName = pageName;
                } catch (exception) {}
            },

            /**  * This function is used to Check whether the request is internal or not.
             */
            isInternalRequest: function () {
                try {
                    return (null != navigator.userAgent.match(/RAL/i));
                } catch (exception) {
                    return false;
                }
            },

            /**  * This function is used to set off line data in cookies. See sendPageViewEvent.
             * @param {string} c_name
             * @param {string} value
             * @param {string} exdays
             */
            setOfflineCookie: function (c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = value;
                document.cookie = c_name + "=" + c_value;
            },

            /**  * This function is used to get offline data from cookies. See sendPageViewEvent.
             * @param {string} c_name
             */
            getOfflineCookie: function (c_name) {
                var i, key, value, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    key = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    key = key.replace(/^\s+|\s+$/g, "");
                    if (key == c_name) {
                        return value;
                    }
                }
            },



            
            /**  * This function is used to validate input for the integer parameters 
             * @param {integer} input
             */
            validateIntInput: function (input) {
            if (((parseInt(input) == (input)))   && input > 0) 
            {
              return true;
            } else {
               return false;
              }
            },

            /**
             * Function to generate URL and submit the form
             * 
             * @see ral_callQueueExecute
             */
            sendPageViewEvent: function () {
                /* Don't skew the statistics. */
                if (this.isInternalRequest()) {
                    return;
                }
                /* Don'send event on programmatic refresh */
                try {
                    if (document.location && document.referrer && (document.location != '') && (document.location == document.referrer)) {
                        return;
                    }
                } catch (exception) {}
                this.setOnlineStatus();
                this.setTimezoneOffset();

                  if ((this.m_accountId == "" || this.m_serviceId == "") ) {
					
					  // return if mandatory fields are null
                    this.m_customParam = "";
					if((typeof(Storage)!=="undefined") && (typeof(localStorage.offlineData) =="undefined" || localStorage.offlineData ==""))
						{
						return ;
						}
					else if(!storage && document.cookie && this.getOfflineCookie("offlineData") =="")
						{
						return ;
						}
					
                  
                    
                }

                if (document.images) {
                    var flashVersion = '';
                    try {
                        var hasFlash = false;
                        var flashMimeTypeStr = 'application/x-shockwave-flash';
                        if (navigator.mimeTypes && navigator.mimeTypes[flashMimeTypeStr]) {
                            hasFlash = true;
                            try {
                                var flashMimeType = navigator.mimeTypes[flashMimeTypeStr];
                                if (flashMimeType.enabledPlugin && flashMimeType.enabledPlugin.description) {
                                    flashVersion = flashMimeType.enabledPlugin.description;
                                }
                            } catch (exception) {
                                flashVersion = '';
                            }
                        } else if (navigator.plugins) {
                            try {
                                for (var i = 0; i < navigator.plugins.length; i++) {
                                    if (navigator.plugins[i].indexOf('Shockwave Flash') === 0) {
                                        hasFlash = true;
                                        break;
                                    }
                                }
                            } catch (exception) {}
                        }

                        if (!hasFlash) {
                            try {
                                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                                try {
                                    flashVersion = axo.GetVariable('$version');
                                } catch (exception) {
                                    flashVersion = '';
                                }
                                hasFlash = true;
                            } catch (exception) {}
                        }
                        try {
                            repSrc += '&flv=' + encodeURIComponent(flashVersion);
                        } catch (exception) {}
                    } catch (exception) {}
                    this.m_customParam = this.m_customParam.substring(0,
                    this.m_customParam.length - 1);
                    this.m_customParam = "{" + this.m_customParam + "}";
                    /* create a map to send data by post */
                    var postParams = {
                        "acc": encodeURIComponent(this.m_accountId),
                        "aid": encodeURIComponent(this.m_serviceId),
                        "ref": encodeURIComponent(this.m_referrer),
                        "afid": encodeURIComponent(this.m_AffiliateId),
                        "gol": encodeURIComponent(this.m_goalId ? this.m_goalId : ''),
                        "pgn": encodeURIComponent(this.m_pageName ? this.m_pageName : ''),
                        "ltm": encodeURIComponent(this.m_scriptStartTime),
                        "tzo": encodeURIComponent('' + this.m_timezoneOffset),
                        "res": encodeURIComponent('' + window.screen.width + 'x' + window.screen.height),
                        "jav": encodeURIComponent(this.javaEnabled()),
                        "bln": navigator.browserLanguage ? encodeURIComponent(navigator.browserLanguage) : (navigator.language ? encodeURIComponent(navigator.language) : (navigator.userLanguage ? encodeURIComponent(navigator.userLanguage) : 'OO1OO')),
                        "cks": encodeURIComponent(this.get_sessionCookie()),
                        "ckp": encodeURIComponent(this.get_persistentCookie()),
                        "tis": encodeURIComponent(this.m_charSet),
                        "ckrg": encodeURIComponent(this.get_RgCookie()),
                        "ckrz": encodeURIComponent(this.get_RzCookie()),
                        "ckrp": encodeURIComponent(this.get_RpCookie()),
                        "price": encodeURIComponent(this.m_price),
                        "cycode": encodeURIComponent(this.m_cycode),
                        "sq": encodeURIComponent(this.m_searchQuery),
                        "cntln": encodeURIComponent(this.m_contentLanguage),
                        "ua": encodeURIComponent(navigator.userAgent),
                        "cc": encodeURIComponent(this.m_campaignCode),
                        "chkpt": encodeURIComponent(this.m_checkPoints),
                        "chkout": encodeURIComponent(this.m_checkout),
                        "reqc": encodeURIComponent(this.m_requestResult),
                        "cp": encodeURIComponent(this.m_customParam),
                        "ver": encodeURIComponent(this.m_version),
                        "online": encodeURIComponent(this.m_online),
                        "loc": encodeURIComponent(RAL_Namespace.myLocation),
                        "ts": encodeURIComponent(this.setStartScriptTime()),
                        "flv": encodeURIComponent(flashVersion)
                    };

                    // initialized
                    this.m_customParam = "";
                    if (RAL_Namespace.locationSet == 0) {
                        postParams.loc = "{}";
                    }

                    try {
                        /*
                         * code to check for availability of local storage
                         */

                        var storage = (function () {
                            var locStore = new Date,
                                result;
                            try {
                                localStorage.setItem(locStore, locStore);
                                result = localStorage.getItem(locStore) == locStore;
                                localStorage.removeItem(locStore);
                                return result && localStorage;
                            } catch (e) {}
                        }());
                      
                        if (RAL_Namespace.onlineFlag == 1) {
                            /*
                             * user is online
                             */
                            var offlineURL = "";
                            if (storage) {
                                offlineURL = localStorage.offlineData;
                            } else if (document.cookie) {
                                offlineURL = this.getOfflineCookie("offlineData");
                            }
                            
                            var xmlhttp;
                            if (window.XMLHttpRequest) {
                                // code for IE7+,Firefox, Chrome, Opera, Safari
                                xmlhttp = new XMLHttpRequest();
                            } else { // code for IE6, IE5
                                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                            if(this.m_accountId != "" && this.m_serviceId != "")
								{
                            xmlhttp.open("GET", RAL.eventReceiverBaseUrl + "?cpkg_none=" + encodeURIComponent(JSON.stringify(postParams)), true);
                            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                            xmlhttp.send("");
								}

                            if (storage && (offlineURL != null && offlineURL != "" && offlineURL != 'undefined')) {
								try{
								offlineURL = offlineURL.substring(0, offlineURL.length - 1);
                                var offlineData = offlineURL.split("***");
								    while (offlineData.length > 0) {
									    if (window.XMLHttpRequest) {
									        xmlhttp = new XMLHttpRequest();
									    } else { 
									    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
									    }
								    var analyticsData = offlineData.shift();
								    analyticsData = analyticsData.replace("***", "");
								    analyticsData = Base64.encode(analyticsData);
								    xmlhttp.open("GET", RAL.eventReceiverBaseUrl + "?cpkg_lzw=" + analyticsData, true);
								    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
								    xmlhttp.send("");
								    }                                
                                localStorage.offlineData = "";
								}catch (e) {                                
                                }            
																											                                                          
                            } else if (!storage && document.cookie) {
                                /*
                                 * To check cookies are enabled and offline data
                                 * available
                                 */
								 try {
                                     offlineURL = offlineURL.substring(0,
                                     offlineURL.length - 1);
                                     var offlineData = offlineURL.split("***");
                                     for (i = 0; i < offlineData.length; i++) {
										 if (window.XMLHttpRequest) {
									        xmlhttp = new XMLHttpRequest();
									    } else { 
									    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
									    }
                                         var analyticsData = offlineData[i];
                                         analyticsData = Base64.encode(analyticsData);
                                         xmlhttp.open("GET", RAL.eventReceiverBaseUrl + "?cpkg_lzw=" + analyticsData, true);
                                         xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                                         xmlhttp.send("cpkg_lzw=" + analyticsData);
                                     }
                                     this.setOfflineCookie("offlineData", "", 365);
                                     this.m_offlineCount = 0;
                                 } catch (e) {
                                 }
                            }
                        } else if (storage && (this.m_accountId != "" && this.m_serviceId != "")) {

                            /*
                             * To check if offline storage is enabled and if so
                             * then store offline data in local storage
                             */
                            this.m_offlineCount++;
                            var offlineURL = localStorage.offlineData;
                            if (offlineURL == undefined) {
                                offlineURL = "";
                            }
                            offlineURL += "\"" + this.m_offlineCount + "\"" + ":" + JSON.stringify(postParams) + "***";
                            localStorage.offlineData = offlineURL;
                        } else if ((!storage && document.cookie)&&(this.m_accountId != "" && this.m_serviceId != "")) {
                            /*
                             * To check cookies are enabled if so then store
                             * offline data in cookie
                             */
                            this.m_offlineCount++;
                            var offlineURL = this.getOfflineCookie("offlineData");
                            if (offlineURL == undefined) {
                                offlineURL = "";
                            }
                            offlineURL += "\"" + this.m_offlineCount + "\"" + ":" + JSON.stringify(postParams) + "***";
                            this.setOfflineCookie("offlineData", offlineURL,
                            365);
                        }
                    } catch (exception) {}
                }
            },

            /**  * This function is used to get session cookie.
             */
            get_sessionCookie: function () {
                var sessionCookie = this.get_cookie('RAL_S');
                if (!sessionCookie) {
                    return "";
                }
                return sessionCookie;
            },

            /**  * This function is used to get persistent cookie. See get_cookie.
             */
            get_persistentCookie: function () {
                var persistentCookie = this.get_cookie('RAL_P');
                if (!persistentCookie) {
                    return "";
                }
                return persistentCookie;
            },

            /**  * This function is used to get Rg cookie. See get_cookie.
             */
            get_RgCookie: function () {
                var rgCookie = this.get_cookie('Rg');
                if (!rgCookie) {
                    return "";
                }
                return rgCookie;
            },

            /**  * This function is used to get Rz cookie. See get_cookie.
             */
            get_RzCookie: function () {
                var rzCookie = this.get_cookie('Rz');
                if (!rzCookie) {
                    return "";
                }
                return rzCookie;
            },

            /**  * This function is used to get Rp cookie. See get_cookie.
             */
            get_RpCookie: function () {
                var rpCookie = this.get_cookie('Rp');
                if (!rpCookie) {
                    return "";
                }
                return rpCookie;
            },

            /**  * This function is used to set GeoLocation. See get_cookie.
             * @param {string} setLocation
             */
            setGeoLocation: function (setLocation) {
                if (setLocation == 'true') {
                    RAL_Namespace.getLocation();
                } else {
                    RAL_Namespace.myLocation = JSON.stringify({
                        "lat": encodeURIComponent(""),
                        "long": encodeURIComponent(""),
                        "speed": encodeURIComponent(""),
                        "accu": encodeURIComponent(""),
                        "alt": encodeURIComponent(""),
                        "tms": encodeURIComponent("")
                    });
                    RAL_Namespace.locationSet = 1;
                }
            },

            /**  * This function is used to get cookie.
             * @param {string} check_name
             */
            get_cookie: function (check_name) {
                var a_all_cookies = document.cookie.split(';');
                var a_temp_cookie = '';
                var cookie_name = '';
                var cookie_value = '';
                var b_cookie_found = false; // set boolean t/f default f
                for (var i = 0; i < a_all_cookies.length; i++) {
                    a_temp_cookie = a_all_cookies[i].split('=');

                    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

                    if (cookie_name == check_name) {
                        b_cookie_found = true;
                        if (a_temp_cookie.length > 1) {
                            cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                        }
                        return cookie_value;
                    }
                    a_temp_cookie = null;
                    cookie_name = '';
                }
                if (!b_cookie_found) {
                    return null;
                }
            }

        };
    }

    /**  
	@namespace This Namespace holds function for Utility.
	*/

    var RAL_Namespace = {
        'myLocation': {},
        // current location of the user set to "" if location is not available
        'onlineFlag': 1,
        // represents online-offline status of the user.
        'locationSet': 0,
        // represents location not set
        'RAL_library': new RAL.Library(),
        // Create Object of RAL.Library class
        'enableLocation': true,

        /**
         * This function is called when the current position of the user is
         * obtained. It is a callback function.
         */
        onPositionUpdate: function (position) {

            var lat = (position.coords.latitude) ? (position.coords.latitude) : "";
            var lng = (position.coords.longitude) ? (position.coords.longitude) : "";
            var accu = (position.coords.accuracy) ? (position.coords.accuracy) : "";
            var alti = (position.coords.altitude) ? (position.coords.altitude) : "";
            var speed = (position.coords.speed) ? (position.coords.speed) : "";

            RAL_Namespace.myLocation = JSON.stringify({
                "lat": encodeURIComponent(lat),
                "long": encodeURIComponent(lng),
                "speed": encodeURIComponent(speed),
                "accu": encodeURIComponent(accu),
                "alt": encodeURIComponent(alti),
                "tms": encodeURIComponent(new Date().getTime())
            });
            RAL_Namespace.locationSet = 1;
        },

        /**
         * function to get location of the user.
         * 
         * @see onPositionUpdate
         */
        getLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.onPositionUpdate);
            }
        },
           
        /**  * This function is used to detect online offline events. This function is called when the registered event is generated on the window.
         * @param {event} winEvent
         */
        reportConnectionEvent: function (winEvent) {
            if (!winEvent) {
                winEvent = window.event;
            }
            if ('online' == winEvent.type) {
                RAL_Namespace.onlineFlag = 1;
            } else if ('offline' == winEvent.type) {
                RAL_Namespace.onlineFlag = 0;
            } else {
                RAL_Namespace.onlineFlag = 0;
            }
        },

        /**
         * function to register the events for detecting online-offline status
         * 
         * @see reportConnectionEvent
         */
        windowOnLoad: function () {
            document.body.ononline = RAL_Namespace.reportConnectionEvent;
            document.body.onoffline = RAL_Namespace.reportConnectionEvent;
        },

        /**
         * This function is automatically called after 15 sec first time and
         * after in the interval of 10 milliseconds This function take
         * parameters and functionName from Tracker_script.js / Example.html and
         * call it
         */
        ral_callQueueExecute: function () {
            try {

                var currCall = null;
                while (currCall = RAL.callQueue.shift()) {
                    /*
                     * to take parameters from tracker_script or from Html file
                     */

                    var fnName = currCall[0];
                    var fnArgs = currCall[1] || {};

                    RAL_Namespace.RAL_library[fnName].apply(
                    RAL_Namespace.RAL_library, [fnArgs]);
                    /*
                     * call the function and apply specific param
                     */
                }
            } catch (exception) {}
            setTimeout(RAL_Namespace.ral_callQueueExecute, 10);
            /*
             * recursive call to function
             */
        },
               
        /**
         * This function wait for 15 seconds and call to ral_callQueueExecute to
         * get Location
         * 
         * @see ral_callQueueExecute
         */
        delay: function () {
            setTimeout(RAL_Namespace.ral_callQueueExecute, 15000);
            // delay to get location
        }

    };

    RAL_Namespace.windowOnLoad();

    /*
     * call window on load function to register the events
     */

    if (RAL_Namespace.enableLocation) {
        RAL_Namespace.getLocation(); // on first load call to getlocation
    } else {
        RAL_Namespace.myLocation = JSON.stringify({
            "lat": encodeURIComponent(""),
            "long": encodeURIComponent(""),
            "speed": encodeURIComponent(""),
            "accu": encodeURIComponent(""),
            "alt": encodeURIComponent(""),
            "tms": encodeURIComponent("")
        });
        RAL_Namespace.locationSet = 1;
    }
    RAL_Namespace.delay(); // on first load call to delay
    /**  
      @namespace This Namespace holds function like encoding, decoding, compression, decompression.
      */
    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**  * This function is used to compress offline data.
         * @param {string} uncompressed
         */
        lzw_compress: function (uncompressed) {
            "use strict";
            // Build the dictionary.
            var i, dictionary = {}, currChar, phraseCurrChar, phrase = "",
                result = [],
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[String.fromCharCode(i)] = i;
            }

            for (i = 0; i < uncompressed.length; i += 1) {
                currChar = uncompressed.charAt(i);
                phraseCurrChar = phrase + currChar;
                if (dictionary[phraseCurrChar]) {
                    phrase = phraseCurrChar;
                } else {
                    result.push(dictionary[phrase]);
                    // Add phraseCurrChar to the dictionary.
                    dictionary[phraseCurrChar] = dictSize++;
                    phrase = String(currChar);
                }
            }

            // Output the code for phrase.
            if (phrase !== "") {
                result.push(dictionary[phrase]);
            }
            return result;
        },

        /**  * This function is used to decompress offline data.
         * @param {string} compressed
         */
        lzw_decompress: function (compressed) {
            "use strict";
            // Build the dictionary.
            var i, dictionary = [],
                phrase, result, CompCurrChar, entry = "",
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[i] = String.fromCharCode(i);
            }
            phrase = String.fromCharCode(compressed[0]);
            result = phrase;
            for (i = 1; i < compressed.length; i += 1) {
                CompCurrChar = compressed[i];
                if (dictionary[CompCurrChar]) {
                    entry = dictionary[CompCurrChar];
                } else {
                    if (CompCurrChar === dictSize) {
                        entry = phrase + phrase.charAt(0);
                    } else {
                        return null;
                    }
                }
                result += entry;
                // Add phrase+entry[0] to the dictionary.
                dictionary[dictSize++] = phrase + entry.charAt(0);
                phrase = entry;
            }
            return Base64.decode(result);
        },

        /**  * This function is used to encode offline data. See sendPageViewEvent.
         * @param {string} input
         */
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }
            return Base64.lzw_compress(output);
        },

        /**  * This function is used to decode offline data.
         * @param {string} input
         */
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            return output;
        }
    };

    /**  
	@namespace This Namespace holds function for Json.
	*/
    var JSON = JSON || {};

    /**  * This function is used to Create JSON string.
     * @param {object} object
     */
    JSON.stringify = JSON.stringify || function (object) {
        var type = typeof (object);
        if (type != "object" || object === null) {
            // simple data type
            if (type == "string") object = '"' + object + '"';
            return String(object);
        } else {
            // recurse array or object
            var value, json = [],
                arr = (object && object.constructor == Array);
            var num = 0;
            for (num in object) {
                value = object[num];
                type = typeof (value);
                if (type == "string") value = '"' + value + '"';
                else if (type == "object" && value !== null) value = JSON.stringify(value);
                json.push((arr ? "" : '"' + num + '":') + String(value));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

} catch (exception) {}
