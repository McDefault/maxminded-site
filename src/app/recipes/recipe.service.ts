import { EventEmitter } from "@angular/core";
import {Recipe} from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private _recipes: Recipe[] = [
    new Recipe('Test', 'Test1', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  // slice() creates new array so the original doesnt get edited
  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
