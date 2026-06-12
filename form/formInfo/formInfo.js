/*
 * Pure-ABC stub for @ohos.app.form.formInfo / @kit.FormKit's formInfo
 * Provides minimal exports so HAPs using FormKit can bootstrap.
 */

const FormType = {
  JS: 1,
  ETS: 2
};

const FormState = {
  UNKNOWN: 0,
  READY: 1
};

const FormParam = {
  IDENTITY_KEY: 'ohos.extra.param.key.form_identity',
  NAME_KEY: 'ohos.extra.param.key.form_name',
  DIMENSION_KEY: 'ohos.extra.param.key.form_dimension',
  TEMPORARY_KEY: 'ohos.extra.param.key.form_temporary',
  MODULE_NAME_KEY: 'ohos.extra.param.key.module_name',
  BUNDLE_NAME_KEY: 'ohos.extra.param.key.bundle_name'
};

const FormSgAtomState = {
  UNKNOWN: 0,
  SUCCESS: 1,
  FAILED: 2
};

const FormVisibilityType = {
  UNKNOWN_FORM_VISIBILITY: 0,
  VISIBLE: 1,
  INVISIBLE: 2
};

const FormLocation = {
  OTHER_FORM_LOCATION: 0,
  DESKTOP_FORM_LOCATION: 1
};

export default {
  FormType,
  FormState,
  FormParam,
  FormSgAtomState,
  FormVisibilityType,
  FormLocation
};
