import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from 'rxjs/operators';
import { environment } from "../../environments/environment";
import {Ingredient} from "./ingredient.model";
import {User} from "../auth/user.model";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private url = environment.API_URL;
  private subscriptionUser: Subscription;
  user: User;

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {

  }


  storeRecipes() {
    const recipes = this.recipeService.recipes;
    this.http.put(`${this.url}products`, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
        return this.http.get<{count: number, products: []}>(
          `${this.url}products`
        ).pipe(
          map(response => {
            const productsArray = [];
            for (const productsKey of response.products) {
                productsArray.push(productsKey)
            }
            return productsArray;
          }),
          tap(recipes => {
            console.log(recipes);
            this.recipeService.recipes = recipes;
          })
        );
  }

  storeRecipe(rec: Recipe) {
    return this.http.post(`${this.url}products`, rec)
  }

  patchRecipe(id, rec: Recipe) {
    return this.http.patch(`${this.url}products/${id}`, rec)

  }

  deleteRecipe(id: String) {
    return this.http.delete(`${this.url}products/${id}`)
  }

  storeOrder(user: User, order: Ingredient[]) {
    const json = {
      user: user.id,
      products: order.map(item => {
        return {
          product: item.recipe._id,
          quantity: item.amount
        }
      })
    };
    console.log(json);

    return this.http.post(`${this.url}orders`, json)

  }
}
