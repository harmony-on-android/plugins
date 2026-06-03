// Stub for @ohos.fileio API compatibility on ArkUI-X/Android
// Flattened default export pattern: all functions and classes are direct
// properties of the default export, matching how import fileio from '@ohos.fileio' works.

function access(path, mode) {
  return Promise.resolve(true);
}

function accessSync(path, mode) {
  return true;
}

function chmod(path, mode) {
  return Promise.resolve();
}

function chmodSync(path, mode) {}

function chown(path, uid, gid) {
  return Promise.resolve();
}

function chownSync(path, uid, gid) {}

function close(fd) {
  return Promise.resolve();
}

function closeSync(fd) {}

function copyFile(src, dest, mode) {
  return Promise.resolve();
}

function copyFileSync(src, dest, mode) {}

function createStream(fd) {
  return Promise.resolve(new Stream());
}

function createStreamSync(fd) {
  return new Stream();
}

class Dir {
  read() { return Promise.resolve(new Dirent()); }
  readSync() { return new Dirent(); }
  close() { return Promise.resolve(); }
  closeSync() {}
}

class Dirent {
  constructor() {
    this.name = "";
  }
  isDirectory() { return false; }
  isFile() { return false; }
}

class Stat {
  constructor() {
    this.size = 0;
    this.blksize = 4096;
    this.blocks = 0;
    this.atime = 0;
    this.mtime = 0;
    this.ctime = 0;
    this.ino = 0;
    this.mode = 0;
    this.uid = 0;
    this.gid = 0;
    this.dev = 0;
    this.nlink = 0;
  }
  isDirectory() { return false; }
  isFile() { return false; }
  isSymbolicLink() { return false; }
}

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

class Watcher {
  start() {}
  stop() {}
}

function fchmod(fd, mode) {
  return Promise.resolve();
}

function fchmodSync(fd, mode) {}

function fchown(fd, uid, gid) {
  return Promise.resolve();
}

function fchownSync(fd, uid, gid) {}

function fdatasync(fd) {
  return Promise.resolve();
}

function fdatasyncSync(fd) {}

function fdopenStream(fd) {
  return Promise.resolve(new Stream());
}

function fdopenStreamSync(fd) {
  return new Stream();
}

function fsync(fd) {
  return Promise.resolve();
}

function fsyncSync(fd) {}

function ftruncate(fd, len) {
  return Promise.resolve();
}

function ftruncateSync(fd, len) {}

function lchown(path, uid, gid) {
  return Promise.resolve();
}

function lchownSync(path, uid, gid) {}

function link(src, dest) {
  return Promise.resolve();
}

function linkSync(src, dest) {}

function lseek(fd, offset, whence) {
  return 0;
}

function lstat(path) {
  return Promise.resolve(new Stat());
}

function lstatSync(path) {
  return new Stat();
}

function mkdir(path, mode) {
  return Promise.resolve();
}

function mkdirSync(path, mode) {}

function mkdtemp(prefix) {
  return Promise.resolve("/tmp/mock");
}

function mkdtempSync(prefix) {
  return "/tmp/mock";
}

function open(path, flags, mode) {
  return Promise.resolve(-1);
}

function openSync(path, flags, mode) {
  return -1;
}

function opendir(path) {
  return Promise.resolve(new Dir());
}

function opendirSync(path) {
  return new Dir();
}

function read(fd, buffer, options) {
  return Promise.resolve(0);
}

function readSync(fd, buffer, options) {
  return 0;
}

function readText(filePath, options) {
  return Promise.resolve("");
}

function readTextSync(filePath, options) {
  return "";
}

function rename(src, dest) {
  return Promise.resolve();
}

function renameSync(src, dest) {}

function rmdir(path) {
  return Promise.resolve();
}

function rmdirSync(path) {}

function stat(path) {
  return Promise.resolve(new Stat());
}

function statSync(path) {
  return new Stat();
}

function symlink(target, src) {
  return Promise.resolve();
}

function symlinkSync(target, src) {}

function truncate(path, len) {
  return Promise.resolve();
}

function truncateSync(path, len) {}

function unlink(path) {
  return Promise.resolve();
}

function unlinkSync(path) {}

function write(fd, buffer, options) {
  return Promise.resolve(0);
}

function writeSync(fd, buffer, options) {
  return 0;
}

function writeText(filePath, content) {
  return Promise.resolve();
}

function writeTextSync(filePath, content) {}

var OpenMode = {
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

var WhenceType = {
  SEEK_SET: 0,
  SEEK_CUR: 1,
  SEEK_END: 2,
};

var Filter = {
  EXCLUDE_START_WITH_DOT: 1,
};

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
