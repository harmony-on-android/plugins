/*
 * HDS Component mock for ArkUI-X
 *
 * Provides ViewV2-based mock implementations of HDS components plus
 * enums, stubs, and delegations — all exported as ES module exports.
 *
 * The compiled ABC is embedded into libhms_hds.so and loaded via
 * napi_module_with_js (ABC-only, no NAPI register_func — matches popup pattern).
 *
 * Pattern reference: advanced_ui_component/arcbutton/interfaces/arcbutton.js
 * V2 decorators: @ObservedV2, @Trace, @Param, @Local
 */

var __decorate = (this && this.__decorate) || function (t1, target, key, desc) {
    var c = arguments.length;
    var r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
    var d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(t1, target, key, desc);
    } else {
        for (var u1 = t1.length - 1; u1 >= 0; u1--) {
            if (d = t1[u1]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}

// =========================================================================
// ActionBarButton: @ObservedV2 class with @Trace fields
// =========================================================================
let ActionBarButton = class ActionBarButton {
    constructor(options) {
        this.baseIcon = options?.baseIcon;
        this.altIcon = options?.altIcon;
        this.enabled = options?.enabled !== undefined ? options.enabled : true;
        this.iconFillColor = options?.iconFillColor;
        this.iconSize = options?.iconSize;
        this.width = options?.width;
        this.backgroundColor = options?.backgroundColor;
        this.shadowStyle = options?.shadowStyle;
        this.onClick = options?.onClick;
        this.accessibilityText = options?.accessibilityText;
        this.accessibilityDescription = options?.accessibilityDescription;
        this.accessibilityLevel = options?.accessibilityLevel;
        this.id = options?.id;
        this.hoverTips = options?.hoverTips;
        this.buttonModifier = options?.buttonModifier;
    }
};
__decorate([Trace], ActionBarButton.prototype, "baseIcon", void 0);
__decorate([Trace], ActionBarButton.prototype, "altIcon", void 0);
__decorate([Trace], ActionBarButton.prototype, "enabled", void 0);
__decorate([Trace], ActionBarButton.prototype, "iconFillColor", void 0);
__decorate([Trace], ActionBarButton.prototype, "iconSize", void 0);
__decorate([Trace], ActionBarButton.prototype, "width", void 0);
__decorate([Trace], ActionBarButton.prototype, "backgroundColor", void 0);
__decorate([Trace], ActionBarButton.prototype, "shadowStyle", void 0);
__decorate([Trace], ActionBarButton.prototype, "onClick", void 0);
__decorate([Trace], ActionBarButton.prototype, "accessibilityText", void 0);
__decorate([Trace], ActionBarButton.prototype, "accessibilityDescription", void 0);
__decorate([Trace], ActionBarButton.prototype, "accessibilityLevel", void 0);
__decorate([Trace], ActionBarButton.prototype, "id", void 0);
__decorate([Trace], ActionBarButton.prototype, "hoverTips", void 0);
__decorate([Trace], ActionBarButton.prototype, "buttonModifier", void 0);
ActionBarButton = __decorate([ObservedV2], ActionBarButton);
export { ActionBarButton };

// =========================================================================
// ActionBarStyle: @ObservedV2 class with @Trace fields
// =========================================================================
let ActionBarStyle = class ActionBarStyle {
    constructor(options) {
        this.height = options?.height;
        this.backgroundColor = options?.backgroundColor;
        this.backgroundBlurStyle = options?.backgroundBlurStyle;
        this.innerSpace = options?.innerSpace;
        this.startSpace = options?.startSpace;
        this.endSpace = options?.endSpace;
        this.enabled = options?.enabled !== undefined ? options.enabled : true;
        this.isHorizontal = options?.isHorizontal !== undefined ? options.isHorizontal : true;
        this.isPrimaryIconChanged = options?.isPrimaryIconChanged !== undefined ? options.isPrimaryIconChanged : false;
        this.margin = options?.margin;
    }
};
__decorate([Trace], ActionBarStyle.prototype, "height", void 0);
__decorate([Trace], ActionBarStyle.prototype, "backgroundColor", void 0);
__decorate([Trace], ActionBarStyle.prototype, "backgroundBlurStyle", void 0);
__decorate([Trace], ActionBarStyle.prototype, "innerSpace", void 0);
__decorate([Trace], ActionBarStyle.prototype, "startSpace", void 0);
__decorate([Trace], ActionBarStyle.prototype, "endSpace", void 0);
__decorate([Trace], ActionBarStyle.prototype, "enabled", void 0);
__decorate([Trace], ActionBarStyle.prototype, "isHorizontal", void 0);
__decorate([Trace], ActionBarStyle.prototype, "isPrimaryIconChanged", void 0);
__decorate([Trace], ActionBarStyle.prototype, "margin", void 0);
ActionBarStyle = __decorate([ObservedV2], ActionBarStyle);
export { ActionBarStyle };

// =========================================================================
// HdsActionBar: @ComponentV2 struct (ViewV2-based)
// =========================================================================
export class HdsActionBar extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);

        this.initParam("primaryButton", (params && "primaryButton" in params) ? params.primaryButton : undefined);
        this.initParam("startButtons", (params && "startButtons" in params) ? params.startButtons : undefined);
        this.initParam("endButtons", (params && "endButtons" in params) ? params.endButtons : undefined);
        this.initParam("actionBarStyle", (params && "actionBarStyle" in params) ? params.actionBarStyle : undefined);
        this.initParam("isExpand", (params && "isExpand" in params) ? params.isExpand : false);
        this.initParam("blurStrategy", (params && "blurStrategy" in params) ? params.blurStrategy : undefined);

        this.finalizeConstruction();
    }

    resetStateVarsOnReuse(params) {
        this.resetParam("primaryButton", (params && "primaryButton" in params) ? params.primaryButton : undefined);
        this.resetParam("startButtons", (params && "startButtons" in params) ? params.startButtons : undefined);
        this.resetParam("endButtons", (params && "endButtons" in params) ? params.endButtons : undefined);
        this.resetParam("actionBarStyle", (params && "actionBarStyle" in params) ? params.actionBarStyle : undefined);
        this.resetParam("isExpand", (params && "isExpand" in params) ? params.isExpand : false);
        this.resetParam("blurStrategy", (params && "blurStrategy" in params) ? params.blurStrategy : undefined);
        this.resetMonitorsOnReuse();
    }

    _isHorizontal() {
        return this.actionBarStyle?.isHorizontal !== false;
    }

    _barEnabled() {
        return this.actionBarStyle?.enabled !== false;
    }

    _barHeight() {
        return this.actionBarStyle?.height ?? 56;
    }

    _innerSpace() {
        return this.actionBarStyle?.innerSpace ?? 0;
    }

    _startPad() {
        return this.actionBarStyle?.startSpace ?? 16;
    }

    _endPad() {
        return this.actionBarStyle?.endSpace ?? 16;
    }

    _btnIconSize(btn) {
        return btn?.iconSize ?? 24;
    }

    _resolveIcon(btn, isPrimary) {
        if (isPrimary && this.actionBarStyle?.isPrimaryIconChanged && btn?.altIcon) {
            return btn.altIcon;
        }
        return btn?.baseIcon;
    }

    _renderButton(btn, isPrimary) {
        const btnSize = btn?.width ?? 40;
        const iconSize = this._btnIconSize(btn);
        const enabled = btn?.enabled !== false;
        // Pre-compute component type from baseIcon (doesn't change between renders)
        const baseIsSymbol = btn?.baseIcon && typeof btn?.baseIcon === 'object' && btn.baseIcon.type === 40000;

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(btnSize);
            Row.height(btnSize);
            Row.borderRadius(btnSize / 2);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            if (!enabled) { Row.opacity(0.4); }
            if (btn?.backgroundColor) { Row.backgroundColor(btn.backgroundColor); }
            if (btn?.shadowStyle != null) { Row.shadow(btn.shadowStyle); }
            Row.onClick(() => {
                if (enabled && btn?.onClick) { btn.onClick(); }
            });
        }, Row);

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Resolve icon INSIDE callback so ObserveV2 tracks this.actionBarStyle reads
            const icon = this._resolveIcon(btn, isPrimary);
            If.create();
            if (icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        const resolved = this._resolveIcon(btn, isPrimary);
                        if (baseIsSymbol) {
                            SymbolGlyph.create(resolved);
                            SymbolGlyph.fontSize(iconSize);
                            if (btn?.iconFillColor) { SymbolGlyph.fontColor([btn.iconFillColor]); }
                        } else {
                            Image.create(resolved);
                            Image.width(iconSize);
                            Image.height(iconSize);
                            if (btn?.iconFillColor) { Image.fillColor(btn.iconFillColor); }
                        }
                    }, baseIsSymbol ? SymbolGlyph : Image);
                });
            } else {
                this.ifElseBranchUpdateFunction(1, () => { });
            }
        }, If);
        If.pop();

        Row.pop();
    }

    initialRender() {
        const isHorizontal = this._isHorizontal();
        const innerSpace = this._innerSpace();
        const bgColor = this.actionBarStyle?.backgroundColor;
        const bgBlur = this.actionBarStyle?.backgroundBlurStyle;
        const margin = this.actionBarStyle?.margin;

        // Container — Row (horizontal) or Column (vertical)
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            if (isHorizontal) {
                Row.create();
                Row.width("100%");
                Row.height(this._barHeight());
                Row.alignItems(VerticalAlign.Center);
                Row.padding({ left: this._startPad(), right: this._endPad() });
                if (innerSpace) { Row.space(innerSpace); }
                if (bgColor) { Row.backgroundColor(bgColor); }
                if (bgBlur != null) { Row.backgroundBlurStyle(bgBlur); }
                if (margin) { Row.margin(margin); }
            } else {
                Column.create();
                Column.width("100%");
                Column.alignItems(HorizontalAlign.Center);
                Column.padding({ top: this._startPad(), bottom: this._endPad() });
                if (innerSpace) { Column.space(innerSpace); }
                if (bgColor) { Column.backgroundColor(bgColor); }
                if (bgBlur != null) { Column.backgroundBlurStyle(bgBlur); }
                if (margin) { Column.margin(margin); }
            }
        }, isHorizontal ? Row : Column);

        // Start buttons
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.startButtons && this.startButtons.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    for (let i = 0; i < this.startButtons.length; i++) {
                        this._renderButton(this.startButtons[i], false);
                    }
                });
            } else {
                this.ifElseBranchUpdateFunction(1, () => { });
            }
        }, If);
        If.pop();

        // Spacer before primary button (horizontal only)
        if (isHorizontal) {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                Blank.create();
            }, Blank);
            Blank.pop();
        }

        // Primary button
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.primaryButton) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this._renderButton(this.primaryButton, true);
                });
            } else {
                this.ifElseBranchUpdateFunction(1, () => { });
            }
        }, If);
        If.pop();

        // Spacer before end buttons (horizontal only)
        if (isHorizontal) {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                Blank.create();
            }, Blank);
            Blank.pop();
        }

        // End buttons
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.endButtons && this.endButtons.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    for (let i = 0; i < this.endButtons.length; i++) {
                        this._renderButton(this.endButtons[i], false);
                    }
                });
            } else {
                this.ifElseBranchUpdateFunction(1, () => { });
            }
        }, If);
        If.pop();

        if (isHorizontal) {
            Row.pop();
        } else {
            Column.pop();
        }
    }

    updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("primaryButton" in params) {
            this.updateParam("primaryButton", params.primaryButton);
        }
        if ("startButtons" in params) {
            this.updateParam("startButtons", params.startButtons);
        }
        if ("endButtons" in params) {
            this.updateParam("endButtons", params.endButtons);
        }
        if ("actionBarStyle" in params) {
            this.updateParam("actionBarStyle", params.actionBarStyle);
        }
        if ("isExpand" in params) {
            this.updateParam("isExpand", params.isExpand);
        }
        if ("blurStrategy" in params) {
            this.updateParam("blurStrategy", params.blurStrategy);
        }
    }

    rerender() {
        this.updateDirtyElements();
    }
}
__decorate([Param], HdsActionBar.prototype, "primaryButton", void 0);
__decorate([Param], HdsActionBar.prototype, "startButtons", void 0);
__decorate([Param], HdsActionBar.prototype, "endButtons", void 0);
__decorate([Param], HdsActionBar.prototype, "actionBarStyle", void 0);
__decorate([Param], HdsActionBar.prototype, "isExpand", void 0);
__decorate([Param], HdsActionBar.prototype, "blurStrategy", void 0);

