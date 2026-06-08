// @ohos.fileio — delegation to @ohos.file.fs (native implementation)
//
// OHOS deprecated @ohos.fileio in API 9, replacing it with @ohos.file.fs.
// Instead of reimplementing POSIX operations, we delegate to the existing
// native libfile_fs.so (loaded as @ohos.file.fs).
//
// Flattened default export pattern matches how HAPs import:
//   import fileio from '@ohos.fileio'

import fs from '@ohos.file.fs';

// ── Direct 1:1 delegations ──

function access(path, mode) { return fs.access(path, mode); }
function accessSync(path, mode) { return fs.accessSync(path, mode); }
function chmod(path, mode) { return fs.chmod(path, mode); }
function chmodSync(path, mode) { return fs.chmodSync(path, mode); }
function chown(path, uid, gid) { return fs.chown(path, uid, gid); }
function chownSync(path, uid, gid) { return fs.chownSync(path, uid, gid); }
function close(fd) { return fs.close(fd); }
function closeSync(fd) { return fs.closeSync(fd); }
function copyFile(src, dest, mode) { return fs.copyFile(src, dest, mode); }
function copyFileSync(src, dest, mode) { return fs.copyFileSync(src, dest, mode); }
function fchmod(fd, mode) { return fs.fchmod(fd, mode); }
function fchmodSync(fd, mode) { return fs.fchmodSync(fd, mode); }
function fchown(fd, uid, gid) { return fs.fchown(fd, uid, gid); }
function fchownSync(fd, uid, gid) { return fs.fchownSync(fd, uid, gid); }
function fdatasync(fd) { return fs.fdatasync(fd); }
function fdatasyncSync(fd) { return fs.fdatasyncSync(fd); }
function fsync(fd) { return fs.fsync(fd); }
function fsyncSync(fd) { return fs.fsyncSync(fd); }
function ftruncate(fd, len) { return fs.ftruncate(fd, len); }
function ftruncateSync(fd, len) { return fs.ftruncateSync(fd, len); }
function lchown(path, uid, gid) { return fs.lchown(path, uid, gid); }
function lchownSync(path, uid, gid) { return fs.lchownSync(path, uid, gid); }
function link(src, dest) { return fs.link(src, dest); }
function linkSync(src, dest) { return fs.linkSync(src, dest); }
function lseek(fd, offset, whence) { return fs.lseek(fd, offset, whence); }
function lstat(path) { return fs.lstat(path); }
function lstatSync(path) { return fs.lstatSync(path); }
function mkdir(path, mode) { return fs.mkdir(path, mode); }
function mkdirSync(path, mode) { return fs.mkdirSync(path, mode); }
function mkdtemp(prefix) { return fs.mkdtemp(prefix); }
function mkdtempSync(prefix) { return fs.mkdtempSync(prefix); }
function open(path, flags, mode) { return fs.open(path, flags, mode); }
function openSync(path, flags, mode) { return fs.openSync(path, flags, mode); }
function opendir(path) { return fs.opendir(path); }
function opendirSync(path) { return fs.opendirSync(path); }
function read(fd, buffer, options) { return fs.read(fd, buffer, options); }
function readSync(fd, buffer, options) { return fs.readSync(fd, buffer, options); }
function readText(filePath, options) { return fs.readText(filePath, options); }
function readTextSync(filePath, options) { return fs.readTextSync(filePath, options); }
function rename(src, dest) { return fs.rename(src, dest); }
function renameSync(src, dest) { return fs.renameSync(src, dest); }
function rmdir(path) { return fs.rmdir(path); }
function rmdirSync(path) { return fs.rmdirSync(path); }
function stat(path) { return fs.stat(path); }
function statSync(path) { return fs.statSync(path); }
function symlink(target, src) { return fs.symlink(target, src); }
function symlinkSync(target, src) { return fs.symlinkSync(target, src); }
function truncate(path, len) { return fs.truncate(path, len); }
function truncateSync(path, len) { return fs.truncateSync(path, len); }
function unlink(path) { return fs.unlink(path); }
function unlinkSync(path) { return fs.unlinkSync(path); }
function write(fd, buffer, options) { return fs.write(fd, buffer, options); }
function writeSync(fd, buffer, options) { return fs.writeSync(fd, buffer, options); }
function writeText(filePath, content) { return fs.writeText(filePath, content); }
function writeTextSync(filePath, content) { return fs.writeTextSync(filePath, content); }

// Stream wrappers — old API creates Stream from fd; new API has fdopenStream/createStream
function createStream(path, mode) { return fs.createStream(path, mode); }
function createStreamSync(path, mode) { return fs.createStreamSync(path, mode); }
function fdopenStream(fd) { return fs.fdopenStream(fd); }
function fdopenStreamSync(fd) { return fs.fdopenStreamSync(fd); }

// ── Re-exports: types from new API ──
const Stat = fs.Stat;
const Stream = fs.Stream;
const Dir = fs.Dir;
const Dirent = fs.Dirent;
const Watcher = fs.Watcher;

// ── Constants (same values as OHOS) ──
const OpenMode = {
  READ_ONLY: 0o0,
  WRITE_ONLY: 0o1,
  READ_WRITE: 0o2,
  CREATE: 0o100,
  TRUNC: 0o1000,
  APPEND: 0o2000,
  NONBLOCK: 0o4000,
  DIR: 0o200000,
  SYNC: 0o4010000,
};

const WhenceType = {
  SEEK_SET: 0,
  SEEK_CUR: 1,
  SEEK_END: 2,
};

const Filter = {
  EXCLUDE_START_WITH_DOT: 1,
};

// ── Flat default export ──
export default {
  access,
  accessSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  createStream,
  createStreamSync,
  Dir,
  Dirent,
  Stat,
  Stream,
  Watcher,
  fchmod,
  fchmodSync,
  fchown,
  fchownSync,
  fdatasync,
  fdatasyncSync,
  fdopenStream,
  fdopenStreamSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  lchown,
  lchownSync,
  link,
  linkSync,
  lseek,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  read,
  readSync,
  readText,
  readTextSync,
  rename,
  renameSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  write,
  writeSync,
  writeText,
  writeTextSync,
  OpenMode,
  WhenceType,
  Filter,
};
