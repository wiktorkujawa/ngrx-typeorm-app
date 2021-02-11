import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
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



  constructor(private actions$: Actions,
    private authService: AuthService) {}

}
