import { createAction, props } from '@ngrx/store';

// Load user
export const loadUser = createAction(
  'LOAD_USER'
);

export const loadUserSuccess = createAction(
  'LOAD_USER_SUCCESS',
  props<{ user: any }>()
);

export const loadUserFailure = createAction(
  'LOAD_USER_FAILURE',
  props<{ error: any }>()
);

// Register
export const register = createAction(
  'REGISTER',
  props<{ data: any}>()
);

export const registerSuccess = createAction(
  'REGISTER_SUCCESS',
  props<{ success: any }>()
);

export const registerFailure = createAction(
  'REGISTER_FAILURE',
  props<{ error: any }>()
);


// Login
export const login = createAction(
  'LOGIN',
  props<{ data: any}>()
);

export const loginSuccess = createAction(
  'LOGIN_SUCCESS',
  props<{ data: any }>()
);

export const loginFailure = createAction(
  'LOGIN_FAILURE',
  props<{ error: any }>()
);

// Logout
export const logout = createAction(
  'LOGOUT'
);

export const logoutSuccess = createAction(
  'LOGOUT_SUCCESS',
  props<{ data: any }>()
);

export const logoutFailure = createAction(
  'LOGOUT_FAILURE',
  props<{ error: any }>()
);