// =========================================================================
// HdsSideBar: @ComponentV2 struct (ViewV2-based)
// Delegates to ArkUI-X SideBarContainer with @BuilderParam children
// =========================================================================
export class HdsSideBar extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);

        // @BuilderParam — stored directly, not via initParam (not @Param)
        this.sideBarPanelBuilder = params?.sideBarPanelBuilder;
        this.contentPanelBuilder = params?.contentPanelBuilder;

        // @Event callback — stored directly (not @Param)
        this.$isShowSideBar = params?.$isShowSideBar;

        // @Param fields
        this.initParam("contentAreaMask", (params && "contentAreaMask" in params) ? params.contentAreaMask : undefined);
        this.initParam("isShowSideBar", (params && "isShowSideBar" in params) ? params.isShowSideBar : undefined);
        this.initParam("minSideBarWidth", (params && "minSideBarWidth" in params) ? params.minSideBarWidth : undefined);
        this.initParam("maxSideBarWidth", (params && "maxSideBarWidth" in params) ? params.maxSideBarWidth : undefined);
        this.initParam("minContentWidth", (params && "minContentWidth" in params) ? params.minContentWidth : undefined);
        this.initParam("sideBarColor", (params && "sideBarColor" in params) ? params.sideBarColor : undefined);
        this.initParam("contentColor", (params && "contentColor" in params) ? params.contentColor : undefined);
        this.initParam("sideBarWidth", (params && "sideBarWidth" in params) ? params.sideBarWidth : undefined);
        this.initParam("autoHide", (params && "autoHide" in params) ? params.autoHide : undefined);
        this.initParam("isSideBarBlur", (params && "isSideBarBlur" in params) ? params.isSideBarBlur : undefined);
        this.initParam("sideBarPosition", (params && "sideBarPosition" in params) ? params.sideBarPosition : undefined);
        this.initParam("onChange", (params && "onChange" in params) ? params.onChange : undefined);
        this.initParam("sideBarContainerType", (params && "sideBarContainerType" in params) ? params.sideBarContainerType : undefined);
        this.initParam("swipeEnabled", (params && "swipeEnabled" in params) ? params.swipeEnabled : undefined);
        this.initParam("scaleContentEnabled", (params && "scaleContentEnabled" in params) ? params.scaleContentEnabled : undefined);

        this.finalizeConstruction();
    }

    resetStateVarsOnReuse(params) {
        this.sideBarPanelBuilder = params?.sideBarPanelBuilder;
        this.contentPanelBuilder = params?.contentPanelBuilder;
        this.$isShowSideBar = params?.$isShowSideBar;

        this.resetParam("contentAreaMask", (params && "contentAreaMask" in params) ? params.contentAreaMask : undefined);
        this.resetParam("isShowSideBar", (params && "isShowSideBar" in params) ? params.isShowSideBar : undefined);
        this.resetParam("minSideBarWidth", (params && "minSideBarWidth" in params) ? params.minSideBarWidth : undefined);
        this.resetParam("maxSideBarWidth", (params && "maxSideBarWidth" in params) ? params.maxSideBarWidth : undefined);
        this.resetParam("minContentWidth", (params && "minContentWidth" in params) ? params.minContentWidth : undefined);
        this.resetParam("sideBarColor", (params && "sideBarColor" in params) ? params.sideBarColor : undefined);
        this.resetParam("contentColor", (params && "contentColor" in params) ? params.contentColor : undefined);
        this.resetParam("sideBarWidth", (params && "sideBarWidth" in params) ? params.sideBarWidth : undefined);
        this.resetParam("autoHide", (params && "autoHide" in params) ? params.autoHide : undefined);
        this.resetParam("isSideBarBlur", (params && "isSideBarBlur" in params) ? params.isSideBarBlur : undefined);
        this.resetParam("sideBarPosition", (params && "sideBarPosition" in params) ? params.sideBarPosition : undefined);
        this.resetParam("onChange", (params && "onChange" in params) ? params.onChange : undefined);
        this.resetParam("sideBarContainerType", (params && "sideBarContainerType" in params) ? params.sideBarContainerType : undefined);
        this.resetParam("swipeEnabled", (params && "swipeEnabled" in params) ? params.swipeEnabled : undefined);
        this.resetParam("scaleContentEnabled", (params && "scaleContentEnabled" in params) ? params.scaleContentEnabled : undefined);
        this.resetMonitorsOnReuse();
    }

    _applyAttributes() {
        if (this.isShowSideBar !== undefined) {
            SideBarContainer.showSideBar(this.isShowSideBar);
        }
        if (this.sideBarWidth !== undefined) {
            SideBarContainer.sideBarWidth(this.sideBarWidth);
        }
        if (this.minSideBarWidth !== undefined) {
            SideBarContainer.minSideBarWidth(this.minSideBarWidth);
        }
        if (this.maxSideBarWidth !== undefined) {
            SideBarContainer.maxSideBarWidth(this.maxSideBarWidth);
        }
        if (this.minContentWidth !== undefined) {
            SideBarContainer.minContentWidth(this.minContentWidth);
        }
        if (this.autoHide !== undefined) {
            SideBarContainer.autoHide(this.autoHide);
        }
        if (this.sideBarPosition !== undefined) {
            SideBarContainer.sideBarPosition(this.sideBarPosition);
        }
        if (this.sideBarColor !== undefined) {
            SideBarContainer.sideBarBackgroundColor(this.sideBarColor);
        }
        if (this.contentColor !== undefined) {
            SideBarContainer.contentBackgroundColor(this.contentColor);
        }
        if (this.isSideBarBlur) {
            SideBarContainer.sideBarBackgroundBlurStyle(BlurStyle.REGULAR);
        }
        if (this.swipeEnabled !== undefined) {
            SideBarContainer.showSideBarWithGesture(this.swipeEnabled);
        }
        SideBarContainer.showControlButton(true);
        if (this.$isShowSideBar !== undefined || this.onChange !== undefined) {
            SideBarContainer.onChange((isShow) => {
                if (this.$isShowSideBar) {
                    this.$isShowSideBar(isShow);
                }
                if (this.onChange) {
                    this.onChange(isShow);
                }
            });
        }
    }

    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SideBarContainer.create(this.sideBarContainerType);
            this._applyAttributes();
        }, SideBarContainer);

        if (this.sideBarPanelBuilder) {
            this.sideBarPanelBuilder.bind(this)();
        }
        if (this.contentPanelBuilder) {
            this.contentPanelBuilder.bind(this)();
        }

        SideBarContainer.pop();
    }

    updateStateVars(params) {
        if (params === undefined) { return; }
        if ("isShowSideBar" in params) {
            this.updateParam("isShowSideBar", params.isShowSideBar);
        }
        if ("sideBarWidth" in params) {
            this.updateParam("sideBarWidth", params.sideBarWidth);
        }
        if ("minSideBarWidth" in params) {
            this.updateParam("minSideBarWidth", params.minSideBarWidth);
        }
        if ("maxSideBarWidth" in params) {
            this.updateParam("maxSideBarWidth", params.maxSideBarWidth);
        }
        if ("minContentWidth" in params) {
            this.updateParam("minContentWidth", params.minContentWidth);
        }
        if ("autoHide" in params) {
            this.updateParam("autoHide", params.autoHide);
        }
        if ("sideBarPosition" in params) {
            this.updateParam("sideBarPosition", params.sideBarPosition);
        }
        if ("sideBarColor" in params) {
            this.updateParam("sideBarColor", params.sideBarColor);
        }
        if ("contentColor" in params) {
            this.updateParam("contentColor", params.contentColor);
        }
        if ("isSideBarBlur" in params) {
            this.updateParam("isSideBarBlur", params.isSideBarBlur);
        }
        if ("swipeEnabled" in params) {
            this.updateParam("swipeEnabled", params.swipeEnabled);
        }
        if ("contentAreaMask" in params) {
            this.updateParam("contentAreaMask", params.contentAreaMask);
        }
        if ("scaleContentEnabled" in params) {
            this.updateParam("scaleContentEnabled", params.scaleContentEnabled);
        }
        if ("sideBarContainerType" in params) {
            this.updateParam("sideBarContainerType", params.sideBarContainerType);
        }
        if ("onChange" in params) {
            this.updateParam("onChange", params.onChange);
        }
    }

    rerender() {
        this.updateDirtyElements();
    }
}
__decorate([Param], HdsSideBar.prototype, "contentAreaMask", void 0);
__decorate([Param], HdsSideBar.prototype, "isShowSideBar", void 0);
__decorate([Param], HdsSideBar.prototype, "minSideBarWidth", void 0);
__decorate([Param], HdsSideBar.prototype, "maxSideBarWidth", void 0);
__decorate([Param], HdsSideBar.prototype, "minContentWidth", void 0);
__decorate([Param], HdsSideBar.prototype, "sideBarColor", void 0);
__decorate([Param], HdsSideBar.prototype, "contentColor", void 0);
__decorate([Param], HdsSideBar.prototype, "sideBarWidth", void 0);
__decorate([Param], HdsSideBar.prototype, "autoHide", void 0);
__decorate([Param], HdsSideBar.prototype, "isSideBarBlur", void 0);
__decorate([Param], HdsSideBar.prototype, "sideBarPosition", void 0);
__decorate([Param], HdsSideBar.prototype, "onChange", void 0);
__decorate([Param], HdsSideBar.prototype, "sideBarContainerType", void 0);
__decorate([Param], HdsSideBar.prototype, "swipeEnabled", void 0);
__decorate([Param], HdsSideBar.prototype, "scaleContentEnabled", void 0);

