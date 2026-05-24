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
        this.onClick = options?.onClick;
        this.accessibilityText = options?.accessibilityText;
        this.id = options?.id;
        this.hoverTips = options?.hoverTips;
    }
}

// =========================================================================
// ActionBarStyle: @Observed class for style options
// =========================================================================
export class ActionBarStyle {
    constructor(options) {
        this.height = options?.height;
        this.backgroundColor = options?.backgroundColor;
        this.innerSpace = options?.innerSpace;
        this.startSpace = options?.startSpace;
        this.endSpace = options?.endSpace;
        this.enabled = options?.enabled !== undefined ? options.enabled : true;
        this.isHorizontal = options?.isHorizontal !== undefined ? options.isHorizontal : true;
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

        this.setInitiallyProvidedValue(params);
    }

    setInitiallyProvidedValue(params) {
    }

    _barHeight() {
        return this.__actionBarStyle?.height ?? 56;
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.enabled(btn?.enabled ?? true);
            if (btn?.width) { Button.width(btn.width); }
            if (btn?.backgroundColor) { Button.backgroundColor(btn.backgroundColor); }
            Button.onClick(() => {
                if (btn?.onClick) { btn.onClick(); }
            });
        }, Button);

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (btn?.baseIcon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(btn.baseIcon);
                        Image.width(this._btnIconSize(btn));
                        Image.height(this._btnIconSize(btn));
                        if (btn?.iconFillColor) { Image.fillColor(btn.iconFillColor); }
                    }, Image);
                });
            } else {
                this.ifElseBranchUpdateFunction(1, () => { });
            }
        }, If);
        If.pop();

        Button.pop();
    }

    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width("100%");
            Row.height(this._barHeight());
            Row.alignItems(VerticalAlign.Center);
            Row.padding({ left: this._startPad(), right: this._endPad() });
            if (this.__actionBarStyle?.backgroundColor) {
                Row.backgroundColor(this.__actionBarStyle.backgroundColor);
            }
        }, Row);

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

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();

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

        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();

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

        Row.pop();
    }

    aboutToAppear() { }
    aboutToDisappear() { }
    aboutToBeDeleted() { }
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
