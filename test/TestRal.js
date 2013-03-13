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

module("Public Methods");
test("Test to check validation of Account ID ", function () {
    
    var num = 11;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var negative = -11;
    var zero = 0;
    var rfloat = 10.5
    var numAsString = "10";

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID),
            num, "Setter for account id : Input number, expected Number");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can 't be negative: Input negative, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be 0: Input zero number, expected null: ");
    ralTest = new RAL.Library('Sample.html');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), null,
        "Account ID can't be float :Input 10.5, expected null:");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), parseInt(numAsString,10),
        "Account ID can be valid number passed as string :Input '10', expected 10:");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be alphanumeric: Input alphanumeric, expected null:");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be string: Input string, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be blank: Input blank, expected null: ");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be null : Input null, expected null: ");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be undefined : Input undefined, expected null: ");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setAccountId(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be specialchar: Input special char, expected null ");

    ralTest.setAccountId(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ACCOUNT_ID), rnull,
        "Account ID can't be object : Input object, expected null ");


});

/* it will check validation of Service ID */
test("Test to check validation of Service ID ", function () {
    
    var num = 11;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var negative = -11;
    var zero = 0;
    var rfloat = 10.5
    var numAsString = "10";

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), num,
        "Service ID number : Input number, expected number");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be negative:Input negative, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be zero :Input zero, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be float :Input 10.5, expected null:");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), 10,
        "Service ID can be valid number passed as string :Input '10', expected 10:");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be alphanumeric : Input alphanumeric, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
    	"Service ID can't be string : Input string, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be blank : Input blank, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be null : Input null, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be undefined : Input undefined, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be specialchar : Input special char, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setServiceId(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SERVICE_ID), null,
        "Service ID can't be object : Input object, expected null");

});

/* it will check validation of Price */
test("Test to check validation of Item Price ", function () {
    
    var num = 11;
    var rchar = 'test';
    var neg = -11;
    var zero = 0;
    var blank = '';
    var rfloat = 1.1;
    
    var alphanumeric = 'abc123';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    /////// addItemPrice(num, *) ///////
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0.00000000011], "Input 11, 11 : expected [0.00000000011]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11 , abc123 : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11, null : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [11], "Input 11, undefined : expected [11]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11, specialChar : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11, abc : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [11], "Input 11, -11 : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [11], "Input 11, 0 : expected [11]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11,'' : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 11, object : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(num, rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [1.1], "Input 11, 1.1 : expected [1.1]");

    /////// addItemPrice(neg, *) ///////
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [-0.00000000011], "Input -11, 11 : expected [-0.00000000011]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11 , abc123 : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11, null : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [-11], "Input -11, undefined : expected [-11]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11, specialChar : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11, abc : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [-11], "Input -11, -11 : expected [-11]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [-11], "Input -11, 0 : expected [-11]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11,'' : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input -11, object : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(neg, rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [-1.1], "Input -11, 1.1 : expected [-1.1]");

    /////// addItemPrice(zero, *) ///////
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE),[0], "Input 0, 11 : expected [0]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0 , abc123 : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0, null : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0], "Input 0, undefined : expected [0]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0, specialChar : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0, abc : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE),[0], "Input 0, -11 : expected [0]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0], "Input 0, 0 : expected [0]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0,'' : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 0, object : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(zero, rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0], "Input 0, 1.1 : expected [0]");

    /////// addItemPrice(float, *) ///////
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE),[0.00000000001], "Input 1.1, 11 : expected [0.00000000001]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1 , abc123 : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1, null : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [1], "Input 1.1, undefined : expected [1]");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1, specialChar : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1, abc : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [1], "Input 1.1, -11 : expected [1]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [1], "Input 1.1, 0 : expected [1]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1,'' : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input 1.1, object : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rfloat, rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0.1], "Input 1.1, 1.1 : expected [0.1]");

    /////// addItemPrice(*, num) ///////
    ////// Tests with invalid whole number inputs (alphanumeric, null, specialChars, characters, blank,object)
   
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(alphanumeric, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input abc123, 11  : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rnull, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input  null, 11 : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(specialChar, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input specialChar1, 11  : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(rchar, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input abc, 11  : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(blank, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input '', 11 : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(object, num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), null, "Input object, 11  : expected null");

     ///////Test Cases with Octal Input//////////////////

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(0100, 2);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [0.64] , "Input 0100, 2 : expected [0.64] as leading 0 converts 100 in octal to 64 in decimal ");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(100000000, 010);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [1] , "Input 100000000, 010 : expected [10]as leading 0 converts 010 in octal to 8 in decimal ");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(10001, 2);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [100.01], "Input 0010005, 02 : expected [1000.05]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemPrice(50, 1);
    ralTest.addItemPrice(100,1);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_PRICE), [5,10], "Input 50, 1 and 100 ,1 : expected array of [5,10]");
    

});


