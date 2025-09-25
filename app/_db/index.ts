import { RecipeProps, CategoryProps, RecipesByCategory } from "@/recipes/definitions";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, setDoc, Firestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

let dbInstance : Firestore

// Initialize Firebase
async function getDB () {
  if (dbInstance) return dbInstance
  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  await signInWithEmailAndPassword(auth, process.env.FIREBASE_AUTH_USER || '', process.env.FIREBASE_AUTH_PASS || '')
  dbInstance = getFirestore(firebaseApp)
  return dbInstance
}

export async function getRecipe (id: string) {
  if (!id) return null

  const db = await getDB()
  const recipeRef = doc(db, 'recipes', id)
  const recipeSnapshot = await getDoc(recipeRef)
  if (recipeSnapshot.exists()) {
    return recipeSnapshot.data() as RecipeProps
  } else {
    return null
  }
}
/*
export async function getAllCategories () {
  const categoryList: Array<CategoryProps> = []
  const categorySnapshot = await getDocs(collection(db, 'categories'))
  categorySnapshot.forEach(doc => categoryList.push(doc.data() as CategoryProps))
  return categoryList
}

export async function getAllRecipes () {
  const recipeList: Array<RecipeProps> = []
  const recipesSnapshot = await getDocs(collection(db, 'recipes'))
  recipesSnapshot.forEach(doc => recipeList.push(doc.data() as RecipeProps))
  return recipeList
}
*/

export async function getRecipesByCategory () {
  const db = await getDB()
  const recipeCollection: RecipesByCategory = {}

  const categorySnapshot = await getDocs(collection(db, 'categories'))
  categorySnapshot.forEach(doc => {
    let thisCategory = doc.data() as CategoryProps
    recipeCollection[thisCategory.id] = {
      ...thisCategory,
      recipes: []
    }
  })
  recipeCollection['stray'] = { id: 'stray', title: 'Uncategorized', recipes: [] }

  const recipesSnapshot = await getDocs(collection(db, 'recipes'))
  recipesSnapshot.forEach(doc => {
    let thisRecipe = doc.data() as RecipeProps
    let matchedCategory = recipeCollection[thisRecipe.categoryId || 'stray']
    matchedCategory.recipes.push(thisRecipe)
  })

  return [recipeCollection, recipesSnapshot.size] as [RecipesByCategory, number]
}

export async function createCategory (category: CategoryProps) {
  const db = await getDB()
  await setDoc(doc(db, 'categories', category.id), { ...category })
}

export async function createRecipe (recipe: RecipeProps) {
  const db = await getDB()
  await setDoc(doc(db, 'recipes', recipe.id), { ...recipe })
}
