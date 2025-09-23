import Link from 'next/link'
import RecipeListing from '@/recipes/_components/RecipeListing'
import { getRecipesByCategory } from '@/_db'

export default async function RecipesPage () {
  const [recipesByCategory, totalRecipes] = await getRecipesByCategory()

  return <div>
    <Link href="recipes/add" className="inline-block text-foreground bg-links rounded-lg px-4 py-2 mb-4">Add Recipe</Link>

    <RecipeListing recipesByCategory={recipesByCategory} totalRecipes={totalRecipes} />
  </div>
}