// =========================================================================
// Component delegations: HDS components → ArkUI built-ins
// =========================================================================
// ArkUI-X's Navigation is missing some OHOS API 12+ methods
// (bindToScrollable, titleBar, bindContentCover).  Wrap in a Proxy
// so missing static methods return a noop instead of undefined,
// preventing "@ComponentV2 has error in update func" blank screens.
//
// The Proxy also intercepts titleBar to convert the HDS content format
// (where menu items are wrapped in a "content" object with label/icon/action)
// to the standard ArkUI format (where value/icon/action are direct properties).
// Without this conversion, the title bar menus (search, "+" add button) are
// invisible because ArkUI-X's Navigation doesn't understand the HDS format.
var _navNoop = function () { return undefined; };

// Convert HDS-format menu items to ArkUI format.
// HDS: { content: { label, icon, isEnabled, action } }
// ArkUI: { value, icon, action, isEnabled }
function _hdsUnwrapMenuItem(item) {
    if (item && item.content && typeof item.content === 'object') {
        var c = item.content;
        if (!item.value && c.label !== undefined) item.value = c.label;
        if (!item.icon && c.icon !== undefined) item.icon = c.icon;
        if (!item.action && c.action !== undefined) item.action = c.action;
        if (!item.isEnabled && c.isEnabled !== undefined) item.isEnabled = c.isEnabled;
    }
    return item;
}

