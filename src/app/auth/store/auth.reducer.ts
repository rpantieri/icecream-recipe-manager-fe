import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.action';

export const AUTH_KEY = 'auth';

export interface State {
  username: string;
  authError: string;
  session: string;
  registerError: string;
  verifyRegistration: boolean;
}

const initialState: State = {
  username: '',
  authError: '',
  session: '',
  registerError: '',
  verifyRegistration: false,
};

export const authFeature = createFeature({
  name: AUTH_KEY,
  reducer: createReducer(
    initialState,
    on(AuthAction.LOGIN_START, (state) => {
      console.log('login start');
      return { ...state };
    }),
    on(AuthAction.REGISTER_START, (state) => {
      console.log('register start');
      return { ...state };
    }),
    on(AuthAction.LOGIN_SUCCESS, (state, action) => {
      console.log('login success');
      return { ...state, session: action.session };
    }),
    on(AuthAction.REGISTER_SUCCESS, (state, action) => {
      console.log('register success');
      return { ...state, verifyRegistration: true };
    }),
    on(AuthAction.LOGIN_FAILED, (state, action) => {
      console.log('login failed');
      return { ...state, session: '', authError: action.message };
    }),
    on(AuthAction.REGISTER_FAILED, (state, action) => {
      console.log('registration failed');
      return { ...state, registerError: action.message };
    }),
    on(AuthAction.CLEAR_AUTH_ERROR, (state) => {
      console.log('clear auth error');
      return { ...state, authError: '' };
    }),
    on(AuthAction.CLEAR_REGISTER_ERROR, (state) => {
      console.log('clear auth error');
      return { ...state, registerError: '' };
    }),
    on(AuthAction.TO_CONFIRM_REGISTRATION, (state) => {
      console.log('to confirm registration');
      return { ...state, verifyRegistration: true };
    }),
    on(AuthAction.TO_REGISTRATION, (state) => {
      console.log('to registration');
      return { ...state, verifyRegistration: false };
    }),
    on(AuthAction.VERIFY_REGISTRATION_SUCCESS, (state) => {
      console.log('VERIFY_REGISTRATION_SUCCESS');
      return { ...state, verifyRegistration: false };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = authFeature;
