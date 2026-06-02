/*
 * HMS IAP + Payment API stub for ArkUI-X
 *
 * Registers NAPI modules "core.iap" and "core.payment.paymentService"
 * so that HAPs importing from
 *   @hms.core.iap
 *   @hms.core.payment.paymentService
 * can resolve successfully.
 *
 * All exports are provided by the embedded ABC (hms_iap_mock.abc).
 * nm_register_func is nullptr — ABC-only mode, same pattern as HDS/security/push.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

extern const char _binary_hms_iap_mock_abc_start[];
extern const char _binary_hms_iap_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_hms_iap_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_hms_iap_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_hms_iap_mock_abc_end - _binary_hms_iap_mock_abc_start;
    }
}

// core.iap
static napi_module_with_js g_iapModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.iap",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_iap_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterIap()
{
    napi_module_with_js_register(&g_iapModule);
}

// core.payment.paymentService
static napi_module_with_js g_paymentServiceModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.payment.paymentService",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_iap_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterPaymentService()
{
    napi_module_with_js_register(&g_paymentServiceModule);
}

}  // namespace
}  // namespace OHOS::Plugin
