import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: String;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private dataStorageService: DataStorageService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((par: Params) => {
      this.id = par['id'];
      this.editMode = par['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';


    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.image;
      recipeDescription = recipe.price;

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'price': new FormControl(recipeDescription, Validators.required)
    })
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (!this.editMode){
      this.dataStorageService.storeRecipe(this.recipeForm.value).subscribe(res => {
        console.log("added");
        this.recipeService.addRecipe(this.recipeForm.value);

      }, error => {
        console.error(error);

      });
    } else {
      this.dataStorageService.patchRecipe(this.id, this.recipeForm.value).subscribe(res=>{
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      })
    }
    this.onClickCancel();
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onClickCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
