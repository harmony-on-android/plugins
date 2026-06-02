/*
 * HMS Account API stubs for ArkUI-X
 *
 * Provides mock implementations of extendService namespace.
 * The compiled ABC is embedded into libhms_account.so.
 *
 * Module name:
 *   import extendService from '@hms.core.account.extendservice'
 *
 * Same flattened default export pattern as hms_security/hms_push.
 */

// =========================================================================
// extendService namespace — enums (values match SDK 23+ declarations)
// =========================================================================
var ExtendErrorCode = {
    INVALID_PARAMETER: 401,
    NETWORK_ERROR: 1001600001,
    ACCOUNT_NOT_LOGGED_IN: 1001600002,
    PACKAGE_FINGERPRINT_CHECK_ERROR: 1001600003,
    PERMISSION_CHECK_ERROR: 1001600004,
    USER_CANCELED: 1001600005,
    VERIFICATION_FACTOR_UNAVAILABLE: 1001600006,
    INTERNAL_ERROR: 1001600007,
    DEVICE_NOT_SUPPORTED: 1001600011
};

var IdType = {
    USER_ID: 1,
    OPEN_ID: 2,
    UNION_ID: 3
};

var RiskLevel = {
    LOW: 1,
    HIGH: 2
};

// =========================================================================
// extendService namespace — functions
// =========================================================================
function verifyAccount(context, request, callback) {
    var mockResult = {
        verifyToken: "mock-verify-token.eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJtb2NrLXVzZXIifQ.mock-signature"
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
}

function startAccountCenter(context, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

// =========================================================================
// Default export — flattened
// Methods: verifyAccount, startAccountCenter
// Enums:   ExtendErrorCode, IdType, RiskLevel
// =========================================================================
export default {
    verifyAccount,
    startAccountCenter,
    ExtendErrorCode,
    IdType,
    RiskLevel
};
