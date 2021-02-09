import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
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
      concatMap((action) =>
        this.postService.createPost(action.post)
        .pipe(
          map(post => PostActions.addPostSuccess({ post })),
          catchError(error => of(PostActions.loadPostsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions,
    private postService: PostService) {}

}
