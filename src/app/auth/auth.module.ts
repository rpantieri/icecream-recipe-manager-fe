import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { LanguageDropdownModule } from '../components/LanguageDropdown.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register.component';
import { AuthEffects } from './store/auth.effects';
import { authFeature } from './store/auth.reducer';

@NgModule({
  declarations: [AuthComponent, RegisterComponent],
  imports: [
    LanguageDropdownModule,
    DividerModule,
    PasswordModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    TranslateModule,
    ToastModule,
    StoreModule,
    EffectsModule,
    MessagesModule,
  ],
})
export class AuthModule {}
