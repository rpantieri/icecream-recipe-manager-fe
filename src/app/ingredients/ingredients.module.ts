import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IngredientsComponent } from './ingredients.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { StoreModule } from '@ngrx/store';
import {ingredientFeature} from './store/ingredients.reducer';
import {IngredientsEffects} from './store/ingredients.effects';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { TranslateModule } from '@ngx-translate/core';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ListboxModule } from 'primeng/listbox';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
    declarations: [
        IngredientsComponent,
        IngredientEditComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        IngredientsRoutingModule,
        TranslateModule,
        TableModule,
        DropdownModule,
        ButtonModule,
        ConfirmPopupModule,
        FormsModule,
        ListboxModule,
        StoreModule.forFeature(ingredientFeature),
        EffectsModule.forFeature(IngredientsEffects)
    ]
})
export class IngredientsModule { }
