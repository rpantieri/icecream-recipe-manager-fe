import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RecipeDTO } from '../shared/dto/recipeDTO.model';
import * as RecipeActions from './store/recipes.action';
import { recipesFeature } from './store/recipes.reducer';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styles: [''],
    standalone: true,
    imports: [ListboxModule, ReactiveFormsModule, FormsModule, ButtonModule, RouterOutlet]
})
export class RecipesComponent implements OnInit,OnDestroy {

  recipes: RecipeDTO[] = [];
  selectedRecipe: RecipeDTO | null = null;
  subscription: Subscription | undefined;
  subscriptionSelection: Subscription | undefined;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.store
    .pipe(select(recipesFeature.selectRecipes))
      .subscribe((ii: RecipeDTO[]) => {
        this.recipes = ii;
      });
    this.subscriptionSelection = this.store
    .pipe(select(recipesFeature.selectSelectedRecipe))
      .subscribe((i: RecipeDTO | null) => {
        this.selectedRecipe = i == null || isNaN(i.id) ? null : i;
      });
    this.store.dispatch(RecipeActions.RESET_SELECTED_RECIPE());
  }

  onChange() {
    console.log("detect list recipe change, new item:" + this.selectedRecipe);
    if (this.selectedRecipe == null) return;
    console.log("dispatching edit recipe action");
    this.store.dispatch(RecipeActions.EDIT_RECIPE({ recipe: this.selectedRecipe }));
    this.router.navigate(['recipes', 'edit']);
  }



  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionSelection) this.subscriptionSelection.unsubscribe();
  }

  newButton() {
    console.log("recipes, navigate to new");
    this.store.dispatch(RecipeActions.NEW_RECIPE({ recipe: new RecipeDTO() }));
    this.router.navigate(['recipes', 'new']);
  }
}
