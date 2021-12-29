import { EventEmitter } from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

  shoppingListAdded = new Subject<Ingredient>();
  shoppingListDelete = new EventEmitter<Ingredient>();
  shoppingListClear = new EventEmitter<Ingredient>();
  toShoppingList = new EventEmitter<Ingredient[]>();

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

  addShoppingList(ing: Ingredient) {
    this._ingredients.push(ing);
    this.shoppingListAdded.next(ing);


    // const ingredients: Ingredient[] = this.ingredients;
    // this._ingredients.push(...ing);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.toShoppingList.emit(this._ingredients);


  }
}
