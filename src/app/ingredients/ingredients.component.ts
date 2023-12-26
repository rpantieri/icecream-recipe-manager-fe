import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngredientDTO } from '../shared/dto/ingredientDTO.model';
import * as IngredientActions from './store/ingredients.action';
import { ingredientFeature } from './store/ingredients.reducer';
import { NgModel } from '@angular/forms';
import { Listbox } from 'primeng/listbox';
@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styles: ['.customListStyleClass {height : 100%;}']
})
export class IngredientsComponent implements OnInit, OnDestroy {

  ingredients: IngredientDTO[] = [];
  selectedIngredient: IngredientDTO | null = null;
  subscription: Subscription | undefined;
  subscriptionSelection: Subscription | undefined;


  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.store
    .pipe(select(ingredientFeature.selectIngredients))
      .subscribe((ii: IngredientDTO[]) => {
        console.log('ingredients component: setting ingredient list');
        this.ingredients = ii;
      });
    this.subscriptionSelection = this.store
    .pipe(select(ingredientFeature.selectSelectedIngredient))
      .subscribe((i: IngredientDTO | null) => {
        console.log('ingredients component: setting new selected ingredient',i);
        this.selectedIngredient = i == null || isNaN(i.id) ? null : i;
      });
    this.store.dispatch(IngredientActions.RESET_SELECTED_INGREDIENT());

    
  }

  

  onChange() {
    console.log("detect list ingredient change, new item:" + this.selectedIngredient);
    if (this.selectedIngredient == null) return;
    console.log("dispatching edit ingredient action");
    this.store.dispatch(IngredientActions.EDIT_INGREDIENT({ ingredient: this.selectedIngredient }));
    this.router.navigate(['ingredients', 'edit']);
  }



  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionSelection) this.subscriptionSelection.unsubscribe();
  }

  newButton() {
    console.log("ingredients, navigate to new");
    this.store.dispatch(IngredientActions.NEW_INGREDIENT({ ingredient: new IngredientDTO() }));
    this.router.navigate(['ingredients', 'new']);
  }
}
