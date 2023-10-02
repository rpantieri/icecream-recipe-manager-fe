import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as AuthActions from './store/auth.action';
import { authFeature } from './store/auth.reducer';

@Component({
  selector: 'app-auth.component',
  template: `
    <div
      class="flex flex-row w-full h-full  bg-center bg-blue-100 align-items-center justify-content-center"
      style="background-image: url('./assets/images/icecream-background.png');"
    >
      <div class="bg-blue-400 m-3 p-4 border-round-2xl">
        <div class="field">
          <label for="username" class="block">{{
            'AUTH.USERNAME' | translate
          }}</label>
          <input
            id="username"
            type="text"
            pInputText
            #USERNAME
            [placeholder]="'AUTH.USERNAME' | translate"
          />
        </div>
        <div class="field">
          <label for="password" class="block">{{
            'AUTH.PASSWORD' | translate
          }}</label>
          <input
            id="password"
            type="password"
            pInputText
            #PASSWORD
            [placeholder]="'AUTH.PASSWORD' | translate"
          />
        </div>
        <div class="field">
          <p-button (click)="login(USERNAME.value, PASSWORD.value)">{{
            'AUTH.LOGIN' | translate
          }}</p-button>
          <button
            pButton
            type="button"
            [label]="'AUTH.REGISTER' | translate"
            class="p-button-link"
            (click)="register()"
          ></button>
          <button
            pButton
            type="button"
            [label]="'AUTH.VERIFY_REGISTRATION' | translate"
            class="p-button-link"
            (click)="verifyRegistration()"
          ></button>
        </div>
        <div><app-language-dropdown></app-language-dropdown></div>
      </div>
      <p-toast position="center" severity="error" key="error"></p-toast>
    </div>
  `,
  styles: [''],
  providers: [MessageService],
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  subscriptionError: Subscription | undefined;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select(authFeature.selectSession))
      .subscribe((session) => {
        if (session != null && session.length > 0) {
          console.log('session changed' + session);
          this.router.navigate(['recipes']);
        }
      });
    this.subscriptionError = this.store
      .pipe(select(authFeature.selectRegisterError))
      .subscribe((error) => {
        if (error != null && error.length > 0) {
          this.messageService.clear('error');
          this.messageService.add({
            key: 'error',
            sticky: false,
            severity: 'error',
            summary: 'Error in login',
            detail: error,
          });
          this.store.dispatch(AuthActions.CLEAR_AUTH_ERROR());
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionError) this.subscriptionError.unsubscribe();
  }

  login(username: string, password: string): void {
    this.store.dispatch(
      AuthActions.LOGIN_START({ username: username, password: password })
    );
  }

  register(): void {
    this.store.dispatch(AuthActions.TO_REGISTRATION());
    this.router.navigate(['auth', 'register']);
  }

  verifyRegistration(): void {
    this.store.dispatch(AuthActions.TO_CONFIRM_REGISTRATION());
    this.router.navigate(['auth', 'register']);
  }
}
