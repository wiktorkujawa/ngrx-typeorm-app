import { createAction, props } from '@ngrx/store';
import { Post, addPostModel } from '../model/post';


// load posts
export const loadPosts = createAction(
  'LOAD_POSTS'
);

export const loadPostsSuccess = createAction(
  'LOAD_POSTS_SUCCESS',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  'LOAD_POSTS_FAILURE',
  props<{ error: any }>()
);

// add posts
export const addPost = createAction(
  'ADD_POST',
  props<{ post: any }>()
);

export const addPostSuccess = createAction(
  'ADD_POST_SUCCESS',
  props<{ post: Post }>()
);

export const addPostFailure = createAction(
  'ADD_POST_FAILURE',
  props<{ error: any }>()
);

// delete posts
export const deletePost = createAction(
  'DELETE_POST',
  props<{ id: string }>()
);

export const deletePostSuccess = createAction(
  'DELETE_POST_SUCCESS',
  props<{ id: string }>()
);

export const deletePostFailure = createAction(
  'DELETE_POST_FAILURE',
  props<{ error: any }>()
);