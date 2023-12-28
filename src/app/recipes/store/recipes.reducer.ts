import { createFeature, createReducer, on } from '@ngrx/store';

import * as RecipesAction from './recipes.action';
import { RecipeDTO } from '../../shared/dto/recipeDTO.model';

export const RECIPES_KEY = 'recipes';

export interface State {
    recipes: RecipeDTO[];
    selectedRecipe: RecipeDTO | null;
}

const initialState: State = {
    recipes: [],
    selectedRecipe: null
};



export const recipesFeature = createFeature({
    name: RECIPES_KEY,
    reducer:  createReducer(
    initialState,
    on(RecipesAction.FETCH_DTO_LIST, state => {
        console.log('fetch recipe dto list reducer');
        return { ...state };
    }),
    on(RecipesAction.SET_DTO_LIST, (state, action) => {
        console.log('set recipe dto list reducer');
        return { ...state, recipes: action.list };
    }),
    on(RecipesAction.EDIT_RECIPE, (state, action) => {
        console.log('edit recipe');
        return { ...state, selectedRecipe: action.recipe };
    }),
    on(RecipesAction.NEW_RECIPE, (state, action) => {
        console.log('new recipe');
        return { ...state, selectedRecipe: action.recipe };
    }),
    on(RecipesAction.SAVED_NEW_RECIPE, (state, action) => {
        console.log('saved  new recipe reducer');
        return { ...state, recipes: [...state.recipes, action.recipe], selectedRecipe: action.recipe };
    }),
    on(RecipesAction.UPDATED_RECIPE, (state, action) => {
        console.log('updated  recipe reducer');
        const index: number = state.recipes.findIndex((x) => x.id === action.recipe.id);
        let ia: RecipeDTO[] = [...state.recipes];
        ia[index] = action.recipe;
        return { ...state, recipes: ia, selectedRecipe: action.recipe };
    }),
    on(RecipesAction.RESET_SELECTED_RECIPE, (state, action) => {
        console.log('reset select recipe');
        return { ...state, selectedRecipe: null };
    })
)});

export const{
    name,
    reducer,
    selectRecipes,
    selectRecipesState,
    selectSelectedRecipe
} = recipesFeature

