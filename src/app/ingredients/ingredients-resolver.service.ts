import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { IngredientDTO } from "../shared/dto/ingredientDTO.model";
import * as IngredientActions from './store/ingredients.action';

@Injectable({ providedIn: "root" })
export class IngredientResolverService implements Resolve<{ list: IngredientDTO[] }> {

    constructor(
        private store: Store,
        private actions$: Actions
    ) { }

    resolve() {
        this.store.dispatch(IngredientActions.FETCH_DTO_LIST());
        return { list: [] };
    }
}