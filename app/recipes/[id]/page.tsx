import { getRecipe } from "@/_db"
import RecipeDisplay from "@/recipes/_components/RecipeDisplay"
/**
 * 
 * @param id recipe ID
 * @returns 
 * @todo support slugs to search for recipes by name
 */
export default async function RecipePage ({ params }: {params: Promise<{id: string}>}) {
  const { id } = await params
  const recipeData = await getRecipe(id)

  return <RecipeDisplay recipe={recipeData} />
}