// Convert HDS-format titleBar config to ArkUI format.
// HDS wraps title and menu inside a "content" property.
function _hdsUnwrapTitleBar(config) {
    if (config && config.content && typeof config.content === 'object') {
        var c = config.content;
        // Flatten content.title.mainTitle → title
        if (c.title && typeof c.title === 'object') {
            if (c.title.mainTitle !== undefined) config.title = c.title.mainTitle;
            if (c.title.subTitle !== undefined) config.subTitle = c.title.subTitle;
        }
        // Flatten content.menu.value items
        if (c.menu && c.menu.value && Array.isArray(c.menu.value)) {
            var items = c.menu.value;
            for (var i = 0; i < items.length; i++) {
                _hdsUnwrapMenuItem(items[i]);
            }
            // ArkUI reads "menu" prop for menu items; ensure value array is accessible
            if (!config.menu) config.menu = c.menu;
        }
    }
    return config;
}

// Patch Navigation component to support HDS titleBar API.
// ArkUI-X's Navigation doesn't have titleBar(), so we inject it via
// the prototype.  When the ArkTS compiler generates
//   HdsNavigation.titleBar.call(instance, config)
// our Proxy returns this function, which delegates to the underlying
// Navigation.title() to set the title text.
if (Navigation.prototype) {
    Navigation.prototype.titleBar = function (config) {
        _hdsUnwrapTitleBar(config);
        // Use the extracted title (may be a Resource reference or string).
        // Navigation.title() accepts both plain strings and Resource refs.
        if (config && config.content && config.content.title &&
            config.content.title.mainTitle !== undefined) {
            this.title(config.content.title.mainTitle);
        } else if (config && config.main !== undefined) {
            this.title(config.main);
        }
        // NOTE: Menu buttons (content.menu.value) are not yet supported
        // because ArkUI-X Navigation lacks the titleBar menu rendering path.
        // The search bar can be toggled by long-pressing the title bar.
    };
}

