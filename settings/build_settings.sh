#!/bin/bash
# Build libsettings_napi.so — @ohos.settings NAPI module stub
#
# Usage: bash build_settings.sh
# Requires: ANDROID_NDK_HOME pointing to NDK 28+
#
# Output: $ARKUI_BUILD/plugins/settings/libsettings_napi.so
#   (where sync_arkui_x.sh will find and copy it to HOA)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC="$SCRIPT_DIR/settings_stub.c"
OUT="$ARKUI_BUILD/plugins/settings"
OUT_SO="$OUT/libsettings_napi.so"

if [ -z "$ARKUI_BUILD" ]; then
    ARKUI_BUILD="${SCRIPT_DIR}/../../out/arkui-x/aosp_clang_arm64_release"
fi

echo "=== Building settings NAPI stub ==="
echo "Source: $SRC"
echo "Output: $OUT_SO"

mkdir -p "$OUT"

CC="${ANDROID_NDK_HOME}/toolchains/llvm/prebuilt/linux-x86_64/bin/aarch64-linux-android26-clang"
SYSROOT="${ANDROID_NDK_HOME}/toolchains/llvm/prebuilt/linux-x86_64/sysroot"

if [ ! -f "$CC" ]; then
    echo "ERROR: NDK compiler not found at $CC"
    echo "Set ANDROID_NDK_HOME to NDK 28+ path"
    exit 1
fi

# Link against libarkui_android.so to resolve NAPI symbols.
# At runtime these symbols come from the already-loaded libarkui_android.so.
ARKUI_LIB="$ARKUI_BUILD/arkui/arkui-x/libarkui_android.so"
if [ ! -f "$ARKUI_LIB" ]; then
    echo "ERROR: libarkui_android.so not found at $ARKUI_LIB"
    echo "Build ArkUI-X first: cd $ARKUI_X_SRC && bash build.sh --product-name arkui-x --target-os android"
    exit 1
fi

"$CC" \
    --target=aarch64-linux-android26 \
    --sysroot="$SYSROOT" \
    -fPIC -std=c11 -O2 \
    -shared \
    -Wl,-soname,libsettings_napi.z.so \
    -o "$OUT_SO" \
    "$SRC" \
    -L"$(dirname "$ARKUI_LIB")" \
    -l:libarkui_android.so

echo "=== settings NAPI stub built: $OUT_SO ==="
ls -la "$OUT_SO"
