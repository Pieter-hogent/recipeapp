import { Component, OnInit } from '@angular/core';
import { RECIPES } from '../mock-recipes';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private _recipes = RECIPES;
  constructor() {}

  get recipes() {
    return this._recipes;
  }
  addNewRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
  }
  ngOnInit(): void {}
}
