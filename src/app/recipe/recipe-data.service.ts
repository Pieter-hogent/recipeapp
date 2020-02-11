import { Injectable } from '@angular/core';
import { RECIPES } from './mock-recipes';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  private _recipes = RECIPES;
  constructor() {}

  get recipes() {
    return this._recipes;
  }
  addNewRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
  }
}
