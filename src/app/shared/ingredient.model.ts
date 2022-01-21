import {Recipe} from "../recipes/recipe.model";

export class Ingredient {

  constructor(public recipe:Recipe, public amount:number) {
  }
}
