import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MessageService, SharedModule } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as AuthActions from './store/auth.action';
import { authFeature } from './store/auth.reducer';
import { Nullable } from 'primeng/ts-helpers';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { LanguageDropdownComponent } from '../components/LanguageDropdown.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
@Component({
    selector: 'app-auth.component',
    template: `
    <div
      class="flex flex-row w-full h-full  bg-center bg-blue-100 align-items-center justify-content-center"
      style="background-image: url('./assets/images/icecream-background.png');"
    >
      <div
        class="bg-blue-400 m-3 p-4 border-round-2xl"
        *ngIf="!verifyRefistration"
      >
        <div class="field">
          <label for="username" class="p-col-fixed" style="width:100px">{{
            'AUTH.USERNAME' | translate
          }}</label>
          <input id="username" type="text" pInputText #USERNAME />
        </div>
        <div class="field">
          <label for="email" class="p-col-fixed" style="width:100px">{{
            'AUTH.EMAIL' | translate
          }}</label>
          <input id="email" type="text" pInputText #EMAIL />
        </div>
        <div class="field">
          <label for="password" class="p-col-fixed" style="width:100px">{{
            'AUTH.PASSWORD' | translate
          }}</label>
          <p-password id="password" type="password" [toggleMask]="true" #PASSWORD >
          <ng-template pTemplate="header">
        <h6>{{'AUTH.PSW.PICK_A_PSW' | translate}}</h6>
    </ng-template>
    <ng-template pTemplate="footer">
        <p-divider></p-divider>
        <p class="mt-2">{{'AUTH.PSW.SUGGESTIONS' | translate}}</p>
        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>{{'AUTH.PSW.ATLEAST_1LOWER' | translate}}</li>
            <li>{{'AUTH.PSW.ATLEAST_1UPPER' | translate}}</li>
            <li>{{'AUTH.PSW.ATLEAST_1NUMERIC' | translate}}</li>
            <li>{{'AUTH.PSW.MIN_8CHARS' | translate}}</li>
        </ul>
    </ng-template>
        </p-password>
        </div>
        <div class="field">
          <label for="repeat_password" class="p-col-fixed" style="width:100px">{{
            'AUTH.PASSWORD_REPEAT' | translate
          }}</label>
          <p-password id="repeat_password" type="password" [toggleMask]="true" #PASSWORD />
        </div>
        <div  class="field">
          <p-button class="p-3" (click)="register(USERNAME.value, PASSWORD.value, EMAIL.value)">{{
            'AUTH.REGISTER' | translate
          }}</p-button>
          <app-language-dropdown></app-language-dropdown>
        </div>
        
      </div>
      <div
        class="bg-blue-400 m-3 p-4 border-round-2xl"
        *ngIf="verifyRefistration"
      >
        <div class="field">
          <label
            for="registrationgCode"
            class="p-col-fixed"
            style="width:100px"
            >{{ 'AUTH.REGISTRATION_CODE' | translate }}</label
          >
          <input
            id="registrationgCode"
            type="text"
            pInputText
            #REGISTRATIONCODE
          />
        </div>
        <div class="field">
          <label for="password" class="p-col-fixed" style="width:100px">{{
            'AUTH.PASSWORD' | translate
          }}</label>
          <input id="password" type="password" pInputText #PASSWORD />
        </div>
        <div class="field m-3">
          <p-button (click)="verifyRegistration(REGISTRATIONCODE.value)">{{
            'AUTH.VERIFY_REGISTRATION' | translate
          }}</p-button>
          <app-language-dropdown></app-language-dropdown>
        </div>
        
      </div>
      
    </div>

    <p-toast position="center"></p-toast>
  `,
    styles: [''],
    providers: [MessageService],
    standalone: true,
    imports: [
        NgIf,
        InputTextModule,
        PasswordModule,
        SharedModule,
        DividerModule,
        ButtonModule,
        LanguageDropdownComponent,
        ToastModule,
        TranslateModule,
    ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  subscription: Subscription | undefined;
  subscriptionRegError: Subscription | undefined;
  verifyRefistration: boolean = false;
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select(authFeature.selectVerifyRegistration))
      .subscribe((v) => {
        this.verifyRefistration = v;
      });

    this.subscriptionRegError = this.store
      .pipe(select(authFeature.selectRegisterError))
      .subscribe((v) => {
        console.log('subriscion registration error');
        this.messageService.add({ severity: 'error', detail: v });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  register(username: string, password: Nullable<string>, email: string): void {
    this.store.dispatch(
      AuthActions.REGISTER_START({
        username: username,
        password: password ?? "",
        email: email,
      })
    );
  }

  toVerifiRegistration(): void {
    this.store.dispatch(AuthActions.TO_CONFIRM_REGISTRATION());
  }

  verifyRegistration(code: string): void {
    this.store.dispatch(
      AuthActions.VERIFY_REGISTRATION({ registration_code: code })
    );
  }
}
