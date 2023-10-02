import { RecipeIngredientDTO } from './recipeIngredientDTO.model'
export class RecipeDTO {
    public id: number = NaN;
    public name: string = '';

    public ingredients: RecipeIngredientDTO[] = [];

    constructor() { }
}