test(" Test to set Item Id", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [num +''], 'input 11 : expected ["11"]');

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [zero + ''], 'input 0 : expected ["0"]');

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [negative + ''], 'input -1234 : expected ["-1234"]');

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [rfloat + ''], 'input 10.5 : expected ["10.5"]');

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [numAsString], 'input "1234" : expected ["1234"]');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [alphanumeric], 'input alphanumeric : expected [alphanumeric]');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [rchar], 'input string : expected [string]');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), null, 'input null : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [specialChar], 'input specialchar : expected [specialchar]');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), null, 'input object : expected null');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemId(rchar);
    ralTest.addItemId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_ID), [rchar,rchar],
        "Input string1, string2, expected array of [string1, string2]");
});

/* it will check validation of Item Quantity*/
test("Test to check validation of Item Quantity ", function () {
    
    var num = 11;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var negative = -11;
    var zero = 0;
    var rfloat = 10.5
    var numAsString = "10";

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), [num],
        "Input number, expected [number]");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input negative, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input zero, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input 10.5, expected null:");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), [10],
        "Input '10', expected [10]");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input alphanumeric, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input string, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input blank, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input null, expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input undefined, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        "Input special char, expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), null,
        " Input object, expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.addItemQuantity(num);
    ralTest.addItemQuantity(num + num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.ITEM_QUANTITY), [11,22],
        "Input number1, number2, expected array of [number1, number2]");

});


/* it will check validation of Checkout */
test("Test to check validation of Checkout ", function () {
    
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var negative = -11;
    var zero = 0;
    var rfloat = 10.5
    var numAsString = "10";
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), num, 'Input number : expected number');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input zero : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input negative : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), parseInt(numAsString,10), 'Input "10" : expected 10');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT),null,'Input  float : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input alphanumeric : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input string : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input special char : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckout(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKOUT), null, 'Input object : expected null');
    

    
});


/* it will check validation of CheckPoint */
test("Test to check validation of CheckPoint", function () {
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), num, "Input integer : expected integer");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), zero, "Input zero : expected zero");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), negative, "Input negative number : expected negative number");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints('-123');
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), -123, "Input valid integer as string '-123' : expected -123");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), parseInt(rfloat,10), "Input float 10.5 : expected 10");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input alphanumeric : expected null");
                     
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input string : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input blank : expected null");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input null : expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints();//undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input undefined : expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input special chars : expected null");
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCheckPoints(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHECKPOINTS), null, "Input object : expected null");
    

});

/* it will check validation of Currency Code */
test("Test to check validation of Currency Code ", function () {
    
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var negative = -11;
    var zero = 0;
    var rfloat = 10.5
    var numAsString = "10";

    var currencyCodeLongString = 'INRUPEES';
    var currencycodeShortString = 'IN';
    var currencycodeExactString = 'INR';
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input numeric : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input negative : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input float : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input number as string : expected null");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input numeric : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input alphanumeric : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input blank : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input null : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input undefined : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input special chars : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input object : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(currencyCodeLongString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  "INR", "Input " + currencyCodeLongString +" : expected INR");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(currencycodeShortString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  null, "Input " + currencycodeShortString + " : expected null");
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCurrencyCode(currencycodeExactString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CURRENCY),  "INR", "Input " + currencycodeExactString + " : expected INR");
    

});

