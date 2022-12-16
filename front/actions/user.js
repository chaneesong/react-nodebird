import { createAsyncActions } from '../utils/factory';

export const LOAD_MY_INFO = createAsyncActions('LOAD_MY_INFO');
export const LOAD_USER = createAsyncActions('LOAD_USER');
export const LOG_IN = createAsyncActions('LOG_IN');
export const LOG_OUT = createAsyncActions('LOG_OUT');
export const SIGN_UP = createAsyncActions('SIGN_UP');
export const CHANGE_NICKNAME = createAsyncActions('CHANGE_NICKNAME');
export const FOLLOW = createAsyncActions('FOLLOW');
export const UNFOLLOW = createAsyncActions('UNFOLLOW');
export const LOAD_FOLLOWERS = createAsyncActions('LOAD_FOLLOWERS');
export const LOAD_FOLLOWINGS = createAsyncActions('LOAD_FOLLOWINGS');
export const REMOVE_FOLLOWER = createAsyncActions('REMOVE_FOLLOWER');
