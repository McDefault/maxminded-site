import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private url = environment.API_URL;

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
}
