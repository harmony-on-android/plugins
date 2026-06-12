/*
 * ArkUI Component bridge module for ArkUI-X CROSS_PLATFORM.
 *
 * Registers NAPI module "ohos.arkui.component" so that HAPs importing
 * `{ BottomTabBarStyle } from '@kit.ArkUI'` (which compiles to
 * LDEXTERNALMODULEVAR @ohos:arkui.component) can resolve successfully.
 *
 * All exports are provided by the embedded ABC (arkui_component_mock.abc).
 * The ABC-only approach matches the HDS plugin pattern — nm_register_func
 * is nullptr so the module is loaded purely from ABC bytecode.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

// Embedded ABC bytecode (generated from src/arkui_component_mock.js via llvm-objcopy)
extern const char _binary_arkui_component_mock_abc_start[];
extern const char _binary_arkui_component_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

extern "C" __attribute__((visibility("default")))
void NAPI_arkui_component_GetABCCode(const char** buf, int* buflen)
{
    if (buf) {
        *buf = _binary_arkui_component_mock_abc_start;
    }
    if (buflen) {
        *buflen = static_cast<int>(
            _binary_arkui_component_mock_abc_end - _binary_arkui_component_mock_abc_start);
    }
}

// Module registration for ohos.arkui.component (ABC-only)
static napi_module_with_js g_componentModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = nullptr,     // ABC-only — all exports come from the ABC
    .nm_modname  = "ohos.arkui.component",
    .nm_priv     = nullptr,
    .nm_get_abc_code = NAPI_arkui_component_GetABCCode,
    .nm_get_js_code = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterArkUIComponentModule()
{
    napi_module_with_js_register(&g_componentModule);
}

}  // namespace
}  // namespace OHOS::Plugin
