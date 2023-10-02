import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LoginDTO } from 'src/app/shared/dto/logintDTO.model';
import { ResponseMessage } from 'src/app/shared/dto/response-message.model';
import { environment } from 'src/environments/environment';
import * as AuthAction from './auth.action';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  loginStart = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LOGIN_START),
      exhaustMap((action) => {
        console.log('invoking login service');
        return this.http
          .post<ResponseMessage<LoginDTO>>(environment.baseUrl + 'auth/login', {
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((dto) => {
              if (dto.hasError) {
                console.log('error in login service call:', dto);
                return AuthAction.LOGIN_FAILED({ message: dto.errorMessage });
              }
              console.log('retriving login result');
              return AuthAction.LOGIN_SUCCESS({
                username: '',
                session: dto.result ? dto.result.sessionId : '',
              });
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log('catching error in login service', errirRes);
              return of(
                AuthAction.LOGIN_FAILED({
                  message: errirRes.error.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  registerStart = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.REGISTER_START),
      exhaustMap((action) => {
        console.log('invoking register service');
        return this.http
          .post<ResponseMessage<LoginDTO>>(
            environment.baseUrl + 'auth/registerUser',
            {
              username: action.username,
              password: action.password,
              email: action.email,
            }
          )
          .pipe(
            map((dto) => {
              if (dto.hasError) {
                console.log('error in register service call:', dto);
                return AuthAction.REGISTER_FAILED({
                  message: dto.errorMessage,
                });
              }
              console.log('retriving register result');
              return AuthAction.REGISTER_SUCCESS();
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log('catching error in register service', errirRes);
              return of(
                AuthAction.REGISTER_FAILED({
                  message: errirRes.error.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  verifyRegistration = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.VERIFY_REGISTRATION),
      exhaustMap((action) => {
        console.log('invoking verify register service');
        return this.http
          .post<ResponseMessage<LoginDTO>>(
            environment.baseUrl + 'auth/verifyRegistration',
            action.registration_code
          )
          .pipe(
            map((dto) => {
              if (dto.hasError) {
                console.log('error in verify registration service call:', dto);
                return AuthAction.REGISTER_FAILED({
                  message: dto.errorMessage,
                });
              }
              console.log('retriving verify register result');
              return AuthAction.VERIFY_REGISTRATION_SUCCESS();
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log(
                'error in verify registration service call:',
                errirRes
              );
              return of(
                AuthAction.REGISTER_FAILED({
                  message: errirRes.error.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  verifySuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.VERIFY_REGISTRATION_SUCCESS),
        tap(() => this.router.navigate(['auth']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}
}
