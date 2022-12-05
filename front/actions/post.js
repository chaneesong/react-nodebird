import { createAsyncActions } from '../utils/factory';

export const ADD_POST = createAsyncActions('ADD_POST');
export const ADD_COMMENT = createAsyncActions('ADD_COMMENT');
export const REMOVE_POST = createAsyncActions('REMOVE_POST');
export const LOAD_POSTS = createAsyncActions('LOAD_POST');
export const LIKE_POST = createAsyncActions('LIKE_POST');
export const UNLIKE_POST = createAsyncActions('UNLIKE_POST');
