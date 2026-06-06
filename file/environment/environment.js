// @ohos.file.environment stub for ArkUI-X/Android
//
// Provides Environment API to map OHOS public directory paths to Android
// counterparts.  On OHOS these return per-user sandbox paths (e.g.
// /storage/Users/currentUser/Download); on Android we return the
// conventional public-storage paths.
//
// Ref: OHOS source at foundation/filemanagement/file_api/.../mod_environment/

function getStorageDataDir() {
  return new Promise(function (resolve, reject) {
    reject({ code: 801, message: 'Capability not supported.' });
  });
}

function getUserDataDir() {
  return new Promise(function (resolve, reject) {
    reject({ code: 801, message: 'Capability not supported.' });
  });
}

function getUserDownloadDir() {
  return '/storage/emulated/0/Download';
}

function getUserDesktopDir() {
  // OHOS only supports this on 2in1 devices (error 801 otherwise).
  // Android has no 2in1 concept — return the public Documents directory
  // as a best-effort fallback.
  return '/storage/emulated/0/Desktop';
}

function getUserDocumentDir() {
  return '/storage/emulated/0/Documents';
}

function getExternalStorageDir() {
  return '/storage/emulated/0';
}

function getUserHomeDir() {
  return '/storage/emulated/0';
}

// Flat default export — OHOS module is a namespace (not a class).
export default {
  getStorageDataDir,
  getUserDataDir,
  getUserDownloadDir,
  getUserDesktopDir,
  getUserDocumentDir,
  getExternalStorageDir,
  getUserHomeDir,
};
