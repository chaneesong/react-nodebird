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
  LogInError: null,
  logOutLoading: false,
  logOutDone: false,
  LogOutError: null,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN.request:
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN.success:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN.failure:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT.request:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT.success:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT.failure:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP.request:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP.success:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false,
      };
    case SIGN_UP.failure:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    case CHANGE_NICKNAME.request:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME.success:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: false,
      };
    case CHANGE_NICKNAME.failure:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    case REMOVE_POST_OF_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    default:
      return state;
  }
};

export default reducer;