var _HdsNavigationProxy = {
    get: function (target, prop, receiver) {
        if (prop in target) {
            return target[prop];
        }
        if (typeof prop === 'symbol') {
            return undefined;
        }
        // HDS methods missing from ArkUI-X Navigation.
        // The ArkTS compiler accesses chain methods as static properties
        // on the module export (e.g. HdsNavigation.titleBar), so our Proxy
        // can provide compat shims here.
        if (prop === 'titleBar') {
            return function (config) {
                return Navigation.prototype.titleBar.call(this, config);
            };
        }
        return _navNoop;
    }
};
export const HdsNavigation = new Proxy(Navigation, _HdsNavigationProxy);
export const HdsNavDestination = NavDestination;
export const HdsTabs = Tabs;
export const HdsListItemCard = ListItem;
export const HdsListItem = ListItem;

// =========================================================================
// BottomTabBarStyle — ArkUI global class (not HDS-specific, but provided
// here because ArkUI-X doesn't auto-register all API-12 globals).
// Used by TabContent.tabBar(BottomTabBarStyle.of(...)).
// =========================================================================
class BottomTabBarStyleImpl {
    constructor(icon, text) {
        this.type = "BottomTabBarStyle";
        this.icon = icon;
        this.text = text;
    }
    static of(icon, text) {
        return new BottomTabBarStyleImpl(icon, text);
    }
    labelStyle(value) { this.labelStyle_ = value; return this; }
    padding(value) { this.padding = value; return this; }
    layoutMode(value) { this.layoutMode = value; return this; }
    verticalAlign(value) { this.verticalAlign = value; return this; }
    symmetricExtensible(value) { this.symmetricExtensible = value; return this; }
    id(value) { this.id = value; return this; }
    iconStyle(style) { this.iconStyle_ = style; return this; }
}
globalThis.BottomTabBarStyle = BottomTabBarStyleImpl;
export { BottomTabBarStyleImpl as BottomTabBarStyle };

