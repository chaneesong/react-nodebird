import { generate } from 'shortid';
import produce from 'immer';

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
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST.request:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST.success:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST.failure:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST.request:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST.success:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST.failure:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT.request:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT.success: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT.failure:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
      default:
        break;
    }
  });
};

export default reducer;
