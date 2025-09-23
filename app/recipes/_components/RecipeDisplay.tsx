'use client';

import { RecipeProps } from "@/recipes/definitions";

export default function RecipeDisplay ({ recipe }: {recipe: RecipeProps | null}) {
  if (!recipe) return <div>Recipe not found</div>
  return <div>
    <h2 className="text-2xl">{ recipe.title }</h2>
    <div>Serves { recipe.servings }</div>
    {/* Add function to modify servings and calculate ingredients */}
    <div>
      Cooking Time:
      <div>Active Time: { recipe.activeCookingTime }</div>
      <div>Total Time: { recipe.totalCookingTime }</div>
    </div>
    <div>
      Ingredients
      { recipe.ingredients.map(ingrSet => <div key={ingrSet.name}>
        <div>{ ingrSet.name }</div>
        <ul>
          { ingrSet.ingredients.map(ingr => <li key={ingr.name}>{ ingr.quantity }{ ingr.quantityLabel } { ingr.name }</li>) }
        </ul>
      </div>) }
    </div>
    <div>
      Instructions
      { recipe.instructions.map((inst, idx) => {
        return <div key={idx}>
          { inst.timing && <div>After { inst.timing }:</div> }
          <div>{ inst.description }</div>
        </div>
      })}
    </div>
  </div>
}
