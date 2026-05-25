/*
 * HDS Component mock for ArkUI-X
 *
 * Provides ViewPU-based mock implementations of HDS components plus
 * enums, stubs, and delegations — all exported as ES module exports.
 *
 * The compiled ABC is embedded into libhms_hds.so and loaded via
 * napi_module_with_js (ABC-only, no NAPI register_func — matches popup pattern).
 *
 * Pattern reference: advanced_ui_component/popup/interfaces/popup.js
 */

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}

// =========================================================================
// ActionBarButton: @Observed class for button options
// =========================================================================
export class ActionBarButton {
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
}

// =========================================================================
// ActionBarStyle: @Observed class for style options
// =========================================================================
export class ActionBarStyle {
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
}

// =========================================================================
// HdsActionBar: @Component struct (ViewPU-based)
// =========================================================================
export class HdsActionBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId, paramsLambda, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }

        this.__primaryButton = params?.primaryButton;
        this.__startButtons = params?.startButtons;
        this.__endButtons = params?.endButtons;
        this.__actionBarStyle = params?.actionBarStyle;
        this.__isExpand = params?.isExpand !== undefined ? params.isExpand : false;
        this.__blurStrategy = params?.blurStrategy;

        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }

    setInitiallyProvidedValue(params) {
    }

    _isHorizontal() {
        return this.__actionBarStyle?.isHorizontal !== false;
    }

    _barEnabled() {
        return this.__actionBarStyle?.enabled !== false;
    }

    _barHeight() {
        return this.__actionBarStyle?.height ?? 56;
    }

    _innerSpace() {
        return this.__actionBarStyle?.innerSpace ?? 0;
    }

    _startPad() {
        return this.__actionBarStyle?.startSpace ?? 16;
    }

    _endPad() {
        return this.__actionBarStyle?.endSpace ?? 16;
    }

    _btnIconSize(btn) {
        return btn?.iconSize ?? 24;
    }

    _renderButton(btn) {
        const btnSize = btn?.width ?? 40;
        const iconSize = this._btnIconSize(btn);
        const icon = btn?.baseIcon;
        const isSymbol = icon && typeof icon === 'object' && icon.type === 40000;

        // Use Row + Image pattern (ref: OHOS Photos ActionBarButton.ets),
        // avoids Button API compatibility issues on ArkUI-X.
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(btnSize);
            Row.height(btnSize);
            Row.borderRadius(btnSize / 2);
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            if (btn?.backgroundColor) { Row.backgroundColor(btn.backgroundColor); }
            if (btn?.shadowStyle != null) { Row.shadow(btn.shadowStyle); }
            Row.onClick(() => {
                if (btn?.onClick) { btn.onClick(); }
            });
        }, Row);

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (icon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isSymbol) {
                            SymbolGlyph.create(icon);
                            SymbolGlyph.fontSize(iconSize);
                            if (btn?.iconFillColor) { SymbolGlyph.fontColor([btn.iconFillColor]); }
                        } else {
                            Image.create(icon);
                            Image.width(iconSize);
                            Image.height(iconSize);
                            if (btn?.iconFillColor) { Image.fillColor(btn.iconFillColor); }
                        }
                    }, isSymbol ? SymbolGlyph : Image);
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
        const bgColor = this.__actionBarStyle?.backgroundColor;
        const bgBlur = this.__actionBarStyle?.backgroundBlurStyle;
        const margin = this.__actionBarStyle?.margin;

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
            if (this.__startButtons && this.__startButtons.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    for (let i = 0; i < this.__startButtons.length; i++) {
                        this._renderButton(this.__startButtons[i]);
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
            if (this.__primaryButton) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this._renderButton(this.__primaryButton);
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
            if (this.__endButtons && this.__endButtons.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    for (let i = 0; i < this.__endButtons.length; i++) {
                        this._renderButton(this.__endButtons[i]);
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

    aboutToAppear() { }
    aboutToDisappear() { }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    rerender() { this.updateDirtyElements(); }
    updateStateVarsOfChildByElmtId(elmtId, params) { }
    purgeVariableDependenciesOnElmtId(elmtId) { }
}

// =========================================================================
// Component delegations: HDS components → ArkUI built-ins
// =========================================================================
export const HdsNavigation = Navigation;
export const HdsNavDestination = NavDestination;
export const HdsTabs = Tabs;
export const HdsListItemCard = ListItem;
export const HdsListItem = ListItem;
export const PrefixImage = Image;
export const SuffixButton = Button;
export const SuffixArrowIconText = Row;

// =========================================================================
// Enums
// =========================================================================
export const ScrollEffectType = { COMMON_BLUR: 0 };
export const HdsNavigationTitleMode = { FREE: 0, FULL: 1, MINI: 2 };
export const DividerMode = { AUTO: 0, ALWAYS: 1, NONE: 2 };
export const HdsNavDestinationTitleMode = { FREE: 0, FULL: 1, MINI: 2 };

// =========================================================================
// Stub functions
// =========================================================================
export function HdsTabsController() { }

export function HdsNavigationInstance() { }
export function HdsNavDestinationInstance() { }
export function HdsNavigationAttribute() { }
export function HdsNavDestinationAttribute() { }
export function HdsTabsInstance() { }
export function HdsTabsAttribute() { }
export function HdsListItemCardInstance() { }
export function HdsListItemCardAttribute() { }

// =========================================================================
// Default export (required by GetExportObjectFromBuffer("default"))
// =========================================================================
export default {
    HdsActionBar,
    ActionBarButton,
    ActionBarStyle,
    HdsNavigation,
    HdsNavDestination,
    HdsTabs,
    HdsListItemCard,
    HdsListItem,
    PrefixImage,
    SuffixButton,
    SuffixArrowIconText,
    ScrollEffectType,
    HdsNavigationTitleMode,
    DividerMode,
    HdsNavDestinationTitleMode,
    HdsTabsController,
    HdsNavigationInstance,
    HdsNavDestinationInstance,
    HdsNavigationAttribute,
    HdsNavDestinationAttribute,
    HdsTabsInstance,
    HdsTabsAttribute,
    HdsListItemCardInstance,
    HdsListItemCardAttribute,
};
