/*
 * HMS Security API stubs for ArkUI-X
 *
 * Provides mock implementations of deviceCertificate, AAID, and safetyDetect
 * namespaces. The compiled ABC is embedded into libhms_security.so and loaded
 * via napi_module_with_js (ABC-only, same pattern as HDS).
 *
 * Since all 3 HMS modules (security.deviceCertificate, core.AAID,
 * security.safetyDetect) share the same .so and ABC, the default export
 * is flattened — every method and enum is a direct property.  This works
 * because all names are unique across the three namespaces. The "undefined
 * is not callable" error occurred when the default export was an aggregate
 * { deviceCertificate, AAID, safetyDetect }: import X from '@hms.X' would
 * get the aggregate, and X.method() would fail because method was nested
 * inside aggregate.X.
 *
 * Module name stripping: @hms:security.deviceCertificate → security.deviceCertificate
 */

// =========================================================================
// deviceCertificate namespace
// =========================================================================
function getDeviceToken() {
    return Promise.resolve("mock-device-token-00000000000000000000000000000000");
}

// =========================================================================
// AAID namespace
// =========================================================================
function getAAID(callback) {
    var mockAaid = "mock-aaid-00000000-0000-0000-0000-000000000000";
    if (typeof callback === 'function') {
        callback(undefined, mockAaid);
        return;
    }
    return Promise.resolve(mockAaid);
}

function deleteAAID(callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

// =========================================================================
// safetyDetect namespace — enums
// =========================================================================
var UrlThreatType = {
    NORMAL: 0,
    MALWARE: 1,
    PHISHING: 2,
    OTHERS: 3
};

// =========================================================================
// safetyDetect namespace — functions
// =========================================================================
function checkUrlThreat(req) {
    var results = [];
    if (req && req.urls) {
        for (var i = 0; i < req.urls.length; i++) {
            results.push({ url: req.urls[i], threat: UrlThreatType.NORMAL });
        }
    }
    return Promise.resolve({ results: results });
}

function checkSysIntegrity(req) {
    return Promise.resolve({
        result: '{"verified":true,"mock":true}'
    });
}

function checkSysIntegrityEnhanced(req) {
    return Promise.resolve({
        result: '{"verified":true,"enhanced":true,"mock":true}'
    });
}

function checkSysIntegrityOnLocal() {
    return Promise.resolve('{"verified":true,"local":true,"mock":true}');
}

// =========================================================================
// core.appgalleryservice.privacyManager namespace
// =========================================================================
function getAppPrivacyMgmtInfo(callback) {
    var mockInfo = {
        // AppPrivacyMgmtInfo fields
        privacyInfo: [
            {
                type: "privacy_statement",
                versionCode: 1,
                url: "about:blank"
            }
        ],
        isPrivacyAllowed: true,
        supportFeatures: []
    };
    if (typeof callback === 'function') {
        callback(undefined, mockInfo);
        return;
    }
    return mockInfo;
}

// =========================================================================
// userIAM.userAuth namespace — user identity & access management
// =========================================================================
function getAuthenticator() {
    return {};
}
function getAvailableStatus(authType, authTrustLevel) {
    return 0; // 0 = available
}
function auth(challenge, authType, authTrustLevel, callback) {
    if (typeof callback === 'function') {
        var result = { result: 0, token: 'mock-auth-token' }; // 0 = success
        callback(undefined, result);
    }
}
var UserAuthType = {
    PIN: 1,
    FACE: 2,
    FINGERPRINT: 4,
};
var UserAuthResult = {
    SUCCESS: 0,
    FAIL: -1,
    CANCEL: -2,
};
function checkAccessToken(tokenId, permission) {
    return 0; // 0 = GRANTED in ATM
}
function verifyAccessToken(tokenId, permission) {
    return Promise.resolve(0); // GRANTED
}

// =========================================================================
// Default export (required by GetExportObjectFromBuffer("default"))
// Flattened: all methods from all namespaces are direct properties.
// Method names are unique across namespaces (no collisions).
// =========================================================================
// Base exports with all known stub functions
var _exports = {
    getDeviceToken,
    getAAID,
    deleteAAID,
    UrlThreatType,
    checkUrlThreat,
    checkSysIntegrity,
    checkSysIntegrityEnhanced,
    checkSysIntegrityOnLocal,
    getAppPrivacyMgmtInfo,
    // userIAM.userAuth
    getAuthenticator,
    getAvailableStatus,
    auth,
    UserAuthType,
    UserAuthResult,
    checkAccessToken,
    verifyAccessToken,
};

// Wrap in a Proxy so any unknown property returns a no-op function.
// This prevents "undefined is not callable" when HAP code calls
// missing APIs — instead of throwing, the call silently succeeds.
function _noop() { return {}; }
_noop.isNoop = true;

export default new Proxy(_exports, {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return target[prop];
        }
        if (typeof prop === 'symbol') {
            return undefined;
        }
        // Return a noop for any unknown property — prevents
        // "Cannot read property X of undefined" and
        // "undefined is not callable" errors.
        return _noop;
    }
});
