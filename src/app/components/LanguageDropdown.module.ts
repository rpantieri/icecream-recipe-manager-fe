import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageDropdownComponent } from './LanguageDropdown.component';
@NgModule({
    declarations: [
        LanguageDropdownComponent
    ],
    imports: [
      DropdownModule,
      FormsModule,
      CommonModule,
      TranslateModule
    ],
    exports :[
        LanguageDropdownComponent
    ]
  })
  export class LanguageDropdownModule { }