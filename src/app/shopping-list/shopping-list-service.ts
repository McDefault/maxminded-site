import { EventEmitter } from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService {

  shoppingListAdded = new Subject<Ingredient>();
  startedEditing = new Subject<number>();
  // shoppingListDelete = new EventEmitter<Ingredient>();
  // shoppingListClear = new EventEmitter<Ingredient>();
  ingredientsChanged = new Subject<Ingredient[]>();

  private _ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Pears", 3)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  getIngredient(i: number) {
    return this._ingredients[i];
  }

  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }

  addShoppingList(ing: Ingredient) {
    this._ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients);
    // this.shoppingListAdded.next(ing);


    // const ingredients: Ingredient[] = this.ingredients;
    // this._ingredients.push(...ing);
  }

  addIngredient(ing : Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient ( i: number, ing: Ingredient) {
    this._ingredients[i] = ing;
    this.ingredientsChanged.next(this.ingredients);
  }
}
