/*
 * HMS IAP + Payment API stubs for ArkUI-X
 *
 * Provides mock implementations of iap and paymentService namespaces.
 * The compiled ABC is embedded into libhms_iap.so.
 *
 * Module names:
 *   import iap from '@hms.core.iap'
 *   import paymentService from '@hms.core.payment.paymentService'
 *
 * Same flattened default export pattern as hms_security/hms_push.
 * All function/enum names are unique across both namespaces.
 */

// =========================================================================
// iap namespace — enums
// =========================================================================
var ProductType = {
    CONSUMABLE: 0,
    NON_CONSUMABLE: 1,
    AUTO_RENEWABLE: 2,
    NON_RENEWABLE: 3
};

// =========================================================================
// iap namespace — functions
// =========================================================================
function queryEnvironmentStatus(context, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

function queryProducts(context, parameter, callback) {
    var mockProducts = [];
    if (typeof callback === 'function') {
        callback(undefined, mockProducts);
        return;
    }
    return Promise.resolve(mockProducts);
}

// Payment write operations always fail — HOA has no real IAP backend.
// Returning success would mislead HAPs into thinking a payment succeeded.

function purchase(context, parameter, callback) {
    var err = { code: 1001860007, message: "HOA: IAP not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

function createPurchase(context, parameter, callback) {
    var err = { code: 1001860007, message: "HOA: IAP not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

function queryOwnedPurchases(context, parameter, callback) {
    var mockResult = {
        code: 0,
        message: "success",
        ownedPurchases: []
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
}

function consumePurchase(context, parameter, callback) {
    var err = { code: 1001860007, message: "HOA: IAP not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

function finishPurchase(context, parameter, callback) {
    var err = { code: 1001860007, message: "HOA: IAP not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

// =========================================================================
// paymentService namespace — functions
// =========================================================================
function requestPayment(context, orderStr, payload, callback) {
    var err = { code: 1001860008, message: "HOA: payment not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

function cashierPicker(context, paymentInfo) {
    var err = { code: 1001860008, message: "HOA: payment not supported" };
    return Promise.reject(err);
}

function requestContract(context, contractStr, callback) {
    var err = { code: 1001860008, message: "HOA: payment not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

function requestBindCard(context, callback) {
    var err = { code: 1001860008, message: "HOA: payment not supported" };
    if (typeof callback === 'function') {
        callback(err);
        return;
    }
    return Promise.reject(err);
}

// =========================================================================
// Default export — flattened, all names unique across both namespaces
// Methods: queryEnvironmentStatus, queryProducts, purchase, createPurchase,
//          queryOwnedPurchases, consumePurchase, finishPurchase,
//          requestPayment, cashierPicker, requestContract, requestBindCard
// Enums:   ProductType
// =========================================================================
export default {
    queryEnvironmentStatus,
    queryProducts,
    purchase,
    createPurchase,
    queryOwnedPurchases,
    consumePurchase,
    finishPurchase,
    requestPayment,
    cashierPicker,
    requestContract,
    requestBindCard,
    ProductType
};
