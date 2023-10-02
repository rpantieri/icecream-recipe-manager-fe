import { createAction, props } from '@ngrx/store';
import { IngredientDTO } from 'src/app/shared/dto/ingredientDTO.model';


export const FETCH_DTO_LIST = createAction(
    '[INGREDIENTS] FETCH_INGREDIENTS_LIST'
);

export const SET_DTO_LIST = createAction(
    '[INGREDIENTS] setList',
    props<{ list: IngredientDTO[] }>()
);

export const EDIT_INGREDIENT = createAction(
    '[INGREDIENTS] editIngredient',
    props<{ ingredient: IngredientDTO }>()
);

export const NEW_INGREDIENT = createAction(
    '[INGREDIENTS] NEW_INGREDIENT',
    props<{ ingredient: IngredientDTO }>()
);

export const SAVE_NEW_INGREDIENT = createAction(
    '[INGREDIENTS] SAVE_NEW_INGREDIENT',
    props<{ ingredient: IngredientDTO }>()
);

export const SAVED_NEW_INGREDIENT = createAction(
    '[INGREDIENTS] SAVED_NEW_INGREDIENT',
    props<{ ingredient: IngredientDTO }>()
);

export const UPDATE_INGREDIENT = createAction(
    '[INGREDIENTS] UPDATE_INGREDIENT',
    props<{ ingredient: IngredientDTO }>()
);

export const UPDATED_INGREDIENT = createAction(
    '[INGREDIENTS] UPDATED_INGREDIENT',
    props<{ ingredient: IngredientDTO }>()
);

export const RESET_SELECTED_INGREDIENT = createAction(
    '[INGREDIENTS] RESET_SELECTED_INGREDIENT'
);