/* it will check AffiliateId */
test("Test to check Affiliate Id ", function () {
    
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var zero = 0;
    var neg = -10;
    var numAsString = '-123';
    var rfloat = 10.5;
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), num , 'input number : expected number');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), zero , 'input 0 : expected zero');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), neg , 'input -10 : expected -10');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), parseInt(rfloat,10) , 'input 10.5 : expected 10');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), parseInt(numAsString, 10) , "Valid num as string input '-123' : expected -123");

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input alphanumeric : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input string : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input blank : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input null : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input special chars : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setAffiliateId(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.AFFILIATE_ID), null , 'input object : expected null');

   
});


/* it will check custom param */
test("Test to check custom param ", function () {
    var custom_param = 'Company=Cybage';
    var custom_key = 'Company=';
    var custom_blank = '';

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCustomParameters(custom_param);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CUSTOM),
    	"Company=Cybage",
        "Custom parameters are working");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCustomParameters(custom_blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CUSTOM),
    null, "Custom parameters can't be empty");

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCustomParameters(custom_key);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CUSTOM),
    		"Company=", "Key is compulsary");

});

/* it will check call queue execute */

test("Test to set Char Set", function () {
       
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var zero = 0;
    var neg = -10;
    var numAsString = '-123';
    var rfloat = 10.5;
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), num + '', 'input num : expected "num"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), neg + '', 'input -10: expected "-10"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), rfloat + '', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), zero + '', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), numAsString, 'input 10.5 : expected "10.5"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), specialChar, 'input special chars : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCharSet(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CHARSET), null, 'input object : expected null');
    
});

test(" Test to set Referrer", function () {
    
    var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var zero = 0;
    var neg = -10;
    var numAsString = '-123';
    var rfloat = 10.5;
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setReferrer(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REFERRER), numAsString, 'input "10.5" : expected "10.5"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setReferrer(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REFERRER), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setReferrer(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REFERRER), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setReferrer(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REFERRER), specialChar, 'input special chars : expected specialChar');
         
});

test(" Test to set Goal Id", function () {
    
	var num = 10;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var zero = 0;
    var neg = -10;
    var numAsString = '-123';
    var rfloat = 10.5;
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), num + '', 'input num : expected "num"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(neg);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), neg + '', 'input -10: expected "-10"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), rfloat + '', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), zero + '', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), numAsString, 'input 10.5 : expected "10.5"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), specialChar, 'input special chars : expected special chars');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGoalId(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GOAL_ID), null, 'input object : expected null');
    
});



test(" Test to set Version", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '-123';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();

    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), num + '', 'input number : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), zero + '', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), negative + '', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), rfloat + '', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), numAsString, 'input "-123" : expected "-123"');
     
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), null, 'input undefined : expected undefined');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), specialChar, 'input specialchar : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setVersion(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VERSION), null, 'input object : expected null');
    
});

test(" Test to set Search Query", function () {
        
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '123';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), '11', 'input 11 : expected "11"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), '0', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), '-1234', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), '10.5', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY),numAsString, 'input "123" : expected "123"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery();//Undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), specialChar, 'input special chars : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setSearchQuery(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.SEARCH_QUERY), null, 'input object : expected null');
    
});

test(" Test to set Content Language", function () {
        
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), '11', 'input 11 : expected "11"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), '0', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), '-1234', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), '10.5', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE),numAsString , 'input "1234"" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage();//Undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), specialChar, 'input specialchar : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setContentLanguage(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CONTENT_LANGUAGE), null, 'input object : expected null');
    
});

test(" Test to set Campaign Code", function () {

    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input 11 : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input 0 : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input -1234 : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input 10.5 : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), numAsString, 'input "1234" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input specialchar : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.CAMPAIGN_CODE), null, 'input object : expected null');
    
});

test(" Test to set Request Result", function () {

    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), '11', 'input 11 : expected "11"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), '0', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), '-1234', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), '10.5', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), numAsString, 'input "1234" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult();//undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), null, 'input undefined : expected undefined');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), specialChar, 'input special chars : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setRequestResult(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.REQUEST_RESULT), null, 'input object : expected null');
    
});

