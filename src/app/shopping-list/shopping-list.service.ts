import { EventEmitter } from "@angular/core";
// import {Ingredient} from "../shared/ingredient.model";

import {Subject} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";

export class ShoppingListService {
  startedEditing = new Subject<number>();
  // shoppingListDelete = new EventEmitter<Ingredient>();
  // shoppingListClear = new EventEmitter<Ingredient>();
  shoppingListChanged = new Subject<Ingredient[]>();

  private _ingredients: Ingredient[] = [

    // new Ingredient(new Recipe(null, 'Aapje', null, null), 5)
  ];

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  getProduct(i: number) {
    return this._ingredients[i];
  }

  set ingredients(ingredients: Ingredient[]) {
    this._ingredients = ingredients;
  }

  addShoppingList(ing: Recipe, quantity: number) {
    this._ingredients.push(new Ingredient(ing, quantity));
    this.shoppingListChanged.next(this.ingredients);
    // this.shoppingListAdded.next(ing);


    // const ingredients: Ingredient[] = this.ingredients;
    // this._ingredients.push(...ing);
  }

  addProduct(rec : Recipe, quantity: number) {
    const ing = new Ingredient(rec, quantity)
    this._ingredients.push(ing);
    // console.log(this.ingredients)
    this.shoppingListChanged.next(this.ingredients);
  }

  // addProducts(ingredients: Recipe[]) {
  //   this._ingredients.push(...ingredients);
  //   this.shoppingListChanged.next(this.ingredients);
  // }

  updateIngredient ( i: number, quantity: number) {
    const ing = new Ingredient(
      new Recipe(this._ingredients[i].recipe._id,
        this._ingredients[i].recipe.name,
        this._ingredients[i].recipe.price,
        this._ingredients[i].recipe.image),
      quantity
    )

    this._ingredients[i] = ing;
    this.shoppingListChanged.next(this.ingredients);
  }

  deleteIngredient(i: number) {
    this._ingredients.splice(i, 1);
    this.shoppingListChanged.next(this.ingredients);
  }
}
