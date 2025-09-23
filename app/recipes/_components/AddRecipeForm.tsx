'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { RecipeProps } from '../definitions'

const existingCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  // Add more as needed or fetch from a data source
];

/**
 * 
 * @returns A form component for adding a new recipe.
 * @todo make an option to import from markdown file
 */
export default function AddRecipeForm () {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(existingCategories[0]);
  const [newCategory, setNewCategory] = useState("");
  const [servings, setServings] = useState(1);
  const [activeTime, setActiveTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", quantityLabel: "" }]);
  const [instructions, setInstructions] = useState([""]);

  const handleIngredientChange = (idx: number, field: string, value: string) => {
    const updated = ingredients.map((ing, i) =>
      i === idx ? { ...ing, [field]: value } : ing
    );
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", quantityLabel: "" }]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const handleInstructionChange = (idx: number, value: string) => {
    const updated = instructions.map((ins, i) => (i === idx ? value : ins));
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (idx: number) => {
    setInstructions(instructions.filter((_, i) => i !== idx));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setNewCategory("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Submit logic here
    let formData = new FormData(e.target as HTMLFormElement)
    console.log("Form Data:", Object.fromEntries(formData.entries()));
    // cast to RecipeProps
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Add Recipe</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={handleCategoryChange}>
          {existingCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="__new__">Create new...</option>
        </select>
        {category === "__new__" && (
          <input
            type="text"
            placeholder="New category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            required
          />
        )}
      </div>
      <div>
        <label>Servings:</label>
        <input
          type="number"
          min={1}
          value={servings}
          onChange={e => setServings(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Active Cooking Time:</label>
        <input
          type="text"
          placeholder="e.g. 30 min"
          value={activeTime}
          onChange={e => setActiveTime(e.target.value)}
        />
      </div>
      <div>
        <label>Total Cooking Time:</label>
        <input
          type="text"
          placeholder="e.g. 1 hr"
          value={totalTime}
          onChange={e => setTotalTime(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients:</label>
        {ingredients.map((ing, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <input
              type="text"
              placeholder="Ingredient"
              value={ing.name}
              onChange={e => handleIngredientChange(idx, "name", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Quantity (optional)"
              value={ing.quantity}
              onChange={e => handleIngredientChange(idx, "quantity", e.target.value)}
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
      </div>
      <div>
        <label>Instructions:</label>
        {instructions.map((ins, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <textarea
              placeholder={`Step ${idx + 1}`}
              value={ins}
              onChange={e => handleInstructionChange(idx, e.target.value)}
              required
              rows={2}
              style={{ flex: 1 }}
            />
            {instructions.length > 1 && (
              <button type="button" onClick={() => removeInstruction(idx)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addInstruction}>Add Step</button>
      </div>
      <div style={{ marginTop: 16 }}>
        <button type="submit">Save Recipe</button>
      </div>
    </form>
  );
}
