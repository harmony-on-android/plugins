/*
 * HMS Push API stubs for ArkUI-X
 *
 * Provides mock implementations of pushService and pushCommon namespaces.
 * The compiled ABC is embedded into libhms_push.so.
 *
 * Module names:
 *   import pushService from '@hms.core.push.pushService'
 *   import pushCommon from '@hms.core.push.pushCommon'
 *
 * Same flattened default export pattern as hms_security — all methods and
 * types from both namespaces are direct properties of the default export.
 */

// =========================================================================
// pushCommon namespace — enums and types
// =========================================================================
var AppProfileType = {
    PROFILE_TYPE_OS_DISTRIBUTED_ACCOUNT: 1,
    PROFILE_TYPE_APPLICATION_ACCOUNT: 2
};

// =========================================================================
// pushService namespace — enums and types
// =========================================================================
var PushType = {
    DEFAULT: 'DEFAULT',
    IM: 'IM',
    VoIP: 'VoIP',
    BACKGROUND: 'BACKGROUND',
    EMERGENCY: 'EMERGENCY'
};

// =========================================================================
// pushService namespace — functions
// =========================================================================
function getToken(callback) {
    var mockToken = "mock-push-token-00000000000000000000000000000000";
    if (typeof callback === 'function') {
        callback(undefined, mockToken);
        return;
    }
    return Promise.resolve(mockToken);
}

function deleteToken(callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

function receiveMessage(pushType, ability, onMessage) {
    // no-op: mock push service doesn't deliver messages
}

function bindAppProfileId(appProfileType, appProfileId, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

function unbindAppProfileId(appProfileId, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

function on(type, arg2, arg3) {
    // no-op: mock push service doesn't fire events
}

function off(type, callback) {
    // no-op
}

// =========================================================================
// Default export — flattened, all names unique across both namespaces
// Methods: getToken, deleteToken, receiveMessage, bindAppProfileId,
//          unbindAppProfileId, on, off
// Enums:   PushType, AppProfileType
// =========================================================================
export default {
    getToken,
    deleteToken,
    receiveMessage,
    bindAppProfileId,
    unbindAppProfileId,
    on,
    off,
    PushType,
    AppProfileType,
};
