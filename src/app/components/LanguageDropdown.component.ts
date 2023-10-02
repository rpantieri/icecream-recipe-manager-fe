import { Component, OnInit } from '@angular/core';
import { LangService } from '../shared/lang.service';

@Component({
  selector: 'app-language-dropdown',
  template: `
    <p-dropdown
      [options]="countries"
      [(ngModel)]="selectedCountry"
      optionLabel="name"
      (onChange)="onChange()"
    >
      <ng-template pTemplate="selectedItem">
        <div class="flex flex-row" *ngIf="selectedCountry">
          <div class="flex pr-3">
            <img
              [src]="
                './assets/images/flags/' +
                selectedCountry.code.toLowerCase() +
                '.svg'
              "
              style="width: 17px;"
            />
          </div>
          <div class="flex">{{ selectedCountry.code }}</div>
        </div>
      </ng-template>
      <ng-template let-country pTemplate="item">
        <div class="flex flex-row">
          <div class="flex pr-3">
            <img
              [src]="
                './assets/images/flags/' + country.code.toLowerCase() + '.svg'
              "
              style="width: 17px;"
            />
          </div>
          <div class="flex">{{ country.code }}</div>
        </div>
      </ng-template>
    </p-dropdown>
  `,
  styles: [''],
})
export class LanguageDropdownComponent implements OnInit {
  selectedCountry: Country;
  countries: Country[];

  constructor(private langService: LangService) {
    this.selectedCountry = { name: '', code: '', lang: 'en' };
    this.countries = [
      { name: 'Italy', code: 'IT', lang: 'it' },
      { name: 'United Kingdom', code: 'GB', lang: 'en' },
    ];
  }
  ngOnInit(): void {}

  onChange(): void {
    this.langService.changeLanguage(this.selectedCountry.lang);
  }
}
interface Country {
  name: string;
  code: string;
  lang: string;
}
