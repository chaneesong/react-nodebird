import produce from 'immer';

import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  LOAD_USER,
  FOLLOW,
  UNFOLLOW,
  CHANGE_NICKNAME,
  LOAD_MY_INFO,
  LOAD_FOLLOWERS,
  LOAD_FOLLOWINGS,
  REMOVE_FOLLOWER,
} from '../actions/user';

export const initialState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  removeFollowLoading: false,
  removeFollowDone: false,
  removeFollowError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  userInfo: null,
  me: null,
};

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN.request,
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT.request,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO.request:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO.success:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO.failure:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case LOAD_USER.request:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER.success:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        break;
      case LOAD_USER.failure:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case LOAD_FOLLOWERS.request:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      case LOAD_FOLLOWERS.success:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = action.data;
        break;
      case LOAD_FOLLOWERS.failure:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      case LOAD_FOLLOWINGS.request:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;
      case LOAD_FOLLOWINGS.success:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;
      case LOAD_FOLLOWINGS.failure:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;
      case FOLLOW.request:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW.success:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.userId });
        break;
      case FOLLOW.failure:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW.request:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW.success: {
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data.userId
        );
        break;
      }
      case UNFOLLOW.failure:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case REMOVE_FOLLOWER.request:
        draft.removeFollowLoading = true;
        draft.removeFollowDone = false;
        draft.removeFollowError = null;
        break;
      case REMOVE_FOLLOWER.success: {
        draft.removeFollowLoading = false;
        draft.removeFollowDone = true;
        draft.me.Followers = draft.me.Followers.filter(
          (v) => v.id !== action.data.userId
        );
        break;
      }
      case REMOVE_FOLLOWER.failure:
        draft.removeFollowLoading = false;
        draft.removeFollowError = action.error;
        break;
      case LOG_IN.request:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN.success:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN.failure:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT.request:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT.success:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT.failure:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP.request:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP.success:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP.failure:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case SIGN_UP.clear:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case CHANGE_NICKNAME.request:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME.success:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME.failure:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;
