/*
 * HMS HDS Base Component stub for ArkUI-X
 *
 * Registers a NAPI module "hds.hdsBaseComponent" so that HAPs importing
 * from '@hms:hds.hdsBaseComponent' can resolve successfully.
 *
 * Based on the official HMS SDK declaration file
 * (@hms.hds.hdsBaseComponent.d.ets, @kit.UIDesignKit, since 5.1.0(18)).
 *
 * Strategy:
 *   - HdsNavigation  → delegated to standard ArkUI Navigation  (global JSBind)
 *   - HdsNavDestination → delegated to standard ArkUI NavDestination (global JSBind)
 *   - Instance / Attribute helpers → stubbed (return undefined)
 *   - Enums (ScrollEffectType, HdsNavigationTitleMode) → exported as-is
 *
 * The ArkUI framework is tolerant of stub Attribute/Instance helpers for
 * basic rendering; HDS-specific visual styling (title bar theming, scroll
 * effects) is silently degraded.
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
    // (JSNavigation::JSBind / JSNavDestination::JSBind).
    // Also pre-delegate HdsTabs→Tabs, HdsListItemCard→ListItem — these are
    // in the compiler whitelist (ohApi.ts) and may ship in future SDK versions.
    napi_value global;
    if (napi_get_global(env, &global) == napi_ok) {
        napi_value comp;
        if (napi_get_named_property(env, global, "Navigation", &comp) == napi_ok) {
            napi_set_named_property(env, exports, "HdsNavigation", comp);
        }
        if (napi_get_named_property(env, global, "NavDestination", &comp) == napi_ok) {
            napi_set_named_property(env, exports, "HdsNavDestination", comp);
        }
        if (napi_get_named_property(env, global, "Tabs", &comp) == napi_ok) {
            napi_set_named_property(env, exports, "HdsTabs", comp);
        }
        if (napi_get_named_property(env, global, "ListItem", &comp) == napi_ok) {
            napi_set_named_property(env, exports, "HdsListItemCard", comp);
        }
    }

    // --- Instance / attribute helpers (stubs) ---
    static constexpr const char* kStubNames[] = {
        "HdsNavigationInstance",
        "HdsNavDestinationInstance",
        "HdsNavigationAttribute",
        "HdsNavDestinationAttribute",
        "HdsTabsInstance",
        "HdsTabsAttribute",
        "HdsListItemCardInstance",
        "HdsListItemCardAttribute",
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
