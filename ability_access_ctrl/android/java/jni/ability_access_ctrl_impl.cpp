/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "ability_access_ctrl_impl.h"
#include <map>
#include <set>
#include "ability_access_ctrl_jni.h"
#include "inner_api/plugin_utils_inner.h"
#include "log.h"

namespace OHOS::Plugin {
static bool isInited = false;
static std::map<std::string, std::string> g_permissionMap;
static std::map<std::string, std::vector<std::string>> g_permissionMultipleMap;

// ============================================================
// HOA Patch: Normal Android permission bypass for install-time grants
// ============================================================
//
// Problem:
//   1. Android has two permission types: "normal" and "dangerous".
//      Normal permissions (e.g. INTERNET) are auto-granted when declared in
//      AndroidManifest.xml at install time. Users cannot revoke them.
//      Dangerous permissions (e.g. CAMERA) require runtime approval via
//      Activity.requestPermissions(), which triggers onRequestPermissionsResult().
//   2. The original ArkUI-X flow calls JNI AbilityAccessCtrlJni::CheckPermission()
//      to pre-check if a permission is already granted. But this JNI call
//      depends on g_pluginClass.globalRef being initialized by the Java
//      AbilityAccessCtrl constructor (NativeInit). At the time RequestPermissions()
//      is called from ArkTS, the Java object may not exist yet, causing the
//      JNI check to silently return false.
//   3. When a normal permission falls through to the runtime flow,
//      Activity.requestPermissions() never fires onRequestPermissionsResult()
//      for it, so the async Promise never resolves. This results in the
//      HAP showing "No Permission" permanently.
//
// Solution:
//   Maintain a hardcoded set of Android normal permissions. When a mapped
//   permission matches, skip both the JNI check and the runtime request flow,
//   marking it as PERMISSION_GRANTED immediately. This bypasses the JNI
//   initialization ordering issue entirely and is correct because normal
//   permissions are always granted when declared in the manifest.
//
//   For dangerous permissions (not in this set), the original runtime flow
//   is preserved: they go through Activity.requestPermissions() which
//   correctly triggers the callback for the user's grant/deny decision.
//
//   If new normal permissions are needed, add their Android name here.
//   Reference: https://developer.android.com/reference/android/Manifest.permission
//
static const std::set<std::string> g_normalPermissions = {
    "android.permission.INTERNET",
};
static void InitPermissionMap()
{
    // add permission map
    g_permissionMap["ohos.permission.CAMERA"] = "android.permission.CAMERA";
    g_permissionMap["ohos.permission.MICROPHONE"] = "android.permission.RECORD_AUDIO";
    g_permissionMap["ohos.permission.READ_IMAGEVIDEO"] = "android.permission.READ_EXTERNAL_STORAGE";
    g_permissionMap["ohos.permission.WRITE_IMAGEVIDEO"] = "android.permission.WRITE_EXTERNAL_STORAGE";
    g_permissionMap["ohos.permission.APPROXIMATELY_LOCATION"] = "android.permission.ACCESS_COARSE_LOCATION";
    g_permissionMap["ohos.permission.LOCATION"] = "android.permission.ACCESS_FINE_LOCATION";
    // HOA: Map OHOS INTERNET to Android INTERNET.
    // Without this entry, OhPermissionToJava() returns false, the permission
    // is treated as unknown, and requestPermissionsFromUser() rejects with an error.
    g_permissionMap["ohos.permission.INTERNET"] = "android.permission.INTERNET";
    // HOA: Map OHOS-only permissions to Android INTERNET (always granted).
    // These have no Android equivalent but are needed by HAPs at runtime.
    g_permissionMap["ohos.permission.DISTRIBUTED_DATASYNC"] = "android.permission.INTERNET";
    g_permissionMap["ohos.permission.STORE_PERSISTENT_DATA"] = "android.permission.INTERNET";

    // add bluetooth permission
    std::vector<std::string> bluetoothPermission;
    bluetoothPermission.emplace_back("android.permission.BLUETOOTH");
    bluetoothPermission.emplace_back("android.permission.BLUETOOTH_ADMIN");
    bluetoothPermission.emplace_back("android.permission.BLUETOOTH_ADVERTISE");
    bluetoothPermission.emplace_back("android.permission.BLUETOOTH_CONNECT");
    bluetoothPermission.emplace_back("android.permission.BLUETOOTH_SCAN");
    bluetoothPermission.emplace_back("android.permission.ACCESS_FINE_LOCATION");
    bluetoothPermission.emplace_back("android.permission.ACCESS_COARSE_LOCATION");
    g_permissionMultipleMap.insert(std::make_pair("ohos.permission.ACCESS_BLUETOOTH", bluetoothPermission));
}

static bool OhPermissionToJava(const std::string& inPerm, std::string& outPerm)
{
    outPerm = inPerm;
    auto it = g_permissionMap.find(inPerm);
    if (it != g_permissionMap.end()) {
        outPerm = it->second;
        return true;
    }
    return false;
}

static bool OhPermissionToJava(const std::string& inPerm, std::vector<std::string>& outPerm)
{
    // outPerm = inPerm;
    auto it = g_permissionMultipleMap.find(inPerm);
    if (it != g_permissionMultipleMap.end()) {
        if (it->second.size() > 0) {
            outPerm = it->second;
            return true;
        }
    }
    return false;
}

static bool JavaPermissionToOh(const std::string& inPerm, std::string& outPerm)
{
    outPerm = inPerm;
    for (auto iter = g_permissionMap.begin(); iter != g_permissionMap.end(); ++iter) {
        std::string tmp = iter->second;
        if (tmp == inPerm) {
            outPerm = iter->first;
            return true;
        }
    }
    return false;
}

static bool JavaMultiplePermissionToOh(const std::string& inPerm, std::string& outPerm)
{
    for (auto it = g_permissionMultipleMap.begin(); it != g_permissionMultipleMap.end(); it++) {
        for (auto vIter = it->second.begin(); vIter != it->second.end(); vIter++) {
            if (*vIter == inPerm) {
                outPerm = it->first;
                return true;
            }
        }
    }
    return false;
}

static void QueryJavaPermissionToOh(
    const std::vector<std::string>& perms, std::vector<std::string>& permList, std::vector<int>& grantResult)
{
    // 2: invalid operation, something is wrong or the app is not permmited to use the permission.
    const int permissionResult = 2;
    std::map<std::string, int> resultMap;
    for (size_t i = 0; i < perms.size(); i++) {
        std::string ohPerm;
        if (JavaPermissionToOh(perms[i], ohPerm)) {
            resultMap.insert(std::make_pair(ohPerm, grantResult[i]));
        } else if (JavaMultiplePermissionToOh(perms[i], ohPerm)) {
            auto iter = resultMap.find(ohPerm);
            if (iter != resultMap.end()) {
                iter->second = (iter->second == grantResult[i]) ? iter->second : permissionResult;
                continue;
            }
            resultMap.insert(std::make_pair(ohPerm, grantResult[i]));
        } else {
            grantResult[i] = permissionResult;
            resultMap.insert(std::make_pair(ohPerm, grantResult[i]));
        }
    }
    permList.clear();
    grantResult.clear();
    for (auto iter = resultMap.begin(); iter != resultMap.end(); iter++) {
        permList.emplace_back(iter->first);
        grantResult.emplace_back(iter->second);
    }
}

std::unique_ptr<AbilityAccessCtrl> AbilityAccessCtrl::Create()
{
    if (!isInited) {
        InitPermissionMap();
        isInited = true;
    }
    
    return std::make_unique<AbilityAccessCtrlImpl>();
}

bool AbilityAccessCtrlImpl::CheckPermission(const std::string& permission)
{
    LOGI("AbilityAccessCtrlImpl CheckPermission %{public}s", permission.c_str());
    std::string javaPermission;
    if (!OhPermissionToJava(permission, javaPermission)) {
        return false;
    }
    return AbilityAccessCtrlJni::CheckPermission(javaPermission);
}

void AbilityAccessCtrlImpl::RequestPermissions(
    const std::vector<std::string>& permissions, RequestPermissionCallback callback, void* data)
{
    LOGI("AbilityAccessCtrlImpl Request called");
    std::vector<std::string> javaStrings;
    std::vector<std::string> vJavaPerm;

    // HOA: Collect permissions that are already granted before entering the
    // Android runtime flow. This handles two cases:
    //   a) Normal permissions (INTERNET etc.) — auto-granted at install,
    //      detected via g_normalPermissions set, no JNI needed.
    //   b) Multi-permissions (e.g. BLUETOOTH) where ALL sub-perms happen
    //      to already be granted at the Java level (best-effort via JNI).
    // Pre-granted results are merged with any runtime results before the
    // final callback, so the caller receives a complete grant vector.
    std::vector<std::string> preGrantedPerms;
    std::vector<int> preGrantedResults;
    for (size_t i = 0; i < permissions.size(); i++) {
        std::string javaPerm;
        vJavaPerm.clear();
        if (OhPermissionToJava(permissions[i], javaPerm)) {
            LOGE(
                "AbilityAccessCtrlImpl transfer permisson %{public}s -> %{public}s", permissions[i].c_str(), javaPerm.c_str());
            // HOA: Check if this maps to a normal Android permission (always granted).
            if (g_normalPermissions.find(javaPerm) != g_normalPermissions.end()) {
                LOGE("AbilityAccessCtrlImpl %{public}s is a normal Android perm, marking granted", permissions[i].c_str());
                preGrantedPerms.emplace_back(permissions[i]);
                preGrantedResults.emplace_back(0);  // PERMISSION_GRANTED
                continue;
            }
        } else if(OhPermissionToJava(permissions[i], vJavaPerm)) {
            bool allGranted = true;
            for (auto it = vJavaPerm.begin(); it != vJavaPerm.end(); ++it) {
                if (!AbilityAccessCtrlJni::CheckPermission(*it)) {
                    allGranted = false;
                }
                javaStrings.emplace_back(*it);
            }
            if (allGranted && !vJavaPerm.empty()) {
                preGrantedPerms.emplace_back(permissions[i]);
                preGrantedResults.emplace_back(0);
                javaStrings.clear(); // undo adds for this permission
                continue;
            }
            continue;
        } else {
            LOGE("AbilityAccessCtrlImpl not found permisson(%{public}s) in map", permissions[i].c_str());
        }
        javaStrings.emplace_back(javaPerm);
    }

    // HOA: If all requested permissions were pre-granted (e.g. only INTERNET),
    // skip the Android runtime flow entirely and invoke the callback directly.
    // Otherwise, merge pre-granted results with any results from the runtime path.
    if (javaStrings.empty()) {
        LOGE("AbilityAccessCtrlImpl all permissions pre-granted, calling callback directly");
        callback(data, preGrantedPerms, preGrantedResults);
        return;
    }

    PluginUtilsInner::RunTaskOnPlatform([callback, data, preGrantedPerms, preGrantedResults]() {
        auto task = [callback, data, preGrantedPerms, preGrantedResults](const std::vector<std::string> perms, const std::vector<int> result) {
            std::vector<std::string> permList = preGrantedPerms;
            std::vector<int> grantResult = preGrantedResults;
            std::vector<std::string> runtimePermList;
            std::vector<int> runtimeGrantResult = result;
            QueryJavaPermissionToOh(perms, runtimePermList, runtimeGrantResult);
            permList.insert(permList.end(), runtimePermList.begin(), runtimePermList.end());
            grantResult.insert(grantResult.end(), runtimeGrantResult.begin(), runtimeGrantResult.end());
            callback(data, permList, grantResult);
        };
        PluginUtilsInner::JSRegisterGrantResult(task);
        LOGI("AbilityAccessCtrlImpl JSRegisterGrantResult end");
    });
    PluginUtilsInner::RunTaskOnPlatform([javaStrings]() {
        AbilityAccessCtrlJni::RequestPermissions(javaStrings);
    });
}
} // namespace OHOS::Plugin
