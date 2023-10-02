import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientResolverService } from './ingredients-resolver.service';

import { IngredientsComponent } from './ingredients.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsComponent,
    resolve: [IngredientResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: 'edit', component: IngredientEditComponent },
      { path: 'new', component: IngredientEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule { }
