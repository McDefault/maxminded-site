import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import {Recipe} from '../recipe.model';
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";
import {take} from "rxjs/operators";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  subscriptionUser: Subscription;
  isAdmin = false;

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscriptionUser = this.authService.user.subscribe(user => {
      this.isAdmin = (user.isAdmin)
    });

    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
    this.dataStorageService.fetchRecipes().pipe(take(1))
      .subscribe();
  }


  onClickNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionUser.unsubscribe();

  }
}
