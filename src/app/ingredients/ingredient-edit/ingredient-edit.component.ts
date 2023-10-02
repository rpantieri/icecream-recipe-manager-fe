import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IngredientDTO } from 'src/app/shared/dto/ingredientDTO.model';
import * as IngredientActions from '../store/ingredients.action';
import { ingredientFeature } from '../store/ingredients.reducer';

interface Item {
  name: string;
  fats: number;
  sugars: number;
  otherSolids: number;
  sml: number;
  cost: number;
  pac: number;
  pod: number;
}

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styles: ['']
})
export class IngredientEditComponent implements OnInit {

  subscription: Subscription;
  ingredientForm: UntypedFormGroup;

  storeSelectedIngredient: IngredientDTO | null = null;

  totSolids: number = 0;
  water: number = 0;
  name: string = '';

  constructor(private store: Store, private confirmationService: ConfirmationService) {
    this.ingredientForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, Validators.required),
      'sugars': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'fats': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'sml': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'otherSolids': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'cost': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'pac': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)]),
      'pod': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)])
    });

    this.ingredientForm.valueChanges.subscribe((x) => {
      let item: Item = this.ingredientForm.value;
      let tot: number = item.sugars + item.fats + item.sml + item.otherSolids;
      this.totSolids = tot;
      this.water = Number((100 - tot).toFixed(2));
      this.name = item.name;
      console.log('component edit value component', this.totSolids, this.water);
    });

    this.subscription = this.store
      .pipe(select(ingredientFeature.selectSelectedIngredient))
      .subscribe(i => {
        this.storeSelectedIngredient = i;
        let n: Item = this.newItem();
        if (this.storeSelectedIngredient) {
          IngredientEditComponent.copyMatching(this.storeSelectedIngredient, n);
        }
        this.ingredientForm.setValue(n);
      });
  }

  static copyMatching(source: any, target: any): void {
    if (source && target) {
      Object.keys(target).forEach(key => {
        if (source[key] !== undefined) {
          target[key] = source[key];
        }
      });
    }
  }

  private newItem(): Item {
    let n: Item = { name: '', sugars: 0, fats: 0, sml: 0, otherSolids: 0, cost: 0, pac: 0, pod: 0 };
    return n;
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
    let c: AbstractControl | null = this.ingredientForm.get(name);
    return c != null && c.touched && !c.valid;
  }

  private initForm(): void {

  }

  save(event: Event) {
    console.log("Ingredient edit save button pressed");
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
    if (this.storeSelectedIngredient == null) {
      alert("no actual selected ingredient");
      return;
    }
    let item: Item = this.ingredientForm.value;
    let i: IngredientDTO = new IngredientDTO();
    Object.assign(i, this.storeSelectedIngredient);
    Object.assign(i, item);
    if (isNaN(this.storeSelectedIngredient.id)) {
      console.log("dispatching saving new item", i);
      this.store.dispatch(IngredientActions.SAVE_NEW_INGREDIENT({ ingredient: i }));
    } else {
      console.log("dispatching updating  item", i);
      this.store.dispatch(IngredientActions.UPDATE_INGREDIENT({ ingredient: i }));
    }
  }

}
