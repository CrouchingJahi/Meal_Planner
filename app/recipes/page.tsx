import AddRecipeForm from '@/recipes/_components/AddRecipeForm'
import RecipeList from '@/recipes/_components/RecipeList'
import { getRecipesByCategory } from '@/_db'
import { CategoryProps } from './definitions'

/**
 * 
 * @todo needs a way to manage and delete categories
 */
export default async function RecipesPage () {
  const [recipesByCategory, totalRecipes] = await getRecipesByCategory()
  const categoryList = Object.values(recipesByCategory).filter(cat => cat.id !== 'stray').map(cat => {
    return { id: cat.id, title: cat.title } as CategoryProps
  })

  return <div>
    <AddRecipeForm categoryList={categoryList} />
    <RecipeList recipesByCategory={recipesByCategory} totalRecipes={totalRecipes} />
  </div>
}
