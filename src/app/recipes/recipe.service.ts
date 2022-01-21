import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";

export class RecipeService {

  constructor() {
  }

  recipesChanged = new Subject<Recipe[]>()
  private _recipes: Recipe[] = [];
  // private _recipes: Recipe[] = [
  //   new Recipe(
  //     'Test',
  //     'Test1',
  //     'https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png',
  //     [
  //       new Ingredient('Aapje', 2)
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Test Recipe',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //     [
  //       new Ingredient('Muis', 1)
  //     ]
  //   )
  // ];

  // slice() creates new array so the original doesnt get edited
  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipes(): Recipe[] {
    return this._recipes;
  }

   getRecipe(id: String): Recipe {
    let returnRecipe = null;
    for (let recipe of this._recipes) {
      if (recipe._id === id ) {
        returnRecipe = recipe;
      }
    }
    return returnRecipe;
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
    //send to server

  }

  updateRecipe(id: String, recipe: Recipe) {
    for (let i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i]._id === id) {
        this._recipes[i] = recipe;
      }
    }
    this.recipesChanged.next(this.recipes)
  }

  deleteRecipe(id: String) {
    for (let i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i]._id === id) {
        this._recipes.splice(i, 1);
      }
    }
    this.recipesChanged.next(this.recipes);
  }

  set recipes(rec: Recipe[]){
    this._recipes = rec;
    this.recipesChanged.next(this.recipes);
  }
}