test(" Test to set page Name", function () {

    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234';
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), '11', 'input 11 : expected "11"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), '0', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), '-1234', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), '10.5', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), numAsString, 'input "1234" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName();//undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), null, 'input undefined : expected undefined');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), specialChar, 'input special chars : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageName(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_NAME), null, 'input object : expected null');
    
});

test(" Test to set page Type", function () {

    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), '11', 'input 11 : expected "11"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), '0', 'input 0 : expected "0"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), '-1234', 'input -1234 : expected "-1234"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), '10.5', 'input 10.5 : expected "10.5"');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), numAsString, 'input "1234" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), null, 'input null : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType();//undefined
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), specialChar, 'input special chars : expected specialChar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setPageType(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.PAGE_TYPE), null, 'input object : expected null');
    
});

// data type specificaitions missing - TODO
test(" Test to set Genre", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(num);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), num, 'input 11 : expected 11');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(zero);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), zero, 'input 0 : expected 0');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(negative);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), negative, 'input -1234 : expected -1234');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(rfloat);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), rfloat, 'input 10.5 : expected 10.5');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(numAsString);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), numAsString, 'input "1234" : expected "1234"');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(alphanumeric);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), alphanumeric, 'input alphanumeric : expected alphanumeric');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(rchar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), rchar, 'input string : expected string');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(blank);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), null, 'input blank : expected null');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(rnull);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), null, 'input null : expected null');

    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), null, 'input undefined : expected null');
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(specialChar);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), specialChar, 'input specialchar : expected specialchar');
    
    ralTest = new RAL.Library('Sample.html');
    ralTest.setGenre(object);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.GENRE), null, 'input object : expected object');
});

test(" Test for detectFlashVersion", function () {
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
        if (flashMimeType.enabledPlugin && flashMimeType.enabledPlugin.description) {
            flashVersion = flashMimeType.enabledPlugin.description;
            hasFlash = true;
        }
    } else if (navigator.plugins && ('Shockwave Flash' in navigator.plugins)) {
        /** @type {Object} */
        var plugin = navigator.plugins['Shockwave Flash'];
        flashVersion = plugin.description.match(/[\d]+/g).join(
            '.');
        hasFlash = true;
    }

    try {
        if (!hasFlash) {
            /** @type {Object} */
            var axo = new ActiveXObject(
                'ShockwaveFlash.ShockwaveFlash');
            flashVersion = axo.GetVariable('$version');
        }
    } catch (exception) {
        !RELEASE && window.console && window.console.log('Unable to detect Adobe Flash(tm) version: ' + exception.toString());
    }

    var ralTest = new RAL.Library('Sample.html');
    ralTest.detectFlashVersion();
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.FLASH_VERSION), flashVersion, 'Flash version determined');
});

/*
function testGeoLocation(rt) {
	
    notEqual(rt._currentLocation[RAL.ParameterTypes.LATITUDE], null , 'got Latitude : getLocation pass');
    notEqual(rt._currentLocation[RAL.ParameterTypes.LONGITUDE], null , 'got Lognitude : getLocation pass');
    notEqual(rt._currentLocation[RAL.ParameterTypes.ACCURACY], null , 'got Accuracy : getLocation pass');
      
}

asyncTest( "asynchronous test: getLocation", 3, function() {
          var ralTest = new RAL.Library('Sample.html');
          ralTest.getLocation();
          stop();
          setTimeout(function () {
        	  testGeoLocation(ralTest);
        	  start();  
          }
          ,1500);
          
});
*/
module("Private Methods");
test(" Test to check is Internal Request", function () {
    
    var ralTest = new RAL.Library('Sample.html');
    // function returns null if the request is external
    // null is treated as false in javascript  
    var text=''
    if(ralTest._isRequestInternal()){
        text = 'This is a internal request';
        }
    else{
        text = "Running from browser, external request";
        }
    deepEqual(ralTest._isRequestInternal(), null, text);
});

test(" Test for get persistent Cookie", function () {
    
    var ralTest = new RAL.Library('Sample.html');
    var output = ralTest._getPersistentCookie();
    deepEqual(output, null, "Persistent cookie not set");
});

