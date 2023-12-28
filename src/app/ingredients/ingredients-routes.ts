import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientResolverService } from './ingredients-resolver.service';

import { IngredientsComponent } from './ingredients.component';

export const routes: Routes = [
  {
    path: '',
    component: IngredientsComponent,
    resolve: [IngredientResolverService],
    canActivate: [authGuard],
    children: [
      { path: 'edit', component: IngredientEditComponent },
      { path: 'new', component: IngredientEditComponent }
    ]
  }
];
