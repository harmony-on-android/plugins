/*
 * HMS Push API stub for ArkUI-X
 *
 * Registers NAPI modules "core.push.pushService" and "core.push.pushCommon"
 * so that HAPs importing from
 *   @hms.core.push.pushService
 *   @hms.core.push.pushCommon
 * can resolve successfully.
 *
 * All exports are provided by the embedded ABC (hms_push_mock.abc).
 * nm_register_func is nullptr — ABC-only mode, same pattern as HDS/security.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

extern const char _binary_hms_push_mock_abc_start[];
extern const char _binary_hms_push_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_hms_push_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_hms_push_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_hms_push_mock_abc_end - _binary_hms_push_mock_abc_start;
    }
}

// core.push.pushService
static napi_module_with_js g_pushServiceModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.push.pushService",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_push_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterPushService()
{
    napi_module_with_js_register(&g_pushServiceModule);
}

// core.push.pushCommon
static napi_module_with_js g_pushCommonModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.push.pushCommon",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_push_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterPushCommon()
{
    napi_module_with_js_register(&g_pushCommonModule);
}

}  // namespace
}  // namespace OHOS::Plugin