/* it will check Session cookie */
test("Test to check Session cookie ", function () {
    var cookie_value = '12345';
    var ralTest = new RAL.Library('Sample.html');
    var sessionCookie = ralTest._getSessionCookie();
    deepEqual(sessionCookie, cookie_value, "Session cookie exists");
});


function testJava(){

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
}
//assuming java is enabled
test(" Test to check java Enabled", function () {
    var ralTest = new RAL.Library('Sample.html');
    var output = ralTest._isJavaEnabled();
    var result =testJava();
    var text;
    if(result){
        text = 'Java is Enabled'
    }
    else{
    	text = 'Java is not Enabled'
    }
    deepEqual(output, result , text);
});

function getBrowserLanguage(){
    if (!navigator.browserLanguage) {
        if (!navigator.language) {
            return RAL._UNKNOWN_BROWSER_LANGUAGE;
        }

        return navigator.language;
    }

    return navigator.browserLanguage;
	
}

test(" Test for get browser language", function () {
    var bln = getBrowserLanguage();
    var ralTest = new RAL.Library('Sample.html');
    output = ralTest._getBrowserLanguage();
    deepEqual(output, bln, "getBrowserLanguage pass");
}); 



test(" Test for _getTabName", function () {
    var ralTest = new RAL.Library('Sample.html');
    var tabName1 = ralTest._getTabName();
    var tabName2 = ralTest._getTabName();
    deepEqual(tabName1, tabName2, 'Tab name persisting');
});

test(" Test for _isAlphabetic", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    var object = new Object();
    var ralTest = new RAL.Library('Sample.html');
    deepEqual(ralTest._isAlphabetic(num), false, 'Input: numeric');
    deepEqual(ralTest._isAlphabetic(zero), false, 'Input: zero');
    deepEqual(ralTest._isAlphabetic(negative), false, 'Input: negative');
    deepEqual(ralTest._isAlphabetic(rfloat), false, 'Input: float');
    deepEqual(ralTest._isAlphabetic(numAsString), false, 'Input: number as string');
    deepEqual(ralTest._isAlphabetic(alphanumeric), false, 'Input: alphanumeric');
    deepEqual(ralTest._isAlphabetic(rchar), true, 'Input: string');
    deepEqual(ralTest._isAlphabetic(blank), false, 'Input: blank');
    deepEqual(ralTest._isAlphabetic(rnull), false, 'Input: null');
    deepEqual(ralTest._isAlphabetic(), false, 'Input: undefined');
    deepEqual(ralTest._isAlphabetic(specialChar), false, 'Input: special chars');
    deepEqual(ralTest._isAlphabetic(object), false, 'Input: object');
});

test(" Test for _isAlphanumeric", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    var ralTest = new RAL.Library('Sample.html');
   
    deepEqual(ralTest._isAlphanumeric(num), false, 'Input: numeric');
    deepEqual(ralTest._isAlphanumeric(zero), false, 'Input: zero');
    deepEqual(ralTest._isAlphanumeric(negative), false, 'Input: negative');
    deepEqual(ralTest._isAlphanumeric(rfloat), false, 'Input: float');
    deepEqual(ralTest._isAlphanumeric(numAsString), true, 'Input: number as string');
    deepEqual(ralTest._isAlphanumeric(alphanumeric), true, 'Input: alphanumeric');
    deepEqual(ralTest._isAlphanumeric(rchar), true, 'Input: string');
    deepEqual(ralTest._isAlphanumeric(blank), false, 'Input: blank');
    deepEqual(ralTest._isAlphanumeric(rnull), false, 'Input: null');
    deepEqual(ralTest._isAlphanumeric(undef), false, 'Input: undefined');
    deepEqual(ralTest._isAlphanumeric(specialChar), false, 'Input: special chars');
    deepEqual(ralTest._isAlphanumeric(object), false, 'Input: object');

});

