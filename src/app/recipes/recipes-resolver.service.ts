import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { IngredientResolverService } from "../ingredients/ingredients-resolver.service";
import { RecipeDTO } from "../shared/dto/recipeDTO.model";
import * as RecipesActions from './store/recipes.action';

@Injectable({ providedIn: "root" })
export class RecipeResolverService implements Resolve<{ list: RecipeDTO[] }> {

    constructor(
        private store: Store,
        private actions$: Actions,
        private iRes: IngredientResolverService
    ) { }

    resolve() {
        this.store.dispatch(RecipesActions.FETCH_DTO_LIST());
        return { list: [] };
    }
}