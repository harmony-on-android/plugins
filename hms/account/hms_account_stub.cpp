/*
 * HMS Account API stub for ArkUI-X
 *
 * Registers NAPI module "core.account.extendservice" so that HAPs
 * importing from @hms.core.account.extendservice can resolve successfully.
 *
 * All exports are provided by the embedded ABC (hms_account_mock.abc).
 * nm_register_func is nullptr — ABC-only mode, same pattern as HDS/security/push.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

extern const char _binary_hms_account_mock_abc_start[];
extern const char _binary_hms_account_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_hms_account_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_hms_account_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_hms_account_mock_abc_end - _binary_hms_account_mock_abc_start;
    }
}

// core.account.extendservice
static napi_module_with_js g_extendServiceModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.account.extendservice",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_account_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterExtendService()
{
    napi_module_with_js_register(&g_extendServiceModule);
}

}  // namespace
}  // namespace OHOS::Plugin
