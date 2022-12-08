export const createAsyncActions = (suffixOfActions) => ({
  request: suffixOfActions + '_REQUEST',
  success: suffixOfActions + '_SUCCESS',
  failure: suffixOfActions + '_FAILURE',
  clear: suffixOfActions + '_CLEAR',
});
export const BACKEND = 'http://localhost:3065';
