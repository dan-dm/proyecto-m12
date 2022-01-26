export class CreateRecipeDto {
  title: string;
  recipeImageUrl: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
}
