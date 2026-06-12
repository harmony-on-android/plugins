/*
 * ArkUI Component bridge for ArkUI-X CROSS_PLATFORM.
 *
 * jsEnumStyle.abc (loaded via PreloadJsEnums) defines framework classes such
 * as BottomTabBarStyle and SubTabBarStyle.  These are stored in the Panda VM
 * GlobalRecord (STTOGLOBALRECORD at the bytecode level) and — after the
 * corresponding globalThis.X = X assignments have executed — are also
 * visible on globalThis.
 *
 * This module is loaded by the NAPI module system when a HAP's ArkTS
 * bytecode issues LDEXTERNALMODULEVAR targeting @ohos:arkui.component
 * (the result of compiling `import { BottomTabBarStyle } from '@kit.ArkUI'`).
 *
 * It reads the values from globalThis and re-exports them as named module
 * exports that the module system returns to the caller.
 *
 * Extend the exports incrementally:
 *   1.  Add `globalThis.NewValue = NewValue;` in jsEnumStyle.js
 *   2.  Add a named export here
 *   3.  Rebuild ArkUI-X + sync + APK
 */

const _g = Function('return this')();

// ---- Tab bar style classes ------------------------------------------------
export const BottomTabBarStyle = _g.BottomTabBarStyle;
export const SubTabBarStyle    = _g.SubTabBarStyle;

// ---- Default export (belt-and-suspenders) ---------------------------------
export default {
  BottomTabBarStyle,
  SubTabBarStyle,
};
