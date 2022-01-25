import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  message = null;
  ingredients: Ingredient[];
  user: User;
  private subscription: Subscription;
  private subscriptionUser: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.subscription = this.shoppingListService.shoppingListChanged.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    })

    this.subscriptionUser = this.authService.user.subscribe(user => {
      this.user = user;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }


  onClickEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }

  onCLickOrder(user: User) {

    this.dataStorageService.storeOrder(user, this.ingredients).subscribe(res => {
      this.message = "Thank you for ordering."
      this.shoppingListService.orderList();

    }, error => {
      console.error(error);

    });
  }
}