// =========================================================================
// PrefixItem / SuffixItem base classes
// SDK: abstract data-container classes, no fields
// =========================================================================
export class PrefixItem {
}
export class SuffixItem {
}

// =========================================================================
// Prefix subclasses — data containers that HAP constructs with options
// =========================================================================
export class PrefixImage extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixIcon extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixBadge extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixSwitch extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixToggleButton extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixButton extends PrefixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class PrefixCustomBuilder extends PrefixItem {
    constructor(customBuilder) {
        super();
        this.customBuilder = customBuilder;
    }
}

// =========================================================================
// Suffix subclasses — data containers that HAP constructs with options
// =========================================================================
export class SuffixText extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixImage extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixLoadingProgress extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixRadio extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixCheckbox extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixSwitch extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixArrow extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixBadge extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixButton extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixIcon extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixSubIcon extends SuffixItem {
    constructor(options, subOptions) {
        super();
        this.options = options;
        this.subOptions = subOptions;
    }
}
export class SuffixSelect extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixToggleButton extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixBadgeAndArrow extends SuffixItem {
    constructor(badgeOptions, arrowOptions) {
        super();
        this.badgeOptions = badgeOptions;
        this.arrowOptions = arrowOptions;
    }
}
export class SuffixTextAndArrow extends SuffixItem {
    constructor(textOptions, arrowOptions) {
        super();
        this.textOptions = textOptions;
        this.arrowOptions = arrowOptions;
    }
}
export class SuffixArrowIconText extends SuffixItem {
    constructor(options) {
        super();
        this.options = options;
    }
}
export class SuffixCustomBuilder extends SuffixItem {
    constructor(customBuilder) {
        super();
        this.customBuilder = customBuilder;
    }
}

