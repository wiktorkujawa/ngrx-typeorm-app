import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from '../reducers/post.reducer';

export const selectPostState = createFeatureSelector<fromPost.PostState>(
  fromPost.postFeatureKey
);

export const selectPosts = createSelector( selectPostState, fromPost.selectAll);