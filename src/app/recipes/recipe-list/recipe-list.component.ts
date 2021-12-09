import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test', 'Test1', 'https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