// =========================================================================
// Attribute / Modifier classes
// =========================================================================
export class HdsListItemCardAttribute {
}
export class HdsListItemCardModifier extends HdsListItemCardAttribute {
    applyNormalAttribute(instance) { }
}
export class HdsTabsAttribute {
}
export class HdsTabsModifier extends HdsTabsAttribute {
    applyNormalAttribute(instance) { }
}

// =========================================================================
// HdsTabsController — extends TabsController (global from ArkUI)
// =========================================================================
export class HdsTabsController extends TabsController {
    bindScroller(value, scroller, parentScroller) { }
    unbindScroller(scroller) { }
    applyMiniBarStyle(style) { }
    applyHideAnimation(mode) { }
    applyShowAnimation(mode) { }
}

// =========================================================================
// HdsSnackBar — UI-level stub (not rendered, no-op)
// =========================================================================
export class HdsSnackBar {
    constructor(uiContext) {
        this.uiContext = uiContext;
    }
    show(icon, message, operation, style) { }
    dismiss() { }
}
export const SnackBarOperationType = {
    TEXT_ONLY: 0,
    CLOSE_BUTTON_ONLY: 1,
    TEXT_WITH_ARROW: 2,
    TEXT_WITH_CLOSE: 3,
    HIGHLIGHT_TEXT_WITH_CLOSE: 4,
};
export const SnackBarIconType = {
    SMALL: 0,
    NORMAL: 1,
};

// =========================================================================
// hdsMaterial namespace
// =========================================================================
export const hdsMaterial = {
    MaterialType: {
        NONE: 0,
        ADAPTIVE: 100,
        IMMERSIVE: 101,
    },
    MaterialLevel: {
        EXQUISITE: 0,
        GENTLE: 1,
        SMOOTH: 2,
        ADAPTIVE: 10,
    },
    getSystemMaterialTypes() {
        return [hdsMaterial.MaterialType.NONE];
    },
};

// =========================================================================
// Enums
// =========================================================================
// ScrollEffectType (SDK: hdsBaseComponent)
export const ScrollEffectType = {
    COMMON_BLUR: 0,
    GRADUAL_BLUR: 1,
    GRADIENT_BLUR: 2,
    IMMERSIVE_GRADIENT_BLUR: 3,
};
// HdsNavigationTitleMode (SDK: hdsBaseComponent)
export const HdsNavigationTitleMode = {
    FREE: 0,
    FULL: 1,
    MINI: 2,
    MODAL: 3,
};
// HdsNavDestinationTitleMode (SDK: hdsBaseComponent)
export const HdsNavDestinationTitleMode = {
    MINI: 100,
    MODAL: 101,
};
// DividerMode (SDK: hdsBaseComponent)
export const DividerMode = {
    VISIBLE: 0,
    NONE: 1,
    FOLLOW_SCROLL: 2,
};
// DividerShowType (SDK: hdsBaseComponent)
export const DividerShowType = {
    OFF: 0,
    ON: 1,
    AUTO: 2,
};
// TextStyleMode (SDK: hdsBaseComponent)
export const TextStyleMode = {
    NORMAL: 200,
    SINGLE_CHARACTER: 201,
};
// BottomBuilderShowType (SDK: hdsBaseComponent)
export const BottomBuilderShowType = {
    DIRECTLY_SHOW: 0,
    OVERDRAG_SHOW: 1,
};
// HideMode (SDK: hdsBaseComponent)
export const HideMode = {
    SCROLL_UP_TO: 0,
    SCROLL_UP: 1,
    SCROLL_DOWN: 2,
    SCROLL_UP_TO_BLEND_SCROLL_UP: 3,
};
// IconStyleMode (SDK: hdsBaseComponent)
export const IconStyleMode = {
    SMALL: 100,
    NORMAL: 101,
    LARGE: 102,
};
// BlurStrategy (SDK: hdsBaseComponent)
export const BlurStrategy = {
    ENABLE: 0,
    DISABLE: 1,
    ADAPTIVE: 2,
};
// TitleSize (SDK: hdsBaseComponent)
export const TitleSize = {
    TITLE_S: 0,
    TITLE_ML: 1,
};
// IconSize (SDK: hdsBaseComponent)
export const IconSize = {
    SMALL_ICON: 1,
    SYSTEM_ICON: 2,
};
// HdsBarStyle (SDK: hdsBaseComponent)
export const HdsBarStyle = {
    COLLAPSE: 0,
    EXPAND: 1,
};
// HdsTabsBarChangeMode (SDK: hdsBaseComponent)
export const HdsTabsBarChangeMode = {
    NORMAL: 0,
    USER_CLICK: 1,
    APP_TRIGGER: 2,
};
// HdsAnimationMode (SDK: hdsBaseComponent)
export const HdsAnimationMode = {
    SCROLL_ANIMATION: 0,
    CLICK_ANIMATION: 1,
};
// ExtendBarMode (SDK: hdsBaseComponent)
export const ExtendBarMode = {
    HALF_SCREEN_FIXED: 100,
};
// SwipeDeleteTriggerType (SDK: HdsStyle)
export const SwipeDeleteTriggerType = {
    NORMAL_TRIGGER: 0,
    EASY_TRIGGER: 1,
    NO_TRIGGER: 2,
};

// =========================================================================
// symbolRegister namespace (SDK: symbolRegister)
// =========================================================================
export const symbolRegister = {
    registerSymbol(ttfSrc, jsonSrc) {
        return false;
    },
};

// =========================================================================
// Instance / Attribute stub functions
// =========================================================================
export function HdsNavigationInstance() { }
export function HdsNavDestinationInstance() { }
export function HdsNavigationAttribute() { }
export function HdsNavDestinationAttribute() { }
export function HdsTabsInstance() { }
export function HdsListItemCardInstance() { }
export function bleedIconStyle(builder) { }

// =========================================================================
// Default export (required by GetExportObjectFromBuffer("default"))
// =========================================================================
export default {
    HdsActionBar,
    HdsSideBar,
    ActionBarButton,
    ActionBarStyle,
    HdsNavigation,
    HdsNavDestination,
    HdsTabs,
    HdsListItemCard,
    HdsListItem,
    // Prefix
    PrefixItem,
    PrefixImage,
    PrefixIcon,
    PrefixBadge,
    PrefixSwitch,
    PrefixToggleButton,
    PrefixButton,
    PrefixCustomBuilder,
    // Suffix
    SuffixItem,
    SuffixText,
    SuffixImage,
    SuffixLoadingProgress,
    SuffixRadio,
    SuffixCheckbox,
    SuffixSwitch,
    SuffixArrow,
    SuffixBadge,
    SuffixButton,
    SuffixIcon,
    SuffixSubIcon,
    SuffixSelect,
    SuffixToggleButton,
    SuffixBadgeAndArrow,
    SuffixTextAndArrow,
    SuffixArrowIconText,
    SuffixCustomBuilder,
    // Attribute / Modifier
    HdsListItemCardAttribute,
    HdsListItemCardModifier,
    HdsTabsAttribute,
    HdsTabsModifier,
    // Controller
    HdsTabsController,
    // SnackBar
    HdsSnackBar,
    SnackBarOperationType,
    SnackBarIconType,
    // Material
    hdsMaterial,
    // Enums
    ScrollEffectType,
    HdsNavigationTitleMode,
    HdsNavDestinationTitleMode,
    DividerMode,
    DividerShowType,
    TextStyleMode,
    BottomBuilderShowType,
    HideMode,
    IconStyleMode,
    BlurStrategy,
    TitleSize,
    IconSize,
    HdsBarStyle,
    HdsTabsBarChangeMode,
    HdsAnimationMode,
    ExtendBarMode,
    SwipeDeleteTriggerType,
    // symbolRegister
    symbolRegister,
    // Instance / Attribute stubs
    HdsNavigationInstance,
    HdsNavDestinationInstance,
    HdsNavigationAttribute,
    HdsNavDestinationAttribute,
    HdsTabsInstance,
    HdsListItemCardInstance,
    bleedIconStyle,
};
