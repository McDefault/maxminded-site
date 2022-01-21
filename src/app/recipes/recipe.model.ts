import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  constructor(public _id: string,
              public name: string,
              public price: string,
              public image: string) {
  }
  // get id(){
  //   return this._id;
  // }

}
