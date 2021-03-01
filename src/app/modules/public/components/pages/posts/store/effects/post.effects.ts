import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PostActions from '../actions/post.actions';
import { PostService } from '../services/post.service';



@Injectable()
export class PostEffects {

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PostActions.loadPosts),
      concatMap(() =>
        this.postService.getPosts()
        .pipe(
          map(posts => PostActions.loadPostsSuccess({ posts })),
          catchError(error => of(PostActions.loadPostsFailure({ error }))))
      )
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PostActions.addPost),
      concatMap((action) => this.postService.createPost(action.post)
        .pipe(
          map(post => PostActions.addPostSuccess({ post })),
          catchError(error => of(PostActions.addPostFailure({ error }))))
      )
    );
  });

  updatePost$ = createEffect(():any => {
    return this.actions$.pipe( 

      ofType(PostActions.updatePost),
      concatMap((action) => this.postService.updatePost(action.id, action.changes)
        .pipe(
          map((post:any) => {
            const {id, ...newPost} = post; 
            return PostActions.updatePostSuccess({ id:post.id, post: newPost }); 
          }),
          catchError(error => of(PostActions.updatePostFailure({ error }))))
      )
    );
  });

  removePost$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PostActions.deletePost),
      concatMap((action) =>
        this.postService.removePost(action.id)
        .pipe(
          map(() => PostActions.deletePostSuccess({ id: action.id })),
          catchError(error => of(PostActions.deletePostFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions,
    private postService: PostService) {}

}
