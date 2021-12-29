import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {


  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
      // this.ingredientAdded.emit(newIngredient);
      // this.shoppingListService.shoppingListAdded.emit(newIngredient);
      this.shoppingListService.addShoppingList(newIngredient);
  }

  onDeleteItem() {

  }

  onClearItems() {

  }
}
