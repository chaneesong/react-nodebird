import { ADD_POST, ADD_COMMENT } from '../actions/post';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'song',
      },
      content: 'first post #hashtag #express',
      Images: [
        {
          src: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png',
        },
        {
          src: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
        },
        {
          src: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1667528160/noticon/jkteb0zahggo46okznlh.png',
        },
      ],
      Comments: [
        {
          User: { nickname: 'kim' },
          content: 'first comment',
        },
        {
          User: { nickname: 'test' },
          content: 'second comment',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 'gigo96',
    nickname: 'gigo96',
  },
  Images: [],
  Comments: [],
};

export const addPost = (data) => ({
  type: ADD_POST.request,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT.request,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST.request:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST.success:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST.failure:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT.request:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT.success:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT.failure:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
