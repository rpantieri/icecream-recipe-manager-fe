import { createAction, props } from '@ngrx/store';
import { RecipeDTO } from 'src/app/shared/dto/recipeDTO.model';


export const FETCH_DTO_LIST = createAction(
    '[RECIPES] FETCH_RECIPES_LIST'
);

export const SET_DTO_LIST = createAction(
    '[RECIPES] setList',
    props<{ list: RecipeDTO[] }>()
);

export const EDIT_RECIPE = createAction(
    '[RECIPES] editRecipe',
    props<{ recipe: RecipeDTO }>()
);

export const NEW_RECIPE = createAction(
    '[RECIPES] NEW_RECIPE',
    props<{ recipe: RecipeDTO }>()
);

export const SAVE_NEW_RECIPE = createAction(
    '[RECIPES] SAVE_NEW_RECIPE',
    props<{ recipe: RecipeDTO }>()
);

export const SAVED_NEW_RECIPE = createAction(
    '[RECIPES] SAVED_NEW_RECIPE',
    props<{ recipe: RecipeDTO }>()
);

export const UPDATE_RECIPE = createAction(
    '[RECIPES] UPDATE_RECIPE',
    props<{ recipe: RecipeDTO }>()
);

export const UPDATED_RECIPE = createAction(
    '[RECIPES] UPDATED_RECIPE',
    props<{ recipe: RecipeDTO }>()
);

export const RESET_SELECTED_RECIPE = createAction(
    '[RECIPES] RESET_SELECTED_RECIPE'
);
