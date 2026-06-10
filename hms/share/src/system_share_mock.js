/*
 * systemShare API stub for HOA (Harmony on Android)
 *
 * Provides mock implementations for @kit.ShareKit / @hms.collaboration.systemShare.
 * The compiled ABC is embedded into libsharekit.so.
 *
 * Module name (after @hms: stripping):
 *   collaboration.systemShare
 *
 * The native share panel is bridged to Android's Intent.ACTION_SEND.
 * ShareController.show() calls the native showSharePanel() function exported
 * by the C++ stub (nm_register_func).
 *
 * Flattened default export pattern — all names are unique across the namespace.
 */

// =========================================================================
// Enums — values match SDK 4.1.0+ declarations
// =========================================================================
var SelectionMode = {
    SINGLE: 1,
    MULTI: 2
};

var SharePreviewMode = {
    DEFAULT: 0,
    DETAIL: 1
};

var ShareAbilityType = {
    ALL: 0,
    CONTACT: 1,
    DEVICE: 2
};

var RevisitShareRecordType = {
    TEXT: 0,
    IMAGE: 1,
    VIDEO: 2,
    FILE: 3
};

// =========================================================================
// SharedRecord — data class
// =========================================================================
class SharedRecord {
    constructor(opts) {
        this.utd = opts ? opts.utd : '';
        this.content = opts ? opts.content : '';
        this.title = opts ? opts.title : '';
        this.description = opts ? opts.description : '';
        this.iconFile = opts ? opts.iconFile : undefined;
        this.thumbnail = opts ? opts.thumbnail : undefined;
    }
}

// =========================================================================
// SharedData — data container
// =========================================================================
class SharedData {
    constructor(record) {
        this._records = [];
        if (record) {
            this._records.push(new SharedRecord(record));
        }
    }

    addRecord(record) {
        this._records.push(new SharedRecord(record));
    }

    getRecords() {
        return this._records;
    }
}

// =========================================================================
// ShareController — launches the share panel
// =========================================================================
class ShareController {
    constructor(data) {
        this._data = data;
        this._dismissCallbacks = [];
    }

    show(context, options) {
        var records = this._data ? this._data.getRecords() : [];
        if (records.length === 0) {
            return Promise.reject(new Error('No share records'));
        }

        var r = records[0];
        var text = r.content || r.title || '';

        // Call native showSharePanel exported by C++ nm_register_func.
        // Falls back gracefully if native function is not available.
        if (typeof showSharePanel === 'function') {
            return showSharePanel(text, r.title || '', r.description || '');
        }

        // Pure mock fallback — resolve immediately (no-op share)
        return Promise.resolve();
    }

    on(type, callback) {
        if (type === 'dismiss' && typeof callback === 'function') {
            this._dismissCallbacks.push(callback);
        }
    }

    off(type, callback) {
        if (type === 'dismiss') {
            var idx = this._dismissCallbacks.indexOf(callback);
            if (idx >= 0) {
                this._dismissCallbacks.splice(idx, 1);
            }
        }
    }
}

// =========================================================================
// Top-level functions
// =========================================================================
function getSharedData(want) {
    return Promise.resolve(new SharedData());
}

function getWant(data, options) {
    return Promise.resolve({});
}

function getContactInfo(want) {
    return Promise.resolve({});
}

// =========================================================================
// Default export — flattened
// =========================================================================
export default {
    SharedData: SharedData,
    SharedRecord: SharedRecord,
    ShareController: ShareController,
    SelectionMode: SelectionMode,
    SharePreviewMode: SharePreviewMode,
    ShareAbilityType: ShareAbilityType,
    RevisitShareRecordType: RevisitShareRecordType,
    getSharedData: getSharedData,
    getWant: getWant,
    getContactInfo: getContactInfo
};
