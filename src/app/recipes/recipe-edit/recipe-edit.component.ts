import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientDTO } from 'src/app/shared/dto/ingredientDTO.model';
import { RecipeDTO } from 'src/app/shared/dto/recipeDTO.model';
import { RecipeIngredientDTO } from 'src/app/shared/dto/recipeIngredientDTO.model';
import * as RecipesActions from '../store/recipes.action';

interface Item {
  name: string | undefined;
}

interface RowItem {
  amount: number;
  ingredient: IngredientDTO;
  ingredients: IngredientDTO[];
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [
  ]
})
export class RecipeEditComponent implements OnInit {

  subscription?: Subscription;
  recipeForm: UntypedFormGroup;

  storeSelectedRecipe: RecipeDTO | null = null;
  ingredients: RowItem[] = [];

  constructor(private store: Store, private confirmationService: ConfirmationService) {
    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required)
    });

   /* this.subscription = this.store
      .select('recipes')
      .pipe(map(duplicatesState => duplicatesState.selectedRecipe))
      .subscribe(i => {
        this.storeSelectedRecipe = i;
        let n: Item = this.storeSelectedRecipe != null ? { name: this.storeSelectedRecipe?.name } : { name: '' };
        this.ingredients = (this.storeSelectedRecipe && this.storeSelectedRecipe.ingredients) ?
          this.storeSelectedRecipe.ingredients.map<RowItem>(i => {
            let idto: IngredientDTO | undefined | null = ingredientService.getIngredient(i.ingredientId);
            if (!idto) idto = new IngredientDTO();
            let ri: RowItem = { amount: i.amount, ingredient: idto, ingredients: ingredientService.getIngredients() };
            return ri;
          }) : [];
        this.recipeForm.get('name')?.setValue(n.name);
      });*/
  }

  ngOnInit(): void {
    this.initForm();
  }

  getLabelClasses(): String {
    return "p-col-12 p-mb-2 p-md-2 p-mb-md-0";
  }
  getInputClasses(): String {
    return "p-col-12 p-md-10";
  }

  checkNotValidValue(name: string): boolean {
    let c: AbstractControl | null = this.recipeForm.get(name);
    return c != null && c.touched && !c.valid;
  }

  private initForm(): void {

  }

  addRow(): void {
    const ii: RowItem = { amount: 1, ingredient: new IngredientDTO(), ingredients: [] };
    console.log(ii);
    this.ingredients = [...this.ingredients, { amount: 1, ingredient: new IngredientDTO(), ingredients: [] }];
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

  onSubmit(): void {
    if (this.storeSelectedRecipe == null) {
      alert("no actual selected recipe");
      return;
    }
    let item: Item = this.recipeForm.value;
    let i: RecipeDTO = new RecipeDTO();
    Object.assign(i, this.storeSelectedRecipe);
    Object.assign(i, item);
    i.ingredients = this.ingredients.map(x => {
      let i: RecipeIngredientDTO = new RecipeIngredientDTO();
      i.amount = x.amount;
      i.ingredientId = x.ingredient.id;
      return i;
    });
    if (isNaN(this.storeSelectedRecipe.id)) {
      console.log("dispatching saving new recipe", i);
      this.store.dispatch(RecipesActions.SAVE_NEW_RECIPE({ recipe: i }));
    } else {
      console.log("dispatching updating  recipe", i);
      this.store.dispatch(RecipesActions.UPDATE_RECIPE({ recipe: i }));
    }
  }


}
