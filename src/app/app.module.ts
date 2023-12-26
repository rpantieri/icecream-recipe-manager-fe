import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ErrorInterceptorService } from './error-interceptor.service';
import { MessageService } from 'primeng/api';
import { AuthEffects } from './auth/store/auth.effects';
import { authFeature } from './auth/store/auth.reducer';
import { RouterModule } from '@angular/router';
import { ingredientFeature } from './ingredients/store/ingredients.reducer';
import { IngredientsEffects } from './ingredients/store/ingredients.effects';
import { recipesFeature } from './recipes/store/recipes.reducer';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { APP_BASE_HREF } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot(AuthEffects, IngredientsEffects, RecipesEffects),
    StoreModule.forRoot({}),
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(ingredientFeature),
    StoreModule.forFeature(recipesFeature),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true, deps:[MessageService, Store] },
    { provide: APP_BASE_HREF, useValue: './'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
