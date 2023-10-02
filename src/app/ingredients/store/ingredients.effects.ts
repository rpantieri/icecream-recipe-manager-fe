import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, exhaustMap } from 'rxjs/operators';
import * as IngredientActions from './ingredients.action';
import { IngredientDTO } from 'src/app/shared/dto/ingredientDTO.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IngredientsEffects {

    fetchIngredientsDTO = createEffect(() => this.actions$.pipe(
        ofType(IngredientActions.FETCH_DTO_LIST),
        switchMap(() => {
            console.log('fetch dto list');
            return this.http.get<IngredientDTO[]>(
                environment.baseUrl + 'ingredient/listDTO'
            ).pipe(
                map(ingredients => {
                    console.log('set dto list action');
                    return IngredientActions.SET_DTO_LIST({ list: ingredients });
                })
            )
        })
    ));

    insertIngredients = createEffect(() => this.actions$.pipe(
        ofType(IngredientActions.SAVE_NEW_INGREDIENT),
        exhaustMap((action) => {
            console.log('saving new ingredient: ', action.ingredient);
            return this.http.post<IngredientDTO>(
                environment.baseUrl + 'ingredient/', action.ingredient
            ).pipe(
                map(ingredient => {
                    console.log('saved new ingredient:', ingredient);
                    return IngredientActions.SAVED_NEW_INGREDIENT({ ingredient: ingredient });
                })
            )
        })
    ));

    updateIngredient = createEffect(() => this.actions$.pipe(
        ofType(IngredientActions.UPDATE_INGREDIENT),
        exhaustMap((action) => {
            console.log('updating ingredient: ', action.ingredient);
            return this.http.put<IngredientDTO>(
                environment.baseUrl + 'ingredient/' + action.ingredient.id, action.ingredient
            ).pipe(
                map(ingredient => {
                    console.log('updated ingredient:', ingredient);
                    return IngredientActions.UPDATED_INGREDIENT({ ingredient: ingredient });
                })
            )
        })
    ));



    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store
    ) { }
}
