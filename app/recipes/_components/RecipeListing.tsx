'use client'

import Link from 'next/link'
import { RecipesByCategory } from "@/recipes/definitions";

export default function RecipeListing({ recipesByCategory, totalRecipes }: { recipesByCategory: RecipesByCategory, totalRecipes: number }) {
  const categoryList = Object.keys(recipesByCategory)

  return <div>
    {totalRecipes == 0 && <p>No recipes yet</p>}
    {totalRecipes > 0 && categoryList.map((categoryId) => {
      const category = recipesByCategory[categoryId]

      if (category.recipes.length === 0) return null
      return <section key={categoryId} id={`category-${category.id}`}>
        <h2 className="text-xl font-bold">{ category.title }</h2>
        { category.recipes.map(recipe => <Link key={recipe.id} href={`recipes/${recipe.id}`}>{ recipe.title }</Link>) }
      </section>
    })}
  </div>
}
