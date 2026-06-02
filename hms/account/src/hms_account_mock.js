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
// extendService namespace — enums
// =========================================================================
var ExtendErrorCode = {
    INTERNAL_ERROR: 1001600000,
    NETWORK_ERROR: 1001600001,
    USER_CANCEL: 1001600002,
    PERMISSION_DENIED: 1001600003
};

var IdType = {
    ID_CARD: 0,
    PASSPORT: 1,
    DRIVER_LICENSE: 2
};

var RiskLevel = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
};

// =========================================================================
// extendService namespace — functions
// =========================================================================
function verifyAccount(context, request, callback) {
    var mockResult = {
        resultCode: 0,
        idType: "ID_CARD",
        idNumber: "mock-identity-****************",
        name: "Mock User",
        riskLevel: RiskLevel.LOW
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
