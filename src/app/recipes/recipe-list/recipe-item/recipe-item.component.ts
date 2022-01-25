import { Component, OnInit, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  @Input() index: number;
  imageSource = environment.API_URL + "images/164268693895020180803_092504.jpg";
  ngOnInit() {
  }
}
