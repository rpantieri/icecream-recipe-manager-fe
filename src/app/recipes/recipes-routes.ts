import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes-resolver.service';

import { RecipesComponent } from './recipes.component';
import { IngredientResolverService } from '../ingredients/ingredients-resolver.service';

export const routes: Routes = [
  {
    path: '', component: RecipesComponent,
    resolve: [RecipeResolverService,IngredientResolverService],
    canActivate: [authGuard],
    children: [
      { path: 'edit', component: RecipeEditComponent },
      { path: 'new', component: RecipeEditComponent }
    ]
  }
];

