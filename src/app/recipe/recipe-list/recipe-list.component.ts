import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeDataService } from '../recipe-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  constructor(private _recipeDataService: RecipeDataService) {}
  public filterRecipeName: string;

  applyFilter(filter: string) {
    this.filterRecipeName = filter;
  }

  get recipes(): Recipe[] {
    return this._recipeDataService.recipes;
  }

  addNewRecipe(recipe) {
    this._recipeDataService.addNewRecipe(recipe);
  }
}
