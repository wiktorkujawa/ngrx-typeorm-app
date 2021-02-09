import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as PostActions from '../actions/post.actions';
import { Post } from '../model/post';

export const postFeatureKey = 'post';

export interface PostState extends EntityState<Post> {
  error: any
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id
})

export const initialState: PostState = adapter.getInitialState({
  error: undefined
});


export const reducer = createReducer(
  initialState,
  on(PostActions.loadPostsSuccess, (state, action) => adapter.setAll(action.posts, state)),
  on(PostActions.loadPostsFailure, (state, {error}) => { 
    return { ...state, 
      error };
    }),
  on(PostActions.addPostSuccess, (state, action) => adapter.addOne(action.post, state)),
  on(PostActions.addPostFailure, (state, {error}) => { 
    return { ...state, 
      error };
    }),

);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();