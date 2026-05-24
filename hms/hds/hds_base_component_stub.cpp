/*
 * HMS HDS Base Component stub for ArkUI-X
 *
 * Registers NAPI modules "hds.hdsBaseComponent" and "UIDesignKit" so that
 * HAPs importing from '@hms:hds.hdsBaseComponent' / '@kit.UIDesignKit'
 * can resolve successfully.
 *
 * All exports (components, enums, stubs, delegations) are provided by the
 * embedded ABC (hds_mock.abc). The ABC-only approach matches the popup
 * plugin pattern — nm_register_func is nullptr so the module is loaded
 * purely from ABC bytecode.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

// Embedded ABC bytecode (generated from src/hds_component_mock.js via llvm-objcopy)
// Must be at file scope (outside any namespace) so the linker matches C symbols.
extern const char _binary_hds_mock_abc_start[];
extern const char _binary_hds_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_hds_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_hds_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_hds_mock_abc_end - _binary_hds_mock_abc_start;
    }
}

// Module registration for hds.hdsBaseComponent (ABC-only, no register_func)
static napi_module_with_js g_hdsBaseComponentModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "hds.hdsBaseComponent",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hds_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterHdsBaseComponent()
{
    napi_module_with_js_register(&g_hdsBaseComponentModule);
}

// Module registration for UIDesignKit (same ABC, different module name)
static napi_module_with_js g_uidKitModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,
    .nm_modname  = "UIDesignKit",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_hds_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterUIDesignKit()
{
    napi_module_with_js_register(&g_uidKitModule);
}

}  // namespace
}  // namespace OHOS::Plugin
