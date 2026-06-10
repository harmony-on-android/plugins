/*
 * HMS Share Kit stub for HOA (Harmony on Android)
 *
 * Registers NAPI module "collaboration.systemShare" so that HAPs importing
 * from @kit.ShareKit / @hms.collaboration.systemShare can resolve.
 *
 * JS types (SharedData, ShareController, enums) are provided by the
 * embedded ABC (system_share_mock.abc).
 *
 * ShareController.show() calls the native showSharePanel() function, which
 * bridges to Android's Intent.ACTION_SEND via JNI → Kotlin ShareHelper.
 */

#include "napi/native_common.h"
#include "napi/native_node_api.h"

#include <android/log.h>
#include <string>

#ifdef ANDROID_PLATFORM
#include "plugins/interfaces/native/plugin_utils.h"
#endif

#define LOG_TAG "HOA.systemShare"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

extern const char _binary_system_share_mock_abc_start[];
extern const char _binary_system_share_mock_abc_end[];

namespace OHOS::Plugin {
namespace {

// =========================================================================
// ABC code provider
// =========================================================================
extern "C" __attribute__((visibility("default")))
void NAPI_sharekit_GetABCCode(const char **buf, int *buflen)
{
    if (buf) {
        *buf = _binary_system_share_mock_abc_start;
    }
    if (buflen) {
        *buflen = _binary_system_share_mock_abc_end -
                  _binary_system_share_mock_abc_start;
    }
}

// =========================================================================
// showSharePanel(text, title, description) → Promise<void>
// Bridges to Android Intent.ACTION_SEND via JNI → Kotlin ShareHelper.showShare()
// =========================================================================
static napi_value ShowSharePanel(napi_env env, napi_callback_info info)
{
    size_t argc = 3;
    napi_value args[3] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // Extract string arguments
    auto getString = [env](napi_value val, std::string &out) -> bool {
        if (val == nullptr) return false;
        size_t len = 0;
        napi_status status = napi_get_value_string_utf8(env, val, nullptr, 0, &len);
        if (status != napi_ok) return false;
        char *buf = new char[len + 1]();
        napi_get_value_string_utf8(env, val, buf, len + 1, &len);
        out = buf;
        delete[] buf;
        return true;
    };

    std::string text, title, description;
    getString(args[0], text);
    getString(args[1], title);
    getString(args[2], description);

    LOGI("ShowSharePanel: title=\"%s\" text_len=%zu", title.c_str(), text.length());

#ifdef ANDROID_PLATFORM
    // Bridge to Kotlin ShareHelper.showShare() via JNI
    JNIEnv* jniEnv = ARKUI_X_Plugin_GetJniEnv();
    if (jniEnv) {
        jclass clazz = jniEnv->FindClass("app/hackeris/hoa/ShareHelper");
        if (clazz) {
            jmethodID method = jniEnv->GetStaticMethodID(
                clazz, "showShare",
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V");
            if (method) {
                jstring jtext = jniEnv->NewStringUTF(text.c_str());
                jstring jtitle = jniEnv->NewStringUTF(title.c_str());
                jstring jdesc = jniEnv->NewStringUTF(description.c_str());

                jniEnv->CallStaticVoidMethod(clazz, method, jtext, jtitle, jdesc);

                if (jniEnv->ExceptionCheck()) {
                    LOGE("JNI exception in ShareHelper.showShare");
                    jniEnv->ExceptionDescribe();
                    jniEnv->ExceptionClear();
                } else {
                    LOGI("ShareHelper.showShare() OK");
                }

                jniEnv->DeleteLocalRef(jtext);
                jniEnv->DeleteLocalRef(jtitle);
                jniEnv->DeleteLocalRef(jdesc);
            } else {
                LOGE("GetStaticMethodID for showShare failed");
            }
            jniEnv->DeleteLocalRef(clazz);
        } else {
            LOGE("FindClass ShareHelper failed");
        }
    } else {
        LOGE("ARKUI_X_Plugin_GetJniEnv() returned null");
    }
#endif

    napi_value promise = nullptr;
    napi_deferred deferred = nullptr;
    napi_create_promise(env, &deferred, &promise);

    napi_value result = nullptr;
    napi_get_undefined(env, &result);
    napi_resolve_deferred(env, deferred, result);

    return promise;
}

// =========================================================================
// Module register function — exports native functions accessible from JS
// =========================================================================
static napi_value InitShareKit(napi_env env, napi_value exports)
{
    LOGI("InitShareKit: registering collaboration.systemShare");
    napi_value fnShowSharePanel = nullptr;
    napi_create_function(env, "showSharePanel", NAPI_AUTO_LENGTH,
                         ShowSharePanel, nullptr, &fnShowSharePanel);
    napi_set_named_property(env, exports, "showSharePanel", fnShowSharePanel);
    return exports;
}

// =========================================================================
// Module descriptor
// =========================================================================
static napi_module_with_js g_shareModule = {
    .nm_version       = 1,
    .nm_flags         = 0,
    .nm_filename      = nullptr,
    .nm_register_func = InitShareKit,
    .nm_modname       = "collaboration.systemShare",
    .nm_priv          = nullptr,
    .nm_get_abc_code  = NAPI_sharekit_GetABCCode,
    .nm_get_js_code   = nullptr,
};

extern "C" __attribute__((constructor)) void RegisterShareKit()
{
    LOGI("RegisterShareKit: constructor");
    napi_module_with_js_register(&g_shareModule);
}

}  // namespace
}  // namespace OHOS::Plugin
