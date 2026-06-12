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

// core.appgalleryservice.privacyManager
static napi_module_with_js g_privacyManagerModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "core.appgalleryservice.privacyManager",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_security_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterPrivacyManager()
{
    napi_module_with_js_register(&g_privacyManagerModule);
}

// userIAM.userAuth
static napi_module_with_js g_userAuthModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "userIAM.userAuth",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hms_security_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterUserAuth()
{
    napi_module_with_js_register(&g_userAuthModule);
}

// ── Additional failing module stubs ──
// Register all missing @ohos/@hms modules with the same ABC so they
// resolve to a non-undefined object.  Constructors are numbered to avoid
// collisions because module names contain dots (not valid C identifiers).
#define REGISTER_MODULE(idx, modname)                                 \
    static napi_module_with_js g_missingModule_##idx = {              \
        .nm_version  = 1, .nm_flags = 0, .nm_filename = nullptr,      \
        .nm_register_func = nullptr,                                   \
        .nm_modname  = modname,                                        \
        .nm_priv     = nullptr,                                        \
        .nm_get_abc_code = NAPI_hms_security_GetABCCode,              \
        .nm_get_js_code = nullptr,                                     \
    };                                                                 \
    extern "C" __attribute__((constructor)) void RegisterMissing##idx() \
    {                                                                  \
        napi_module_with_js_register(&g_missingModule_##idx);          \
    }

REGISTER_MODULE(0, "distributedDeviceManager")
REGISTER_MODULE(1, "data.cloudData")
REGISTER_MODULE(2, "security.asset")
REGISTER_MODULE(3, "file.cloudSync")
REGISTER_MODULE(4, "file.fileuri")
REGISTER_MODULE(5, "app.form.formProvider")
REGISTER_MODULE(6, "app.form.formBindingData")
REGISTER_MODULE(7, "arkui.ArcList")
REGISTER_MODULE(8, "arkui.advanced.ArcButton")
// @hms
REGISTER_MODULE(9, "security.dlpAntiPeep")
REGISTER_MODULE(10, "core.scan.scanBarcode")
REGISTER_MODULE(11, "core.scan.scanCore")
REGISTER_MODULE(12, "core.scan.generateBarcode")
REGISTER_MODULE(13, "core.authentication")

#undef REGISTER_MODULE

}  // namespace
}  // namespace OHOS::Plugin
