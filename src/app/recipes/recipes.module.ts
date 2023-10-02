import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { StoreModule } from '@ngrx/store';
import {recipesFeature} from './store/recipes.reducer';
import {RecipesEffects} from './store/recipes.effects';
import { TranslateModule } from '@ngx-translate/core';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        TranslateModule,
        TableModule,
        DropdownModule,
        ListboxModule,
        ButtonModule,
        FormsModule,
        ConfirmPopupModule,
        StoreModule.forFeature(recipesFeature),
        EffectsModule.forFeature(RecipesEffects)
    ]
})
export class RecipesModule { }
