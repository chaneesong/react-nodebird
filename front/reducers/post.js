import { generate } from 'shortid';

import { ADD_POST, ADD_COMMENT, REMOVE_POST } from '../actions/post';

export const initialState = {
  mainPosts: [
    {
      id: generate(),
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    email: 'test@test.com',
    nickname: 'gigo96',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'gigo96',
  },
});

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
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST.failure:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case REMOVE_POST.request:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST.success:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST.failure:
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
    case ADD_COMMENT.success: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
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
