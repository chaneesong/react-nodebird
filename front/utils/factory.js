export const createAsyncActions = (suffixOfActions) => ({
  request: suffixOfActions + '_REQUEST',
  success: suffixOfActions + '_SUCCESS',
  failure: suffixOfActions + '_FAILURE',
  clear: suffixOfActions + '_CLEAR',
});
