export type CategoryProps = {
  id: string,
  title: string,
}

// Will want functionality for separate sets of ingredients
type IngredientSet = {
  name: string,
  ingredients: Array<{ name: string, quantity: number, quantityLabel: string }>
}

export type RecipeProps = {
  id: string,
  title: string,
  description: string,
  categoryId: string,
  servings: number,
  activeCookingTime: string,
  totalCookingTime: string,
  ingredients: Array<IngredientSet>,
  instructions: Array<{ step: number, timing?: string, description: string}>,
}

interface RecipeCategoryListing extends CategoryProps {
  recipes: Array<RecipeProps>
}
export type RecipesByCategory = Record<string, RecipeCategoryListing>
