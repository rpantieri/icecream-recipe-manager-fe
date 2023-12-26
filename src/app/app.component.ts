import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { authFeature } from './auth/store/auth.reducer';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import * as AuthAction from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IceCreamRecipesManager';
  showHeader: boolean = false;
  subscription: Subscription | undefined;

  constructor(private store: Store, private langService: LangService) {}

  ngOnInit(): void {
    
    this.langService.initTranslationServices();
    this.langService.initFromBrowser();
    this.subscription = this.store
      .pipe(select(authFeature.selectAccess_token))
      .subscribe((s: String) => {
        this.showHeader = s != null && s.trim().length > 0;
      });
  }
}
