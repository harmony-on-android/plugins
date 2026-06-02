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

function purchase(context, parameter, callback) {
    var mockResult = {
        code: 0,
        message: "mock-purchase-success",
        purchaseToken: "mock-purchase-token-00000000-0000-0000-0000-000000000000",
        productId: "mock-product-001",
        productType: ProductType.CONSUMABLE
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
}

function createPurchase(context, parameter, callback) {
    var mockResult = {
        code: 0,
        message: "mock-create-purchase-success",
        purchaseToken: "mock-create-token-00000000-0000-0000-0000-000000000000"
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
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
    var mockResult = {
        code: 0,
        message: "mock-consume-success"
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
}

function finishPurchase(context, parameter, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

// =========================================================================
// paymentService namespace — functions
// =========================================================================
function requestPayment(context, orderStr, payload, callback) {
    var mockResult = {
        code: 0,
        message: "mock-payment-success"
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
}

function cashierPicker(context, paymentInfo) {
    var mockResult = {
        code: 0,
        message: "mock-picker-success"
    };
    return Promise.resolve(mockResult);
}

function requestContract(context, contractStr, callback) {
    if (typeof callback === 'function') {
        callback(undefined);
        return;
    }
    return Promise.resolve();
}

function requestBindCard(context, callback) {
    var mockResult = {
        code: 0,
        message: "mock-bind-card-success"
    };
    if (typeof callback === 'function') {
        callback(undefined, mockResult);
        return;
    }
    return Promise.resolve(mockResult);
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
