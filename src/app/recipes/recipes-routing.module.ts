import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes-resolver.service';

import { RecipesComponent } from './recipes.component';
import { IngredientResolverService } from '../ingredients/ingredients-resolver.service';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