test(" Test for _isNumeric", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var alphanumeric1 = '123abc';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    var ralTest = new RAL.Library('Sample.html');
    deepEqual(ralTest._isNumeric(num), true, 'Input: numeric');
    deepEqual(ralTest._isNumeric(zero), false, 'Input: zero');
    deepEqual(ralTest._isNumeric(negative), false, 'Input: negative');
    deepEqual(ralTest._isNumeric(rfloat), false, 'Input: float');
    deepEqual(ralTest._isNumeric(numAsString), true, 'Input: number as string');
    deepEqual(ralTest._isNumeric(alphanumeric), false, 'Input: alphanumeric');
    deepEqual(ralTest._isNumeric(alphanumeric1), false, 'Input: alphanumeric');
    deepEqual(ralTest._isNumeric(rchar), false, 'Input: string');
    deepEqual(ralTest._isNumeric(blank), false, 'Input: blank');
    deepEqual(ralTest._isNumeric(rnull), false, 'Input: null');
    deepEqual(ralTest._isNumeric(undef), false, 'Input: undefined');
    deepEqual(ralTest._isNumeric(specialChar), false, 'Input: special chars');
    deepEqual(ralTest._isNumeric(object), false, 'Input: object');

});

test(" Test for isObject", function () {
    
    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var alphanumeric1 = '123abc';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    var ralTest = new RAL.Library('Sample.html');
    deepEqual(ralTest._isObject(num), false, 'Input: numeric');
    deepEqual(ralTest._isObject(zero), false, 'Input: zero');
    deepEqual(ralTest._isObject(negative), false, 'Input: negative');
    deepEqual(ralTest._isObject(rfloat), false, 'Input: float');
    deepEqual(ralTest._isObject(numAsString), false, 'Input: number as string');
    deepEqual(ralTest._isObject(alphanumeric), false, 'Input: alphanumeric');
    deepEqual(ralTest._isObject(alphanumeric1), false, 'Input: alphanumeric');
    deepEqual(ralTest._isObject(rchar), false, 'Input: string');
    deepEqual(ralTest._isObject(blank), false, 'Input: blank');
    deepEqual(ralTest._isObject(rnull), true, 'Input: null');
    deepEqual(ralTest._isObject(), false, 'Input: undefined');
    deepEqual(ralTest._isObject(specialChar), false, 'Input: special chars');
    deepEqual(ralTest._isObject(object), true, 'Input: object');

});

test(" Test for setReportingInterval", function () {

    var num = 11;
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(num);
    deepEqual(ralTest._reportingInterval, num, 'Input numeric : expected numeric');

    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(alphanumeric);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input alphanumeric : expected ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(rchar);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input string : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(blank);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input blank : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(rnull);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input null : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(undef);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input undefined : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(specialChar);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input specialChar : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setReportingInterval(object);
    deepEqual(ralTest._reportingInterval, RAL._DEFAULT_ANALYTICS_INTERVAL, 'Input object : expected  ' + RAL._DEFAULT_ANALYTICS_INTERVAL);
    
}); 


test(" Test for _trimString", function () {

    var trimmedString = RAL._trimString('  abcdefghijkl');
    deepEqual(trimmedString, 'abcdefghijkl' , 'Trimming leading spaces');
    
    trimmedString = RAL._trimString('abcdefghijkl  ');
    deepEqual(trimmedString, 'abcdefghijkl' , 'Trimming trailing spaces');
    
    trimmedString = RAL._trimString('  abcdefghijkl  ');
    deepEqual(trimmedString, 'abcdefghijkl' , 'Trimming leading and trailing spaces');

});

test(" Test for _getCookie and setcookie", function () {

    RAL._setCookie('RAL_COOKIE_ToSetGet', 'RALJS', '1')
    var trimmedString = RAL._getCookie('RAL_COOKIE_ToSetGet');
    deepEqual(trimmedString, 'RALJS' , 'setCookie and getCookie works');
});

test(" Test for setcookie and _removeCookie", function () {

    RAL._setCookie('RAL_COOKIE_ToREMOVE', 'RALJS1', '1')
    RAL._removeCookie('RAL_COOKIE_ToREMOVE'); 
    var cookieString = RAL._getCookie('RAL_COOKIE_ToREMOVE');
    deepEqual(cookieString, null , 'setcookie and _removeCookie works');
});

function setNonRALCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getNonRALCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
	    {
	    return unescape(y);
	    }
	  }
	}


