// @ohos.fileio — delegation to @ohos.file.fs via requireNapi
//
// OHOS deprecated @ohos.fileio in API 9, replacing it with @ohos.file.fs.
// In pure-ABC context, 'import' cannot resolve native NAPI modules, but
// the global requireNapi() function can. We load the native @ohos.file.fs
// at runtime and re-export its functions under the old API names.

var fs;

function getFs() {
  if (!fs) {
    fs = requireNapi("file.fs");
  }
  return fs;
}

// ── Direct delegations ──

function access(path, mode) { return getFs().access(path, mode); }
function accessSync(path, mode) { return getFs().accessSync(path, mode); }
function chmod(path, mode) { return getFs().chmod(path, mode); }
function chmodSync(path, mode) { return getFs().chmodSync(path, mode); }
function chown(path, uid, gid) { return getFs().chown(path, uid, gid); }
function chownSync(path, uid, gid) { return getFs().chownSync(path, uid, gid); }
function close(fd) { return getFs().close(fd); }
function closeSync(fd) { return getFs().closeSync(fd); }
function copyFile(src, dest, mode) { return getFs().copyFile(src, dest, mode); }
function copyFileSync(src, dest, mode) { return getFs().copyFileSync(src, dest, mode); }
function fchmod(fd, mode) { return getFs().fchmod(fd, mode); }
function fchmodSync(fd, mode) { return getFs().fchmodSync(fd, mode); }
function fchown(fd, uid, gid) { return getFs().fchown(fd, uid, gid); }
function fchownSync(fd, uid, gid) { return getFs().fchownSync(fd, uid, gid); }
function fdatasync(fd) { return getFs().fdatasync(fd); }
function fdatasyncSync(fd) { return getFs().fdatasyncSync(fd); }
function fsync(fd) { return getFs().fsync(fd); }
function fsyncSync(fd) { return getFs().fsyncSync(fd); }
function ftruncate(fd, len) { return getFs().ftruncate(fd, len); }
function ftruncateSync(fd, len) { return getFs().ftruncateSync(fd, len); }
function lchown(path, uid, gid) { return getFs().lchown(path, uid, gid); }
function lchownSync(path, uid, gid) { return getFs().lchownSync(path, uid, gid); }
function link(src, dest) { return getFs().link(src, dest); }
function linkSync(src, dest) { return getFs().linkSync(src, dest); }
function lseek(fd, offset, whence) { return getFs().lseek(fd, offset, whence); }
function lstat(path) { return getFs().lstat(path); }
function lstatSync(path) { return getFs().lstatSync(path); }
function mkdir(path, mode) { return getFs().mkdir(path, mode); }
function mkdirSync(path, mode) { return getFs().mkdirSync(path, mode); }
function mkdtemp(prefix) { return getFs().mkdtemp(prefix); }
function mkdtempSync(prefix) { return getFs().mkdtempSync(prefix); }
function open(path, flags, mode) { return getFs().open(path, flags, mode); }
function openSync(path, flags, mode) { return getFs().openSync(path, flags, mode); }
function opendir(path) { return getFs().opendir(path); }
function opendirSync(path) { return getFs().opendirSync(path); }
function read(fd, buffer, options) { return getFs().read(fd, buffer, options); }
function readSync(fd, buffer, options) { return getFs().readSync(fd, buffer, options); }
function readText(filePath, options) { return getFs().readTextSync(filePath, options); }
function readTextSync(filePath, options) { return getFs().readTextSync(filePath, options); }
function rename(src, dest) { return getFs().rename(src, dest); }
function renameSync(src, dest) { return getFs().renameSync(src, dest); }
function rmdir(path) { return getFs().rmdir(path); }
function rmdirSync(path) { return getFs().rmdirSync(path); }
function stat(path) { return getFs().stat(path); }
function statSync(path) { return getFs().statSync(path); }
function symlink(target, src) { return getFs().symlink(target, src); }
function symlinkSync(target, src) { return getFs().symlinkSync(target, src); }
function truncate(path, len) { return getFs().truncate(path, len); }
function truncateSync(path, len) { return getFs().truncateSync(path, len); }
function unlink(path) { return getFs().unlink(path); }
function unlinkSync(path) { return getFs().unlinkSync(path); }
function write(fd, buffer, options) { return getFs().write(fd, buffer, options); }
function writeSync(fd, buffer, options) { return getFs().writeSync(fd, buffer, options); }
function writeText(filePath, content) { return getFs().writeTextSync(filePath, content); }
function writeTextSync(filePath, content) { return getFs().writeTextSync(filePath, content); }

// Stream
function createStream(path, mode) { return getFs().createStreamSync(path, mode); }
function createStreamSync(path, mode) { return getFs().createStreamSync(path, mode); }
function fdopenStream(fd) { return getFs().fdopenStreamSync(fd); }
function fdopenStreamSync(fd) { return getFs().fdopenStreamSync(fd); }

// ── Types: lazily resolved from native module ──
function getStatCtor() { return getFs().Stat; }
function getStreamCtor() { return getFs().Stream; }

// Wrapper classes that delegate to the native module
class Stat {
  constructor() {
    var s = getStatCtor();
    if (s) {
      var inst = new s();
      for (var k in inst) { this[k] = inst[k]; }
    }
  }
}
Stat.prototype.isDirectory = function() { return false; };
Stat.prototype.isFile = function() { return false; };
Stat.prototype.isSymbolicLink = function() { return false; };

// Fallback types when native fs is not available
class Stream {
  read(buffer, options) { return Promise.resolve(0); }
  readSync(buffer, options) { return 0; }
  write(buffer, options) { return Promise.resolve(0); }
  writeSync(buffer, options) { return 0; }
  close() { return Promise.resolve(); }
  closeSync() {}
  flush() { return Promise.resolve(); }
  flushSync() {}
}

class Dir {
  read() { return Promise.resolve(new Dirent()); }
  readSync() { return new Dirent(); }
  close() { return Promise.resolve(); }
  closeSync() {}
}

class Dirent {
  constructor() { this.name = ""; }
  isDirectory() { return false; }
  isFile() { return false; }
}

class Watcher {
  start() {}
  stop() {}
}

// ── Constants ──
var OpenMode = {
  READ_ONLY: 0o0, WRITE_ONLY: 0o1, READ_WRITE: 0o2,
  CREATE: 0o100, TRUNC: 0o1000, APPEND: 0o2000,
  NONBLOCK: 0o4000, DIR: 0o200000, SYNC: 0o4010000,
};

var WhenceType = { SEEK_SET: 0, SEEK_CUR: 1, SEEK_END: 2 };
var Filter = { EXCLUDE_START_WITH_DOT: 1 };

export default {
  access, accessSync, chmod, chmodSync, chown, chownSync,
  close, closeSync, copyFile, copyFileSync,
  createStream, createStreamSync, Dir, Dirent, Stat, Stream, Watcher,
  fchmod, fchmodSync, fchown, fchownSync,
  fdatasync, fdatasyncSync, fdopenStream, fdopenStreamSync,
  fsync, fsyncSync, ftruncate, ftruncateSync,
  lchown, lchownSync, link, linkSync, lseek, lstat, lstatSync,
  mkdir, mkdirSync, mkdtemp, mkdtempSync,
  open, openSync, opendir, opendirSync,
  read, readSync, readText, readTextSync,
  rename, renameSync, rmdir, rmdirSync,
  stat, statSync, symlink, symlinkSync,
  truncate, truncateSync, unlink, unlinkSync,
  write, writeSync, writeText, writeTextSync,
  OpenMode, WhenceType, Filter,
};
