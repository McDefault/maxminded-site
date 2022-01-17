import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private url = 'https://maxminded-site-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.recipes;
    this.http.put(`${this.url}recipes.json`, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
        return this.http.get<Recipe[]>(
          `${this.url}recipes.json`
        ).pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap(recipes => {
            this.recipeService.recipes = recipes;
          })
        );
  }
}
