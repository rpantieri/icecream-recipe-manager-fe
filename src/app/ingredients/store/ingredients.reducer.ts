import { Action, createFeature, createReducer, on } from '@ngrx/store';

import * as IngredientAction from './ingredients.action';
import { IngredientDTO } from '../../shared/dto/ingredientDTO.model';

export const INGREDIENTS_KEY = 'ingredients';

export interface State {
    ingredients: IngredientDTO[];
    selectedIngredient: IngredientDTO | null;
}

const initialState: State = {
    ingredients: [],
    selectedIngredient: null
};


export const ingredientFeature=createFeature({
    name: INGREDIENTS_KEY,
    reducer: createReducer(
    initialState,
    on(IngredientAction.FETCH_DTO_LIST, state => {
        console.log('fetch dto list reducer');
        return { ...state };
    }),
    on(IngredientAction.SET_DTO_LIST, (state, action) => {
        console.log('set dto list reducer');
        let ii:IngredientDTO[] = action.list.map( x => IngredientDTO.copyFromProxy(x));
        return { ...state, ingredients: ii };
    }),
    on(IngredientAction.EDIT_INGREDIENT, (state, action) => {
        console.log('edit ingredient');
        return { ...state, selectedIngredient: action.ingredient };
    }),
    on(IngredientAction.NEW_INGREDIENT, (state, action) => {
        console.log('new ingredient');
        return { ...state, selectedIngredient: action.ingredient };
    }),
    on(IngredientAction.SAVED_NEW_INGREDIENT, (state, action) => {
        console.log('saved  ingredient reducer');
        return { ...state, ingredients: [...state.ingredients, action.ingredient], selectedIngredient: action.ingredient };
    }),
    on(IngredientAction.UPDATED_INGREDIENT, (state, action) => {
        console.log('updated  ingredient reducer');
        const index: number = state.ingredients.findIndex((x) => x.id === action.ingredient.id);
        let ia: IngredientDTO[] = [...state.ingredients];
        ia[index] = action.ingredient;
        return { ...state, ingredients: ia, selectedIngredient: action.ingredient };
    }),
    on(IngredientAction.RESET_SELECTED_INGREDIENT, (state, action) => {
        console.log('new ingredient');
        return { ...state, selectedIngredient: null };
    })
)});

export const{
    name,
    reducer,
    selectIngredients,
    selectIngredientsState,
    selectSelectedIngredient
} = ingredientFeature;

