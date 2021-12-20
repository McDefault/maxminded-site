import { EventEmitter } from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class ShoppingListService {

  shoppingListAdded = new EventEmitter<Ingredient>();
  shoppingListDelete = new EventEmitter<Ingredient>();
  shoppingListClear = new EventEmitter<Ingredient>();

  private _ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Pears", 3)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }


  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }

  addIngredient(ing: Ingredient) {
    this._ingredients.push(ing);
  }
}
