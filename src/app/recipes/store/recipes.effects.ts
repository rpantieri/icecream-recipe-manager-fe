import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { RecipeDTO } from 'src/app/shared/dto/recipeDTO.model';
import { environment } from 'src/environments/environment';
import * as RecipesActions from './recipes.action';

@Injectable({ providedIn: 'root' })
export class RecipesEffects {

    fetchRecipesDTO = createEffect(() => this.actions$.pipe(
        ofType(RecipesActions.FETCH_DTO_LIST),
        switchMap(() => {
            console.log('fetch dto list');
            return this.http.get<RecipeDTO[]>(
                environment.baseUrl + '/recipe/listDTO'
            ).pipe(
                map(recipes => {
                    console.log('set recipe dto list action');
                    return RecipesActions.SET_DTO_LIST({ list: recipes });
                })
            )
        })
    ));

    insertRecipes = createEffect(() => this.actions$.pipe(
        ofType(RecipesActions.SAVE_NEW_RECIPE),
        exhaustMap((action) => {
            console.log('saving new recipe: ', action.recipe);
            return this.http.post<RecipeDTO>(
                environment.baseUrl + 'recipe/', action.recipe
            ).pipe(
                map(recipe => {
                    console.log('saved new recipe:', recipe);
                    return RecipesActions.SAVED_NEW_RECIPE({ recipe: recipe });
                })
            )
        })
    ));

    updateRecipe = createEffect(() => this.actions$.pipe(
        ofType(RecipesActions.UPDATE_RECIPE),
        exhaustMap((action) => {
            console.log('updating recipe: ', action.recipe);
            return this.http.put<RecipeDTO>(
                'http://localhost:8080/recipe/' + action.recipe.id, action.recipe
            ).pipe(
                map(recipe => {
                    console.log('updated recipe:', recipe);
                    return RecipesActions.UPDATED_RECIPE({ recipe: recipe });
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