test(" Test for CookieStorage clear", function () {
    var cookieStorage = new RAL.CookieStorage();
    var c_name = 'Non_RAL_Key';
    var value = 'Non_RAL_Cookie';
    var exdays = 1;
    setNonRALCookie(c_name,value,exdays);
    cookieStorage.setForKey('_COOKIE_ToCLEAR', 'RALJS2');
    setNonRALCookie()
    cookieStorage.clear(); 
    deepEqual(cookieStorage.getForKey('_COOKIE_ToCLEAR'), null , 'CookieStorage clear works');
    deepEqual(getNonRALCookie(c_name), value , 'CookieStorage clear only cookies created by RAL.js');

});

test(" Test for CookieStorage removeKey", function () {
    var cookieStorage = new RAL.CookieStorage();
    cookieStorage.setForKey('RAL_COOKIE1', 'RALJS1');
    cookieStorage.removeKey('RAL_COOKIE1'); 
    deepEqual(cookieStorage.getForKey('RAL_COOKIE1'), null , 'CookieStorage removeKey works');
});

/* To test localstorage's set key */
 

test("Test for localstorage's set key", function () {

    var ralTest = new RAL.LocalStorage();
    var key = '_LocalStorage_Set';
    var value = 'LocalStorage1';
    deepEqual(ralTest.setForKey(key,value), true, 'Localstorage set key test pass');

});

/* To test localstorage's getForKey key */
test("Test for localstorage's getForKey ", function () {
    var ralTest = new RAL.LocalStorage();
    var key = '_LocalStorage_Get';
    var value = 'LocalStorage2';
    ralTest.setForKey(key,value);
    deepEqual(ralTest.getForKey(key), value, 'Localstorage get key test pass');
});

/* To test localstorage's remove key */
test(" Test for localstorage's remove key", function () {
    var ralTest = new RAL.LocalStorage();
    var key = '_LocalStorage_Remove';
    var value = 'LocalStorage3';
    ralTest.setForKey(key,value);
    deepEqual(ralTest.getForKey(key), value, 'Value is successfully stored in localstorage against given key');
    ralTest.removeKey(key);
    deepEqual(ralTest.getForKey(key), null, 'Localstorage remove key test pass');
});


test(" Test for LocalStorage clear", function () {
    var ralTest = new RAL.LocalStorage();
    var key = '_LocalStorage_Clear';
    var value = 'LocalStorage4';
    var value1 = 'LocalStorage5';
    ralTest.setForKey(key, value);
    window.localStorage.NonRAL_Key = value1;
    ralTest.clear();
    deepEqual(ralTest.getForKey(key), null , 'LocalStorage clear works');
    deepEqual(window.localStorage.NonRAL_Key , value1 , 'LocalStorage clear removes entries created by RAL.js only');
});
 

test(" Test for setViewImpressions", function () {
    
    var ralTest = new RAL.Library('Sample.html');
    var myCars = new Array("Saab", "Volvo", "BMW");
    ralTest.setViewImpressions(myCars);
    deepEqual(ralTest._parameters.get(RAL.ParameterTypes.VIEW_IMPRESSIONS), myCars , 'setViewImpressions pass');
});

test(" Test for _getTimestamp", function () {

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

    var time = today.getFullYear() + '-' +
    (month < 10 ? '0' : '') + month + '-' +
    (day < 10 ? '0' : '') + day + ' ' +
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
    
    var ralTest = new RAL.Library('Sample.html');
    var timeStamp = ralTest._getTimestamp();
    deepEqual(timeStamp, time , '_getTimestamp pass');
});
  
