/*
 * HMS HDS Base Component stub for ArkUI-X
 *
 * Registers a NAPI module "hds.hdsBaseComponent" so that
 *   import { HdsNavigation } from '@hms:hds.hdsBaseComponent'
 * can resolve (the runtime strips "@hms:" and calls
 * requireNapi("hds.hdsBaseComponent")).
 */

#include "inner_api/plugin_utils_napi.h"
#include "plugin_utils.h"

#include "napi/native_api.h"
#include "napi/native_common.h"

namespace OHOS::Plugin {
namespace {

napi_value StubCallback(napi_env env, napi_callback_info /*info*/)
{
    napi_value result = nullptr;
    napi_get_undefined(env, &result);
    return result;
}

napi_value ExportHdsBaseComponent(napi_env env, napi_value exports)
{
    // --- ScrollEffectType enum ---
    {
        napi_value obj;
        napi_create_object(env, &obj);
        napi_value v;
        napi_create_int32(env, 0, &v);
        napi_set_named_property(env, obj, "COMMON_BLUR", v);
        napi_set_named_property(env, exports, "ScrollEffectType", obj);
    }

    // --- HdsNavigationTitleMode enum ---
    {
        napi_value obj;
        napi_create_object(env, &obj);
        napi_value v;
        napi_create_int32(env, 0, &v);
        napi_set_named_property(env, obj, "FREE", v);
        napi_create_int32(env, 1, &v);
        napi_set_named_property(env, obj, "FULL", v);
        napi_create_int32(env, 2, &v);
        napi_set_named_property(env, obj, "MINI", v);
        napi_set_named_property(env, exports, "HdsNavigationTitleMode", obj);
    }

    // --- Delegate HdsNavigation / HdsNavDestination to standard built-ins ---
    // Navigation and NavDestination are registered as global JS classes
    // (JSNavigation::JSBind / JSNavDestination::JSBind).  Re-export them
    // under the HMS names so that import { HdsNavigation } from
    // '@hms:hds.hdsBaseComponent' actually gets the real components.
    napi_value global;
    if (napi_get_global(env, &global) == napi_ok) {
        napi_value nav;
        if (napi_get_named_property(env, global, "Navigation", &nav) == napi_ok) {
            napi_set_named_property(env, exports, "HdsNavigation", nav);
        }
        if (napi_get_named_property(env, global, "NavDestination", &nav) == napi_ok) {
            napi_set_named_property(env, exports, "HdsNavDestination", nav);
        }
    }

    // --- Remaining stubs (instance / attribute helpers) ---
    static constexpr const char* kStubNames[] = {
        "HdsNavigationInstance",
        "HdsNavDestinationInstance",
        "HdsNavigationAttribute",
        "HdsNavDestinationAttribute",
    };

    for (const auto* name : kStubNames) {
        napi_value fn;
        napi_create_function(env, name, NAPI_AUTO_LENGTH,
                             StubCallback, nullptr, &fn);
        napi_set_named_property(env, exports, name, fn);
    }

    return exports;
}

napi_module g_hdsBaseComponentModule = {
    .nm_version  = 1,
    .nm_flags    = 0,
    .nm_filename = nullptr,
    .nm_register_func = ExportHdsBaseComponent,
    .nm_modname  = "hds.hdsBaseComponent",
    .nm_priv     = nullptr,
    .reserved    = {0},
};

}  // namespace

extern "C" __attribute__((constructor)) void RegisterHdsBaseComponent()
{
    napi_module_register(&g_hdsBaseComponentModule);
}

}  // namespace OHOS::Plugin
