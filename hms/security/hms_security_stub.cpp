/*
 * HMS Security API stub for ArkUI-X
 *
 * Registers NAPI modules "security.deviceCertificate", "core.AAID", and
 * "security.safetyDetect" so that HAPs importing from
 *   @hms:security.deviceCertificate
 *   @hms:core.AAID
 *   @hms:security.safetyDetect
 * can resolve successfully.
 *
 * All exports are provided by the embedded ABC (hms_security_mock.abc).
 * nm_register_func is nullptr — ABC-only mode, same as HDS pattern.
 *
 * Module name stripping in the ETS runtime:
 *   GetStrippedModuleName("@hms:security.deviceCertificate") → "security.deviceCertificate"
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

extern const char _binary_hms_security_mock_abc_start[];
extern const char _binary_hms_security_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_hms_security_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_hms_security_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_hms_security_mock_abc_end - _binary_hms_security_mock_abc_start;
    }
}

// security.deviceCertificate
static napi_module_with_js g_deviceCertModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "security.deviceCertificate",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_security_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterDeviceCertificate()
{
    napi_module_with_js_register(&g_deviceCertModule);
}

// core.AAID
static napi_module_with_js g_aaidModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.AAID",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_security_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterAAID()
{
    napi_module_with_js_register(&g_aaidModule);
}

// security.safetyDetect
static napi_module_with_js g_safetyDetectModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "security.safetyDetect",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_security_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterSafetyDetect()
{
    napi_module_with_js_register(&g_safetyDetectModule);
}

}  // namespace
}  // namespace OHOS::Plugin