test(" Test for _isValid", function () {

    var num = 11;
    var zero = 0;
    var negative = -1234;
    var rfloat = 10.5;
    var numAsString = '1234'
    var alphanumeric = 'abc123';
    var rchar = 'test';
    var blank = '';
    var rnull = null;
    var undef = undefined;
    var specialChar = '!@#$%%^^&%^&*^*(())';
    var object = new Object();
    var bool = true;
    
    var paramContainer = new RAL.ParametersContainer();

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(num), true, '_isValid Number: pass');

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(zero), true, '_isValid zero: pass');

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(negative), true, '_isValid negative: pass');

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(rfloat), true, '_isValid float: pass');

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(numAsString), true, '_isValid Number as string: pass');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(alphanumeric), true, '_isValid Number: alphanumeric');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(rchar), true, '_isValid Number: string');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(blank), false , '_isValid: blank pass');

    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(rnull), false , '_isValid: null pass');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(undef), false , '_isValid: undefined pass');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(specialChar), true, '_isValid String: pass');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(object), true , '_isValid Object pass');
    
    paramContainer = new RAL.ParametersContainer();
    deepEqual(paramContainer._isValid(bool), true , '_isValid: Boolean pass');
    
});

test(" Test for clear", function () {
    var ralTest = new RAL.Library('Sample.html');
    var paramContainer = new RAL.ParametersContainer();
    ralTest._parameters = ""; 
    paramContainer.clear();
    deepEqual(ralTest._parameters, "", 'ParametersContainer clear : pass');
});

test(" Test for ParametersContainer remove and get", function () {

    var paramContainer = new RAL.ParametersContainer();
    paramContainer.insert('key', 'value');
    paramContainer.remove('key');
    deepEqual(paramContainer.get('key'), null, 'ParametersContainer remove and get: pass');
});

test(" Test for ParametersContainer haskey", function () {

    var paramContainer = new RAL.ParametersContainer();
    paramContainer.insert('key', 'value');
    deepEqual(paramContainer.hasKey('key'), true, 'ParametersContainer remove and get: pass');
});

test(" Test for ParametersContainer setForKey", function () {
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode('ASDF');
    var paramContainer = new RAL.ParametersContainer();
    paramContainer.clear();
    ralTest._parameters.remove();
    deepEqual(ralTest._parameters.cc, undefined, 'ParametersContainer remove : pass');
});
/*
test(" Test for ParametersContainer clone", function () {
    var ralTest = new RAL.Library('Sample.html');
    ralTest.setCampaignCode('ASDF');
    var paramContainer = new RAL.ParametersContainer();
    var cloned = paramContainer.clone();
    ralTest._parameters.remove();
    deepEqual(ralTest._parameters.cc, undefined, 'ParametersContainer remove : pass');
});
*/
test(" Test for _mergeDictionaries", function () {
    var items = {
              "foo" : 123456,
              "bar" : 789012,
              "baz" : 345678,
              "bat" : 901234
                };
    var items1 = {
              "foo1" : 1234561,
              "bar1" : 7890121,
              "baz1" : 3456781,
              "bat1" : 9012341
                 };
    var retVal = RAL._mergeDictionaries(items,items1);
    deepEqual(retVal, true, '_mergeDictionaries: Boolean pass');
});

test(" Test for setParameters", function () {
    
    var ralTest = new RAL.Library('Sample.html');
    var items1 = {
              "foo1" : 1234561,
              "bar1" : 7890121,
              "baz1" : 3456781,
              "bat1" : 9012341
             };
    ralTest.setParameters(items1);
    deepEqual( ralTest._parameters.get('foo1'), items1.foo1, 'setParameters : pass');
    deepEqual( ralTest._parameters.get('bar1'), items1.bar1, 'setParameters : pass');
    deepEqual( ralTest._parameters.get('baz1'), items1.baz1, 'setParameters : pass');
    deepEqual( ralTest._parameters.get('bat1'), items1.bat1, 'setParameters : pass');
});

test(" Test for appendParameters", function () {
    
    var ralTest = new RAL.Library('Sample.html');
    var items1 = {
              "foo1" : 1234561,
              "bar1" : 7890121,
              "baz1" : 3456781,
              "bat1" : 9012341
             };
    ralTest.appendParameters(items1);
    deepEqual( ralTest._parameters.get('foo1'), [items1.foo1], 'appendParameters : pass');
    deepEqual( ralTest._parameters.get('bar1'), [items1.bar1], 'appendParameters : pass');
    deepEqual( ralTest._parameters.get('baz1'), [items1.baz1], 'appendParameters : pass');
    deepEqual( ralTest._parameters.get('bat1'), [items1.bat1], 'appendParameters : pass');
});

})(window, document);

