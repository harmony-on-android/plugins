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
// Default export (required by GetExportObjectFromBuffer("default"))
// Flattened: all methods from all namespaces are direct properties.
// Method names are unique across namespaces (no collisions).
// =========================================================================
export default {
    getDeviceToken,
    getAAID,
    deleteAAID,
    UrlThreatType,
    checkUrlThreat,
    checkSysIntegrity,
    checkSysIntegrityEnhanced,
    checkSysIntegrityOnLocal,
};
