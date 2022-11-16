import { LOG_IN, LOG_OUT, SIGN_UP, FOLLOW, UNFOLLOW } from '../actions/user';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  LogInError: false,
  logOutLoading: false,
  logOutDone: false,
  LogOutError: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  me: null,
  signUpdata: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'gigo96',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

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
    default:
      return state;
  }
};

export default reducer;
