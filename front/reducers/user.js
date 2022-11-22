import produce from 'immer';

import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  FOLLOW,
  UNFOLLOW,
  CHANGE_NICKNAME,
} from '../actions/user';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpdata: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'gigo96',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'test1' }, { nickname: 'test2' }],
  Followers: [{ nickname: 'test1' }],
});

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
      case LOG_IN.request:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN.success:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
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
      case CHANGE_NICKNAME.request:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME.success:
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
