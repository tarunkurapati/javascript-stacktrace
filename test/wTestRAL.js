(function(window, document, undefined) {
    // Testing util functions
    var UnitTest = function() {
    };
    UnitTest.fn = UnitTest.prototype = {
        genericError: null,
        createGenericError: function() {
            if(UnitTest.prototype.genericError != null) {
                return UnitTest.prototype.genericError;
            }
            //return new Error("Generic error");
            return new Error();
        },
        prepareFakeOperaEnvironment: function() {
            if(typeof window !== 'undefined' && !window.opera) {
                window.opera = "fake";
                window.fakeOpera = true;
            }
        },
        clearFakeOperaEnvironment: function() {
            if(typeof window !== 'undefined' && window.fakeOpera) {
                delete window.opera;
                delete window.fakeOpera;
            }
        }
	};

		module("RAL");
		/* QUNIT TESING PART */
		/* it will check start sript time */
		test("Test to check start sript time ", function() {
			var ralTest = new RAL.Library();
			var today = new Date();
			var scriptStartTime123 = today.getFullYear() + "-"
					+ (today.getMonth() + 1) + "-" + today.getDate() + " "
					+ today.getHours() + ":" + today.getMinutes() + ":"
					+ today.getSeconds();
			ralTest.setStartScriptTime();
			equal(ralTest.m_scriptStartTime, scriptStartTime123,
					"Start script time is same ");
		});

		/* it will check online staus */
		test("Test to check Online Status ",
				function() {
					var ralTest = new RAL.Library();
					ralTest.setOnlineStatus();
					equal(ralTest.m_online, navigator.onLine,
							"online status working ");
				});

		/* it will check validation of Account ID */
		test("Test to check validation of Account ID ", function() {
			var ralTest = new RAL.Library();
			var accountID_integer = 1234;
			var accountID_string = 'abcd';
			var accountID_IntChar = '1234abc';
			var accountID_negative = -1234;
			var accountID_zero = 0;
			ralTest.setAccountId(accountID_integer);
			equal(ralTest.m_accountId, accountID_integer,
					"Setterfor account id working ");
			ralTest.setAccountId(accountID_string);
			equal(ralTest.m_accountId, '',
					"Account ID can 't be string working");
			ralTest.setAccountId(accountID_IntChar);
			equal(ralTest.m_accountId, '',
					"Account ID can't be string working ");
			ralTest.setAccountId(accountID_negative);
			equal(ralTest.m_accountId, '',
					"Account ID can 't be negative working");
			ralTest.setAccountId(accountID_zero);
			equal(ralTest.m_accountId, '', "Account ID can't be 0 working ");
		});

		/* it will check validation of Service ID */
		test("Test to check validation of Service ID ", function() {
			var ralTest = new RAL.Library();
			var serviceID_integer = 1234;
			var serviceID_string = 'abcd';
			var serviceID_zero = 0;
			var serviceID_negative = -1234;
			var serviceID_IntChar = '1234abc';
			ralTest.setServiceId(serviceID_integer);
			equal(ralTest.m_serviceId, serviceID_integer,
					"Settersfor service id working ");
			ralTest.setServiceId(serviceID_IntChar);
			equal(ralTest.m_serviceId, '',
					"Service ID can 't be string working");
			ralTest.setServiceId(serviceID_string);
			equal(ralTest.m_serviceId, '',
					"Service ID can't be string working ");
			ralTest.setServiceId(serviceID_negative);
			equal(ralTest.m_serviceId, '',
					"Service ID can 't be negative working");
			ralTest.setServiceId(serviceID_zero);
			equal(ralTest.m_serviceId, '', "Service ID can't be 0 working ");
		});

		/* it will check validation of Price */
		test(
				"Test to check validation of Price ",
				function() {
					var ralTest = new RAL.Library();
					var price_integer = 1234;
					var price_string = 'abcd';
					var price_zero = 0;
					var price_negative = -1234;
					var price_IntChar = '1234abc';
					var price_float = 12.34;
					ralTest.setPrice(price_integer);
					equal(ralTest.m_price, price_integer,
							"Settersfor price working ");
					ralTest.setPrice(price_IntChar);
					equal(ralTest.m_price, '', "Price can 't be string working");
					ralTest.setPrice(price_string);
					equal(ralTest.m_price, '', "Price can't be string working ");
					ralTest.setPrice(price_negative);
					equal(ralTest.m_price, '',
							"Price can 't be negative working");
					ralTest.setPrice(price_zero);
					equal(ralTest.m_price, '', "Price can't be 0 working ");
					ralTest.setPrice(price_float);
					equal(ralTest.m_price, price_float,
							"Boolean value Price working ");
				});

		/* it will check validation of Checkout */
		test(
				"Test to check validation of Checkout ",
				function() {
					var ralTest = new RAL.Library();
					var checkout_integer = 10;
					var checkout_string = 'abcd';
					var checkout_zero = 0;
					var checkout_negative = -1234;
					var checkout_InvalidInt = 123;
					ralTest.setCheckout(checkout_integer);
					equal(ralTest.m_checkout, checkout_integer,
							"Settersfor Checkout value working ");
					ralTest.setCheckout(checkout_string);
					equal(ralTest.m_checkout, '',
							"Checkout value can 't be string working");
					ralTest.setCheckout(checkout_InvalidInt);
					equal(ralTest.m_checkout, '', "Checkout value is not valid");
					ralTest.setCheckout(checkout_negative);
					equal(ralTest.m_checkout, '',
							"Checkout value can't be negative working ");
					ralTest.setCheckout(checkout_zero);
					equal(ralTest.m_checkout, '',
							"Checkout value can 't be 0 working");
				});

		/* it will check validation of CheckPoint */
		test("Test to check validation of CheckPoint", function() {
			var ralTest = new RAL.Library();
			var checkpoint_integer = 10;
			var checkpoint_string = 'abcd ';
			var checkpoint_IntChar = '1234abc ';
			ralTest.setCheckPoints(checkpoint_integer);
			equal(ralTest.m_checkPoints, checkpoint_integer,
					"Setters for CheckPoint value working");
			ralTest.setCheckPoints(checkpoint_IntChar);
			equal(ralTest.m_checkPoints, '',
					"CheckPoint value can't be string working ");
			ralTest.setCheckPoints(checkpoint_string);
			equal(ralTest.m_checkPoints, '', "CheckPoint value is not valid ");
		});

		/* it will check validation of Currency Code */
		test(
				"Test to check validation of Currency Code ",
				function() {
					var ralTest = new RAL.Library();
					var cycode_string1 = 'INRUPEES';
					var cycode_string2 = 'IN';
					var cycode_blank = '';
					var cycode_specialChar = 'IN@2';
					ralTest.setCurrencyCode(cycode_string1);
					equal(ralTest.m_cycode, 'INR',
							"Settersfor Currency Code working ");
					ralTest.setCurrencyCode(cycode_string2);
					equal(ralTest.m_cycode, '',
							"Settersfor Currency Code working finefor less than 3 char ");
					ralTest.setCurrencyCode(cycode_blank);
					equal(ralTest.m_cycode, '',
							"Settersfor Currency Code working finefor null ");
					ralTest.setCurrencyCode(cycode_specialChar);
					equal(ralTest.m_cycode, '',
							"Special char not allowed in currency code ");
				});

		/* it will check AffiliateId */
		test("Test to check Affiliate Id ", function() {
			var ralTest = new RAL.Library();
			var affiliateIdSrting = 'ABCD';
			var affiliateIdSpecialChar = 'ABC@123';
			ralTest.setAffiliateId(affiliateIdSrting);
			equal(ralTest.m_AffiliateId, affiliateIdSrting,
					"Settersfor AffiliateId working ");
			ralTest.setAffiliateId(affiliateIdSpecialChar);
			equal(ralTest.m_AffiliateId, '',
					"Special char checkingfor AffiliateId working ");
		});

		/* it will check Session cookie */
		test("Test to check Session cookie ", function() {
			var ralTest = new RAL.Library();
			var cookie_value = '12345';
			var sessionCookie = ralTest.get_sessionCookie();
			if (sessionCookie != '')
				equal(sessionCookie, cookie_value,
						"Session cookie working fine ");
			else
				equal(sessionCookie, '', "Session cookie not exist ");
		});

		/* it will check get_cookie */
		test("Test to check get_cookie ", function() {
			var ralTest = new RAL.Library();
			var c_name = 'MyName';
			var value = 'Dipak';
			var exdays = 10;
			ralTest.setOfflineCookie(c_name, value, exdays);
			var cookie_value = ralTest.get_cookie(c_name);
			if (cookie_value == null) {
				equal(cookie_value, null, "get_cookie is working fine ");
			} else {
				equal(cookie_value, value, "get_cookie is working fine ");
			}
		});

		/* it will check time zone offset */
		test("Test to check time zone offset ",
				function() {
					var ralTest = new RAL.Library();
					var timeOffset = Math
							.abs(new Date().getTimezoneOffset() / 60);
					ralTest.setTimezoneOffset();
					equal(ralTest.m_timezoneOffset, timeOffset,
							"Time offset are same ");
				});

		/* it will check custom param */
		test("Test to check custom param ", function() {
			var ralTest = new RAL.Library();
			var custom_param = 'Company=Cybage';
			var custom_key = 'Company=';
			var custom_blank = '';
			ralTest.customParam(custom_param);
			equal(ralTest.m_customParam, "\"Company\":\"Cybage\",",
					"Custom parameters are working");
			ralTest.m_customParam = "";
			ralTest.customParam(custom_blank);
			equal(ralTest.m_customParam, custom_blank,
					"Custom parameters can't be empty");
			ralTest.m_customParam = "";
			ralTest.customParam(custom_key);
			equal(ralTest.m_customParam, "\"Company\":\"\",",
					"Key is compulsary");
		});

		/* it will check call queue execute */
		test("Test to check call queue execute", function() {
			var ralTest = new RAL.Library();
			var accountID_integer = 1234;
			RAL.callQueue.push([ 'setAccountId', [ accountID_integer ] ]); // set parameters to required value 
			RAL_Namespace.ral_callQueueExecute();
			equal((RAL_Namespace.RAL_library).m_accountId, accountID_integer,
					"CallQueue function Working");
		});

		/* it will do encoding and compression of passed string*/
		test("Test for encoding and compression of passed string", function() {
			ralTest = new RAL.Library();
			var compression_string = 'cybage';
			if (Base64 == null || Base64 == "") {
				equal(compression_string, 'cybage',
						"encoding and compression not available");
			} else {
				var encode_compress = Base64.encode(compression_string);
				var encoded_string = encode_compress[0] + '_'
						+ encode_compress[1] + '_' + encode_compress[2] + '_'
						+ encode_compress[3] + '_' + encode_compress[4] + '_'
						+ encode_compress[5] + '_' + encode_compress[6] + '_'
						+ encode_compress[7];
				equal(encoded_string, '89_51_108_105_89_87_100_108');
			}
		});

		/* it will do the decompression and decoding of passed string */
		test(
				"Test for decompression and decoding of passed string",
				function() {
					var ralTest = new RAL.Library();
					var compression_string = 'cybage';
					if (Base64 == null || Base64 == "") {
						equal(compression_string, 'cybage',
								"decompression and decoding not available");
					} else {
						var encode_compress = Base64.encode(compression_string);
						var decompress_decode = Base64
								.lzw_decompress(encode_compress);
						equal(decompress_decode, 'cybage');
					}

				});

		/* it will check actual string and string after compression decompression */
		test(
				"Test to check actual string and string after compression decompression",
				function() {
					var ralTest = new RAL.Library();
					var compression_string = 'cybage';
					if (Base64 == null || Base64 == "") {
						equal(compression_string, 'cybage',
								"compression and decompression not available");
					} else {
						var encode_compress = Base64.encode(compression_string);
						var decompress_decode = Base64
								.lzw_decompress(encode_compress);
						equal(decompress_decode, compression_string,
								"compression and ecoding working");
					}
				});

		test("Test to validate input", function() {
			var ralTest = new RAL.Library();
			var flag = ralTest.validateInput(10);
			equal(flag, true, "input validated");
			flag = ralTest.validateInput('abc');
			equal(flag, false, "input not validated");
		});

		test("Test to set Char Set", function() {
			var ralTest = new RAL.Library();
			ralTest.setCharSet('abc');
			equal(ralTest.m_charSet, 'abc', "set the charset");
		});

		test("Test to set Referrer", function() {
			var ralTest = new RAL.Library();
			ralTest.setReferrer('Referer');
			equal(ralTest.m_referrer, 'Referer', "set the Referer");
		});

		test("Test to set Goal Id", function() {
			var ralTest = new RAL.Library();
			ralTest.setGoalId(10);
			equal(ralTest.m_goalId, 10, "set the Goal Id");
		});

		test("Test to check Special Chars", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.checkSpecialChars('Dipak');
			equal(output, 'Dipak', "checkSpecialChars pass");
			output = ralTest.checkSpecialChars('#Dipak#');
			equal(output, '', "checkSpecialChars fail");
		});

		test("Test to check java Enabled", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.javaEnabled();
			if (output != false)
				equal(output, true, "Java Enabled pass");
			else
				equal(output, false, "Java Enabled fail");
		});

		test("Test to set Version", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setVersion('1.0.0.1');
			equal(ralTest.m_version, '1.0.0.1', "setVersion pass");
		});

		test("Test to set Search Query", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setSearchQuery('Test Query');
			equal(ralTest.m_searchQuery, 'Test Query', "setSearchQuery pass");
		});

		test("Test to set Content Language", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setContentLanguage('jp');
			equal(ralTest.m_contentLanguage, 'jp', "setContentLanguage pass");
		});

		test("Test to set Campaign Code", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setCampaignCode('abc123');
			equal(ralTest.m_campaignCode, 'abc123', "setCampaignCode pass");
		});

		test("Test to set Request Result", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setRequestResult('abc123');
			equal(ralTest.m_requestResult, 'abc123', "setRequestResult pass");
		});

		test("Test to set Start Script Time", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.setStartScriptTime();
			var today = new Date();
			var scriptStartTime = today.getFullYear() + "-"
					+ (today.getMonth() + 1) + "-" + today.getDate() + " "
					+ today.getHours() + ":" + today.getMinutes() + ":"
					+ today.getSeconds();
			equal(output, scriptStartTime, "setStartScriptTime pass");
		});

		test("Test to set page Name", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.set_pageName('Page Name');
			equal(ralTest.m_pageName, 'Page Name', "set_pageName pass");
		});

		test("Test to check is Internal Request", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.isInternalRequest();
			equal(output, false, "isInternalRequest pass");
		});

		test("Test for setOfflineCookie and getOfflineCookie", function() {
			var ralTest = new RAL.Library();
			var c_name = 'MyName';
			var value = 'Dipak';
			var exdays = 10;
			ralTest.setOfflineCookie(c_name, value, exdays);
			var output;
			var dc = document.cookie;
			var prefix = c_name + "=";
			var begin = dc.indexOf("; " + prefix);
			if (begin == -1) {
				begin = dc.indexOf(prefix);
				if (begin != 0)
					output = null;
				else
					output = true;
			}
			if (output != null)
				equal(output, true, "setOfflineCookie pass");
			else
				equal(output, null, "setOfflineCookie failed");

			var output = ralTest.getOfflineCookie(c_name);
			if (output != null)
				equal(output, 'Dipak', "getOfflineCookie pass");
			else
				equal(output, null, "getOfflineCookie failed");
		});

		test("Test for get persistent Cookie", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.get_persistentCookie();
			equal(output, '', "get_persistentCookie pass");
		});

		test("Test for get RgCookie", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.get_RgCookie();
			equal(output, '', "get_RgCookie pass");
		});

		test("Test for get RzCookie", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.get_RzCookie();
			equal(output, '', "get_RzCookie pass");
		});

		test("Test for get RpCookie", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.get_RpCookie();
			equal(output, '', "get_RpCookie pass");
		});

		test("Test to set Geo Location", function() {
			var ralTest = new RAL.Library();
			if (JSON == null || JSON == "") {
				equal('', '', "Geolocation not available");
			} else {
				var output = ralTest.setGeoLocation(true);
				equal(output, undefined, "setGeoLocation pass");
			}
		});

		test("Test to check lzw_compress", function() {
			var ralTest = new RAL.Library();
			var compression_string = 'cybage';
			if (Base64 == null || Base64 == "") {
				equal(compression_string, 'cybage',
						"lzw_compress not available");
			} else {
				var encode_compress = Base64.lzw_compress(compression_string);
				var encoded_string = encode_compress[0] + '_'
						+ encode_compress[1] + '_' + encode_compress[2] + '_'
						+ encode_compress[3] + '_' + encode_compress[4] + '_'
						+ encode_compress[5];
				equal(encoded_string, '99_121_98_97_103_101',
						'lzw_compress pass');
			}
		});

		test("Test to check lzw_decompress", function() {
			var ralTest = new RAL.Library();
			var compression_string = 'cybage';
			if (Base64 == null || Base64 == "") {
				equal(compression_string, 'cybage',
						"lzw_decompress not available");
			} else {
				var encode_compress = Base64.encode(compression_string);
				var decode_compress = Base64.lzw_decompress(encode_compress);
				equal(decode_compress, 'cybage');
			}
		});

		test("Test for JSON.stringify", function() {
			var ralTest = new RAL.Library();
			if (JSON == null || JSON == "") {
				equal('', '', "JSON.stringify");
			} else {
				var output = JSON.stringify('Dipak Jain');
				equal(output, "\"Dipak Jain\"", 'JSON.stringify pass');
			}
		});

		test("Test for validateIntInput", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.validateIntInput();
			var flag = ralTest.validateIntInput(10);
			equal(flag, true, "input validated");
			flag = ralTest.validateIntInput('abc');
			equal(flag, false, "input not validated");
		});

		test("Test for chkSpecialChars", function() {
			var ralTest = new RAL.Library();
			var output = ralTest.chkSpecialChars('Dipak');
			equal(output, 'Dipak', "chkSpecialChars pass");
			output = ralTest.chkSpecialChars('#Dipak#');
			equal(output, '', "chkSpecialChars fail");

		});

		test("Test for reportConnectionEvent", function() {
			var ralTest = new RAL.Library();
			RAL_Namespace.reportConnectionEvent;
			var output = RAL_Namespace.onlineFlag;
			if (output) {
				equal(output, true, "User is online.");
			} else {
				equal(output, false, "User is offline.");
			}
		});

		test("Test for getLocation", function() {
			var ralTest = new RAL.Library();
			RAL_Namespace.getLocation();
			var a = 1;
			var b = 0;
			output = RAL_Namespace.locationSet;
			if (RAL_Namespace.locationSet == 1) {
				equal(output, a, "user location details are available");
			} else {
				equal(output, b, "user location details are not available");
			}
		});



})(window, document);

