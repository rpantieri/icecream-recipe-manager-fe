import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { Subscription } from 'rxjs';

import * as RecipesActions from '../store/recipes.action';

import { TranslateModule } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IngredientDTO } from '../../shared/dto/ingredientDTO.model';
import { ingredientFeature } from '../../ingredients/store/ingredients.reducer';
import { copyObject } from '../../shared/utils';
import { recipesFeature } from '../store/recipes.reducer';
import { RecipeDTO } from '../../shared/dto/recipeDTO.model';
import { RecipeIngredientDTO } from '../../shared/dto/recipeIngredientDTO.model';


interface RowItem {
  amount: number;
  ingredient: IngredientDTO;
  ingredientId: number;
}

interface Total {
  amount: number;
  sugars: number;
  fats: number;
  sml: number;
  otherSolids: number;
  totSolids: number;
  water: number;
  pac: number;
  pod: number;
  cost: number;
}

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styles: [],
    providers: [ConfirmationService],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, TableModule, SharedModule, ButtonModule, DropdownModule, ConfirmPopupModule, DecimalPipe, TranslateModule]
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  subscription?: Subscription;

  actualRecipeName: string = " ";
  actualRecipeId: number = NaN;
  actualRecipeValid: boolean = false;

  
  ingredients: RowItem[] = [];
  totArray: Total[] = [];
  ingredientList: IngredientDTO[] = [];
  ingredientMap: Map<number,IngredientDTO> = new Map();
  ingredientListSub:Subscription | undefined;

  constructor(private store: Store, private confirmationService: ConfirmationService) {


  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.ingredientListSub) this.ingredientListSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredientListSub = this.store
    .pipe(select(ingredientFeature.selectIngredients))
      .subscribe((ii: IngredientDTO[]) => {
        console.log('recipe edit component: setting ingredient dto list');
        let ia: IngredientDTO[] = [];
        this.ingredientMap.clear();
        let newI:IngredientDTO;
        ii.forEach(element => {
          newI = new IngredientDTO();
          copyObject(element, newI);
          ia.push(newI);
          this.ingredientMap.set(newI.id, newI);
        });
        this.ingredientList = ia;
      });
    this.subscription = this.store
      .pipe(select(recipesFeature.selectSelectedRecipe))
        .subscribe((r : RecipeDTO | null ) => {
          console.log('recipe edit component: setting ingredient dto list');
          this.actualRecipeName = r?.name ? r?.name : "";
          this.actualRecipeId = r?.id ? r.id : NaN;
          let ii:RowItem[] = [];
          r?.ingredients.forEach(x => {
            ii.push({ amount: x.amount, ingredient: this.ingredientMap.has(x.ingredientId) ? this.ingredientMap.get(x.ingredientId)! : new IngredientDTO(), ingredientId: x.ingredientId });
          });
          this.ingredients = ii;
          this.checkTot();
        });
  }


  addRow(): void {
    const ii: RowItem = { amount: 0, ingredient: new IngredientDTO(), ingredientId: NaN };
    console.log(ii);
    this.ingredients = [...this.ingredients, ii];
  }

  checkTot(): void{
    let t:Total = {amount:0, sugars:0, fats: 0, sml: 0, otherSolids : 0, totSolids : 0, water : 0,pac: 0, pod : 0, cost:0}
    this.ingredients.forEach(x =>{
      t.amount = t.amount +x.amount
      t.sugars = t.sugars + x.amount * x.ingredient.sugars / 100;
      t.fats = t.fats + x.amount * x.ingredient.fats / 100;
      t.sml = t.sml + x.amount * x.ingredient.sml / 100;
      t.otherSolids = t.otherSolids + x.amount * x.ingredient.otherSolids / 100;
      t.totSolids = t.totSolids + x.amount * x.ingredient.totSolids / 100;
      t.water = t.water + x.amount * x.ingredient.water / 100;
      t.pac = t.pac + x.amount * x.ingredient.pac / 100;
      t.pod = t.pod + x.amount * x.ingredient.pod / 100;
      t.cost = t.cost + x.amount * x.ingredient.cost  / 100;
    })
    this.totArray = [t];
  }

  save(event: Event) {
    console.log("Recipe edit save button pressed");
    this.confirmationService.confirm({
      target: event.target != null ? event.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
      },
      reject: () => {
        //reject action
      }
    });
  }

  onChange(): void{
    this.actualRecipeValid = this.actualRecipeName != null && this.actualRecipeName.trim().length > 0 && this.ingredients.length>0;
    this.ingredients.forEach( x =>{
      this.actualRecipeValid = this.actualRecipeValid && x.ingredient !=null && x.amount > 0;
    });
    
  }

  onSubmit(): void {
    if (!this.actualRecipeValid) {
      alert("no actual selected recipe");
      return;
    }
    let i: RecipeDTO = new RecipeDTO();
    i.name = this.actualRecipeName;
    i.id = this.actualRecipeId;
    i.ingredients = this.ingredients.map(x => {
      let i: RecipeIngredientDTO = new RecipeIngredientDTO();
      i.amount = x.amount;
      i.ingredientId = x.ingredient.id;
      return i;
    });
    if (isNaN(this.actualRecipeId)) {
      console.log("dispatching saving new recipe", i);
      this.store.dispatch(RecipesActions.SAVE_NEW_RECIPE({ recipe: i }));
    } else {
      console.log("dispatching updating  recipe", i);
      this.store.dispatch(RecipesActions.UPDATE_RECIPE({ recipe: i }));
    }
  }


}
