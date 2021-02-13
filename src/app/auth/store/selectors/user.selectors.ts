import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectMessage = createSelector( selectUserState, fromUser.selectMessage);
export const selectUser = createSelector( selectUserState, fromUser.selectAll);
