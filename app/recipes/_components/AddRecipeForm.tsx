'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { CategoryProps, RecipeProps } from '../definitions';
import { AddIcon, RemoveIcon } from '@/_ui/Icons';

/**
 * 
 * @returns A form component for adding a new recipe.
 * @todo change input events to on blur for performance
 * @todo make an option to import from markdown file
 */
export default function AddRecipeForm ({ categoryList }: { categoryList: Array<CategoryProps> }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredientGroups, setIngredientGroups] = useState([{ name: "", ingredients: [{quantity: 1, unit: '', name: ''}] }])
  const [instructions, setInstructions] = useState([{ timing: "", description: ""}]);

  const addIngredientGroup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIngredientGroups([...ingredientGroups, { name: "", ingredients: [{quantity: 1, unit: '', name: ''}] }]);
  }

  const removeIngredientGroup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, grpIndex: number) => {
    event.preventDefault();
    let grpCopy = [...ingredientGroups];
    grpCopy.splice(grpIndex, 1);
    setIngredientGroups(grpCopy);
  }

  const changeIngredientGroupName = (event: ChangeEvent<HTMLInputElement>, grpIndex: number) => {
    let grpCopy = [...ingredientGroups];
    grpCopy[grpIndex].name = event.target.value;
    setIngredientGroups(grpCopy);
  }

  const addIngredientToGroup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, grpIndex: number) => {
    event.preventDefault();
    let grpCopy = [...ingredientGroups];
    grpCopy[grpIndex].ingredients.push({ name: "", quantity: 1, unit: "" });
    setIngredientGroups(grpCopy);
  }

  const removeIngredientFromGroup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setIndex: number, ingredientIndex: number) => {
    event.preventDefault();
    let grpCopy = [...ingredientGroups];
    grpCopy[setIndex].ingredients.splice(ingredientIndex, 1);
    setIngredientGroups(grpCopy);
  }

  const changeIngredientList = (event: ChangeEvent<HTMLInputElement>, grpIndex: number, ingredientIndex: number, field: string) => {
    let grpCopy = [...ingredientGroups];
    let newIngr = grpCopy[grpIndex].ingredients[ingredientIndex];
    if (field == 'quantity') {
      newIngr[field] = Number(event.target.value);
    } else if (field == 'unit' || field == 'name') {
      newIngr[field] = event.target.value;
    }
    setIngredientGroups(grpCopy);
  }

  const handleInstructionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx: number, field: string) => {
    const instrCopy = [...instructions];
    const updated = instructions.map((ins, i) => {
      if (i != idx) {
        return ins
      } else {
        if (field == 'timing') {
          return { ...ins, timing: event.target.value }
        } else if (field == 'description') {
          return { ...ins, description: event.target.value }
        }
        return ins
      }
    });
    setInstructions(updated);
  };

  const addInstruction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setInstructions([...instructions, { timing: '', description: '' }]);
  };

  const removeInstruction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => {
    event.preventDefault();
    setInstructions(instructions.filter((_, i) => i !== idx));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let recipeObject = {} as RecipeProps;
    let formData = new FormData(e.target as HTMLFormElement);
    recipeObject.ingredients = ingredientGroups;
    // Submit recipeObject
    console.log("Form Data:", Object.fromEntries(formData.entries()));
    console.log(recipeObject);
  };

  const buttonClasses = "inline-block text-foreground rounded-lg px-4 py-2 hover:cursor-pointer"

  if (!isFormOpen) {
    return <button className={buttonClasses + ' bg-links mb-4'} onClick={() => setIsFormOpen(true)}>Add Recipe</button>
  } else {
    const fieldsetClasses = "flex flex-col my-2"
    const standardFormClasses = "rounded-sm border-form-border border-1 bg-form-bg p-1"

    return <form onSubmit={handleSubmit} className="max-w-md mb-6">
      <button className={buttonClasses + ' bg-links mb-4'} onClick={() => setIsFormOpen(false)}>Close Form</button>
      <h2 className="text-xl mb-2">Add Recipe</h2>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="title">Title:</label>
        <input name="title"
          type="text"
          className={standardFormClasses}
          required
        />
      </fieldset>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="description">Description:</label>
        <textarea name="description" className={standardFormClasses} />
      </fieldset>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="categoryId">Category:</label>
        <select name="categoryId"
          className={standardFormClasses + ' py-2'}
          value={selectedCategory} onChange={handleCategoryChange}
        >
          <option value="">(None)</option>
          {categoryList.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
          <option value="__new__">(Create New)</option>
        </select>
        {selectedCategory === "__new__" && (
          <input name="newCategory"
            type="text"
            className={standardFormClasses + ' mt-1'}
            placeholder="New Category Name"
            required
          />
        )}
      </fieldset>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="servings">Servings:</label>
        <input name="servings"
          type="number"
          className={standardFormClasses}
          min={1}
          required
        />
      </fieldset>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="activeCookingTime">Active Cooking Time:</label>
        <input name="activeCookingTime"
          type="text"
          className={standardFormClasses}
          placeholder="e.g. 30 min"
        />
      </fieldset>
      <fieldset className={fieldsetClasses}>
        <label htmlFor="totalCookingTime">Total Cooking Time:</label>
        <input name="totalCookingTime"
          type="text"
          className={standardFormClasses}
          placeholder="e.g. 1 hr"
        />
      </fieldset>
      <div className="mt-2">
        <h3>Ingredients:</h3>
        { ingredientGroups.map((group, grpIdx) => <div key={grpIdx} className="mb-2 border-y-2 border-form-border">
          <div className="flex justify-end">
            { grpIdx > 0 && <button
                className="flex text-faded hover:cursor-pointer"
                onClick={e => removeIngredientGroup(e, grpIdx)}
              >
                <RemoveIcon className="size-6" />
                &nbsp;Remove Group
              </button> }
          </div>
          <fieldset className={fieldsetClasses}>
            <label htmlFor={`ingredientGroup.${grpIdx}.name`}>Ingredient Group Name:</label>
            <input name={`ingredientGroup.${grpIdx}.name`}
              type="text"
              className={standardFormClasses}
              value={group.name}
              onChange={e => changeIngredientGroupName(e, grpIdx)}
              placeholder="(Optional)"
            />
          </fieldset>
          <div className="flex gap-1 text-sm">
            <div className="w-12">&nbsp;Qty</div>
            <div className="w-20">&nbsp;Unit</div>
            <div className="flex-grow">&nbsp;Ingredient</div>
          </div>
          { group.ingredients.map((ingr, ingrIdx) => <div key={ingrIdx} className="flex gap-1 my-1">
            <input name={`ingredientGroup.${grpIdx}.ingredients.${ingrIdx}.quantity`}
              type="number"
              className={standardFormClasses + ' w-12'}
              value={ingr.quantity}
              onChange={e => changeIngredientList(e, grpIdx, ingrIdx, 'quantity')}
            />
            <input name={`ingredientGroup.${grpIdx}.ingredients.${ingrIdx}.unit`}
              type="text"
              className={standardFormClasses + ' w-20'}
              value={ingr.unit}
              onChange={e => changeIngredientList(e, grpIdx, ingrIdx, 'unit')}
            />
            <input name={`ingredientGroup.${grpIdx}.ingredients.${ingrIdx}.name`}
              type="text"
              className={standardFormClasses + ' flex-grow'}
              value={ingr.name}
              onChange={e => changeIngredientList(e, grpIdx, ingrIdx, 'name')}
            />
            <button className="p-2 hover:cursor-pointer" onClick={e => removeIngredientFromGroup(e, grpIdx, ingrIdx)}>
              <RemoveIcon className="size-6" />
            </button>
          </div>) }
          <button
            onClick={e => addIngredientToGroup(e, grpIdx)}
            className="flex items-center gap-1 p-2 hover:cursor-pointer"
          >
            <AddIcon className="size-4" />
            Add Ingredient to Group
          </button>
        </div>) }
        <button
          onClick={e => addIngredientGroup(e)}
          className="flex items-center gap-1 p-2 hover:cursor-pointer"
        >
          <AddIcon className="size-4" />
          Add Group of Ingredients
        </button>
      </div>
      <div className="mt-2">
        <div>Instructions:</div>
        { instructions.map((step, idx) => <div key={idx}>
          <div className="flex justify-end">
            <button
              className="flex text-faded hover:cursor-pointer"
              onClick={e => removeInstruction(e, idx)}
            >
              <RemoveIcon className="size-6" />
              &nbsp;Remove
            </button>
          </div>
          { idx > 0 && <fieldset className={fieldsetClasses}>
            <label htmlFor={`instructions.${idx}.timing`}>Timeframe (optional):</label>
            <input name={`instructions.${idx}.timing`}
              type="text"
              className={standardFormClasses}
              value={step.timing}
              onChange={e => handleInstructionChange(e, idx, 'timing')}
            />
          </fieldset> }
          <fieldset className={fieldsetClasses}>
            <label htmlFor={`instructions.${idx}.description`}>Step { idx + 1 }:</label>
            <textarea name={`instructions.${idx}.description`}
              className={standardFormClasses}
              value={step.description}
              onChange={e => handleInstructionChange(e, idx, 'description')}
            />
          </fieldset>
        </div>) }
        <button
          onClick={e => addInstruction(e)}
          className="flex items-center gap-1 p-2 hover:cursor-pointer"
        >
          <AddIcon className="size-4" />
          Add Instruction
        </button>
      </div>
      <button type="submit" className={buttonClasses + ' bg-cta mt-4'}>
        Save Recipe
      </button>
    </form>
  }
}
