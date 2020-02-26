import { RecipeDataService } from './../recipe-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  @Input() public recipe: Recipe;

  constructor(private _recipeDataService: RecipeDataService) {}

  ngOnInit() {}

  deleteRecipe() {
    this._recipeDataService.deleteRecipe(this.recipe);
  }
}
