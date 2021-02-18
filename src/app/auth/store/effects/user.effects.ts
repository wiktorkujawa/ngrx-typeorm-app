import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';



@Injectable()
export class UserEffects {

  register$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserActions.register),
      concatMap((action) =>
        this.authService.register(action.data)
        .pipe(
          map(success => UserActions.registerSuccess({ success })),
          catchError(error => of(UserActions.registerFailure({ error }))))
      )
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserActions.login),
      concatMap((action) =>
        this.authService.login(action.data)
        .pipe(
          map(data => UserActions.loginSuccess({ data })),
          catchError(error => of(UserActions.loginFailure({ error }))))
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(UserActions.logout),
      switchMap(() =>
        this.authService.logout()
        .pipe(
          map( success => UserActions.logoutSuccess({ success })),
          catchError(error => of(UserActions.loadUserFailure({ error }))))
      )
    );
  });

  
  loadUser$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.authService.getUser()
        .pipe(
          map(user=> UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions,
    private authService: AuthService) {}

}
