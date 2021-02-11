import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<User>  {
  message: any
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user:any) => user.message
})

export const initialState: UserState = adapter.getInitialState({
  message: undefined
});


export const reducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, action) => adapter.setOne(action.data, state)),
  on(UserActions.loadUserFailure, (state, {error}) => {
    return { ...state,
      error
    }
  }),

  on(UserActions.registerSuccess, (state, {success}) => {
    return { ...state,
    message: [success]
  }
  }),
  on(UserActions.registerFailure, (state, {error}) => {
    return { ...state,
      message: error.error
    }
  }),

  on(UserActions.loginSuccess, (state, action) => adapter.setOne(action.data, state)),
  on(UserActions.loginFailure, (state, {error}) => {
    return { ...state,
      error
    }
  }),

  on(UserActions.logoutSuccess, (state, action) => adapter.removeOne(action.data, state)),
  on(UserActions.logoutFailure, (state, {error}) => {
    return { ...state,
      error
    }
  }),

);

export const selectFeature = (state: UserState) => state.message;
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();



