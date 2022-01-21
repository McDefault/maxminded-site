import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.subscription = this.shoppingListService.shoppingListChanged.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onClickEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
}
