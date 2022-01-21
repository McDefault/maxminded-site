import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: String;
  constructor(private slService: ShoppingListService,
              private rcService: RecipeService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  onClickToShoppingList () {
    console.log(this.recipe);
    // this.slService.toShoppingList.emit(this.recipe.ingredients);
    this.slService.addProduct(this.recipe, 1);
  }

  ngOnInit() {
    // way 1 retrieve id from route
    // const id = this.route.snapshot.params['id'];
    //way 2
    this.route.params. subscribe(
      (params: Params) => {
        // + cast from string to number
        this.id = params['id'];
        this.recipe = this.rcService.getRecipe(this.id);
      }
    )
  }

  onClickEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});

  }

  onClickDeleteRecipe() {
    this.dataStorageService.deleteRecipe(this.id).subscribe(response => {
      this.rcService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
    });

  }
}
